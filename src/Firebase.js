import app from 'firebase/app';
import 'firebase/auth';
import firebase from "firebase";
require('firebase/firestore');

const config = {
    apiKey: "AIzaSyDRV6LF10YiqK5ORo8P5dFN1vzL_Tjbmp8",
    authDomain: "easy-wheels-front-end.firebaseapp.com",
    databaseURL: "https://easy-wheels-front-end.firebaseio.com",
    projectId: "easy-wheels-front-end",
    storageBucket: "easy-wheels-front-end.appspot.com",
    messagingSenderId: "503484802067"
};


class Firebase {

    static firebase = new Firebase();
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        this.getUserById = this.getUserById.bind(this);
        this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);
        this.auth.onAuthStateChanged((user) =>{
            console.log(user);
        })
    }



    // *** Auth API ***

    doUpdateStateLogin = (fun) => {
        this.auth.onAuthStateChanged((user)=>{
           if(user){
               fun(true)
           }else{
               fun(false)
           }
        });
    };

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    doEmailVerification = () => this.auth.currentUser.sendEmailVerification();

    doVerify = (email, password) => this.auth.signInWithEmailAndPassword(email,password);

    doChangeName = (name) =>this.auth.currentUser.updateProfile({displayName:name});

    isEmailVerified = () => this.auth.currentUser.emailVerified;

    isLoggedIn = () => this.auth.currentUser;

    doKeepSignedIn = () => this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);

    doNotKeepSignedIn = () => this.auth.setPersistence(app.auth.Auth.Persistence.SESSION);

    onChange = () => {return this.auth};

    // *** DB API ***

    addUser = (email, name) => this.db.collection("users").add({
        email:email,
        name:name
    });

    //User

    getNameByEmail = (email) => this.db.collection("users").get()
        .then(col => {
            var name;
            col.docs.map(doc => {
                if(doc.data().email === email){
                    name = doc.data().name
                }
            });
            return name;
        });

    getIdbyEmail = (email) => this.db.collection("users").get()
        .then(col => {
            var id;
            col.docs.map(doc => {
                if(doc.data().email === email){
                    id = doc.id;
                }
            });
            return id;
        });

    getUserById = (id) => this.db.collection("users").doc(id).get()
        .then(doc => {
            return doc.data();
        });


    //Pick up Stops

    addPickUpStop = (latitude, longitude) => this.db.collection("pickupstops").add({
        position:new firebase.firestore.GeoPoint(latitude,longitude)
    });

    getIdPickUpStop = (latitude, longitude) => this.db.collection("pickupstops").get()
        .then(col => {
            var id;
            col.docs.map(doc => {
                if(doc.data().position.isEqual(new firebase.firestore.GeoPoint(latitude,longitude))){
                    id = doc.id;
                }
            });
            return id;
        });

    getAllPickUpStops = () => this.db.collection("pickupstops").get()
        .then(col => {
           var pickUps = [];
           col.docs.map(doc => {
               pickUps.push({latitude: doc.data().position.latitude,  longitude: doc.data().position.longitude, pickUpStopId:doc.id});
           });
           return pickUps;
        });

    getPickUpStopWithId = (id) => this.db.collection("pickupstops").doc(id).get()
        .then(doc => {
            return {latitude:doc.data().position.latitude, longitude:doc.data().position.longitude, pickUpStopId:id};
        });

    //Routes
    getPointsRoute = (id) => this.db.collection("/routes/"+id+"/points").get()
        .then(col => {
            var points = [];
            col.docs.map(doc => {
                points.push({latitude: doc.data().dot.latitude, longitude:doc.data().dot.longitude});
            });
            return points;
        });

    addPointsToRoute = (points, id) => {
        var promises = []
        points.map(point =>{
            promises.push(this.db.collection("/routes/"+id+"/points").add({
               dot: new firebase.firestore.GeoPoint(point.latitude,point.longitude)
            }));
        })
        return Promise.all(promises);
    };

    getAllRoutes = () => this.db.collection("routes").get()
        .then(function (col) {
            var promises = [];
            console.log();
            col.docs.map(doc =>{
                promises.push(new Promise(function (resolve, reject) {
                    Firebase.getInstance().getUserById(doc.data().driver.id.replace(/\s/g,'')).then(driver =>{
                        return({toHome:doc.data().toHome, time:doc.data().time, driver:driver, routeId:doc.id});
                    }).then(result =>{
                        Firebase.getInstance().getPointsRoute(doc.id).then(points =>{
                            result.points = points;
                            resolve(result);
                        });
                    });
                }));
            });
            return Promise.all(promises);
        });

    getRoutesByEmail = (email) => {
        return new Promise(function (resolve, reject) {
            var routes = [];
            Firebase.getInstance().getAllRoutes().then(data => {
                data.map(route =>{
                    if(route.driver.email===email){
                        routes.push(route);
                    }
                });
                resolve(routes);
            });
        })
    };

    getRouteById = (id) => this.db.collection("routes").doc(id).get()
        .then(doc => {
            return new Promise(function (resolve, reject) {
                Firebase.getInstance().getUserById(doc.data().driver.id.replace(/\s/g,'')).then(driver =>{
                    return({toHome:doc.data().toHome, time:doc.data().time, driver:driver, routeId:id});
                }).then(result => {
                    Firebase.getInstance().getPointsRoute(id).then(points=>{
                        result.points = points;
                        resolve(result);
                    });
                });
            })
        });



    addRoute = (email, time, toHome, points) => this.getIdbyEmail(email).then(id =>{
        this.db.collection("routes").add({
            driver:this.db.doc("/users/"+id),
            time: time,
            toHome: toHome
        }).then(route => {
            this.addPointsToRoute(points, route.id);
        });
    });

    // ** TRIPS
    getAllTrips = () => this.db.collection("trips").get()
        .then(col => {
           var promises = [];
           col.docs.map(doc =>{
               promises.push(this.getTripById(doc.id));
           });
           return Promise.all(promises);
        });

    getTripById = (id) => this.db.collection("trips").doc(id).get()
        .then(doc => {
            return Promise.all([this.getStopsOfTrip(id),
                this.getPassengersOfTrip(id),
                this.getRouteById(doc.data().route.id.replace(/\s/g,''))])
                .then(values =>{
                    return {capacity:doc.data().capacity, passengers:values[1], stops:values[0], route:values[2], tripId:id};
            });
        });

    getTripsAsDriver = (email) => this.getAllTrips().then(trips =>{
        var tripsAsDriver = [];
        trips.map(trip =>{
            if(trip.route.driver.email===email){
                tripsAsDriver.push(trip);
            }
        });
        return tripsAsDriver;
    });

    getTripsAsPassenger = (email) => this.getAllTrips().then(trips => {
        var tripsAsPassanger = [];
        trips.map(trip =>{
            var bol = false;
            trip.passengers.map(passanger =>{
                if(passanger.email===email){
                    bol=true;
                }
            });
            if(bol){
                tripsAsPassanger.push(trip);
            };
        });
        return tripsAsPassanger;
    });

    getPassengersOfTrip = (tripId) => this.db.collection("/trips/"+tripId+"/passengers").get()
        .then(col =>{
            var promises = [];
            col.docs.map(doc =>{
                promises.push(this.getUserById(doc.data().passenger.id));
            });
            return Promise.all(promises);
        });

    getStopsOfTrip = (tripId) => this.db.collection("/trips/"+tripId+"/stops").get()
        .then(col =>{
            var promises = [];
            col.docs.map(doc =>{
                promises.push(this.getPickUpStopWithId(doc.data().stop.id.replace(/\s/g,'')))
            });
            return Promise.all(promises);
        });

    addTrip = (routeId, capacity, passengersEmail, stopsId) =>{
        this.db.collection("trips").add({
            route:this.db.doc("/routes/"+routeId),
            capacity:capacity
        }).then(trip =>{
            passengersEmail.map(passenger=>{
                this.getIdbyEmail(passenger)
                    .then(id=>{
                        this.db.collection("/trips/"+trip.id+"/passengers").add({
                            passenger:this.db.doc("users/"+id)
                        });
                    })
            });
            stopsId.map(stop=>{
               this.db.collection("/trips/"+trip.id+"/stops").add({
                  stop:this.db.doc("pickupstops/"+stop)
               });
            });
        });
    };

    addPasengerToTrip = (email, tripId) => this.getIdbyEmail(email)
        .then(id=>{
            this.db.collection("/trips/"+tripId+"/passengers").add({
               passenger:this.db.doc("users/"+id)
            });
        });

    addStopToTrip = (stopId, tripId) => this.db.collection("/trips/"+tripId+"/stops").add({
        stop:this.db.doc("pickupstops/"+stopId)
    });

    static getInstance = () => Firebase.firebase;
}

export default Firebase;