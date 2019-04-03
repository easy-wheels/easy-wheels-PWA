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
        this.auth.setPersistence(process.env.NODE_ENV === 'test'
            ? app.auth.Auth.Persistence.NONE
            : app.auth.Auth.Persistence.LOCAL);
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

    //User

    addUser = (email, name) => this.db.collection("users").add({
        email:email,
        name:name
    });

    getNameByEmail = (email) => this.db.collection("users").get()
        .then(col => {
            let name;
            col.docs.map(doc => {
                if(doc.data().email === email){
                    name = doc.data().name
                }
            });
            return name;
        });

    getIdbyEmail = (email) => this.db.collection("users").get()
        .then(col => {
            let id;
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

    getAllRoutes = () => this.db.collection("routes").get()
        .then(function (col) {
            var promises = [];
            col.docs.map(doc =>{
                promises.push(new Promise(function (resolve, reject) {
                    Firebase.getInstance().getUserById(doc.data().driver.id.replace(/\s/g,'')).then(driver =>{
                        return({toHome:doc.data().toHome, time:doc.data().time, driver:driver, routeId:doc.id, points:doc.data().points});
                    }).then(result =>{
                        resolve(result);
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
                    return({toHome:doc.data().toHome, time:doc.data().time, driver:driver, points:doc.data().points, routeId:id});
                }).then(result => {
                    resolve(result);
                });
            })
        });

    addRoute = (email, day, hour, toHome, points) => {
        return new Promise(function (resolve, reject) {
            Firebase.getInstance().getIdbyEmail(email)
                .then(id =>{
                    Firebase.getInstance().db.collection("routes").add({
                        driver:Firebase.getInstance().db.doc("/users/"+id),
                        time: day+" "+hour,
                        toHome: toHome,
                        points: points
                    })
                        .then(route => {
                            resolve(route)
                        })
                })
        })
    };

    modifyRoute = (id, day, hour, toHome, points) => {
        return new Promise(function (resolve, reject) {
            Firebase.getInstance().db.collection("routes").doc(id).get()
                .then(route => {
                    //route.data().driver.id.replace(/\s/g,'')
                    Firebase.getInstance().modifyPointsToRoute(points,id)
                        .then(p=>{
                            Firebase.getInstance().db.collection("routes").doc(id)
                                .set({
                                    driver:Firebase.getInstance().db.doc("/users/"+route.data().driver.id.replace(/\s/g,'')),
                                    time: day+" "+hour,
                                    toHome: toHome
                                }).then(result =>{resolve(true)})
                        })
                })
        })
    };

    deleteRoute = (id) => this.db.collection("routes").doc(id).delete();

    // ** TRIPS



    getTripsWithDayAndHour = (day, hour) =>
        this.db.collection("trips").doc(day+" "+hour).collection("trips").get()
            .then(function (col) {
                const promises = [];
                col.docs.map(doc => {
                    promises.push(Firebase.getInstance().getTripByIdAndTime(day,hour,doc.id, doc))
                });
                return Promise.all(promises);
            });

    getTripByIdAndTime = (day, hour, id, doc) => {
        return new Promise(function (resolve, reject) {
            const data = doc.data();
            data.tripId = id;
            Firebase.getInstance().getRouteById(doc.data().route.id)
                .then(routeData =>{
                    data.route = routeData;
                    Firebase.getInstance().db.collection("trips/"+day+" "+hour+"/trips/"+id+"/passengers").get()
                        .then(function (col) {
                            var promises = [];
                            col.docs.map(doc1 =>{
                                promises.push(Firebase.getInstance().getPassengerWithDoc(doc1));
                            });
                            Promise.all(promises)
                                .then(result => {
                                    data.passengers = result;
                                    resolve(data)
                                })
                        })
                })
        })
    };

    getPassengerWithDoc=(doc)=>{
        return new Promise(function (resolve, reject) {
            Firebase.getInstance().getUserById(doc.data().passenger.id.replace(/\s/g,''))
                .then(user =>{
                    resolve({passenger:user,point:{latitude:doc.data().point.latitude,longitude:doc.data().point.longitude}})
                })
        })
    };

    deleteTripByTimeAndId = (day,hour,id) => this.db.collection("trips").doc(day+" "+hour)
        .collection("trips").doc(id).delete();

    getAllTrips = () => {
        return new Promise(function(resolve, reject){
            Firebase.getInstance().db.collection("trips").get()
                .then(function(col){
                    var ids = [];
                    col.docs.map(doc =>{
                        ids.push(doc.id.split(" "))
                    });
                    var promises = [];
                    ids.map(id => {
                        promises.push(Firebase.getInstance().getTripsWithDayAndHour(id[0], id[1]));
                    });
                    Promise.all(promises).then(results => {
                        var trips = [];
                        results.map(result => {
                            if(result.length>0){
                                trips.push(result)
                            }
                        });
                        resolve(trips)
                    })
                })
        })
    };

    getTripsAsDriver = (email) => {
        return new Promise(function(resolve, reject){
            Firebase.getInstance().getAllTrips()
                .then(result=>{
                    var trips = [];
                    result.map(trip => {
                        if(trip[0].route.driver.email===email){
                            trips.push(trip)
                        }
                    });
                    resolve(trips);
                })
        })
    };

    getTripsAsPassenger = (email) =>{
        return new Promise(function(resolve, reject){
                    Firebase.getInstance().getAllTrips()
                        .then(trips => {
                            var tripsAsPassenger = [];
                            trips.map(trip=>{
                                trip[0].passengers.map(passenger => {
                                    if(passenger.passenger.email===email){
                                        tripsAsPassenger.push(trip[0])
                                    }
                                })
                            });
                            resolve(tripsAsPassenger)
                        })
                })
    };

    completeTrip = (day, hour, id) => this.db.collection("trips").doc(day+" "+hour)
        .collection("trips").doc(id).delete();

    addTrip = (routeId, capacity) => {
        return new Promise(function (resolve, reject) {
            Firebase.getInstance().getRouteById(routeId)
                .then(route => {
                    Firebase.getInstance().db.collection("trips").doc(route.time).collection("trips")
                        .add({
                            capacity:capacity,
                            route:Firebase.getInstance().db.doc("routes/"+routeId)
                        })
                        .then(result => resolve(result))
                });
        });
    };

    addPassengerToTrip = (tripId, day, hour, email, point) => {
        return new Promise(function(resolve, reject) {
            Firebase.getInstance().getIdbyEmail(email)
                .then(userId => {
                    Firebase.getInstance().db.collection("trips/"+day+" "+hour+"/trips/"+tripId+"/passengers")
                        .add({
                            passenger:Firebase.getInstance().db.doc("/users/"+userId),
                            point: point
                        })
                        .then(result => resolve(result))
                })
        })
    };

    //TripRequest
    addTripRequest = (email, point, day, hour, toHome) => {
        return new Promise(function (resolve, reject) {
            Firebase.getInstance().getIdbyEmail(email)
                .then(userId => {
                    Firebase.getInstance().db.collection("tripRequests")
                        .doc(day+" "+hour)
                        .collection("tripRequest")
                        .add({
                            user:Firebase.getInstance().db.doc("users/"+userId),
                            point:new firebase.firestore.GeoPoint(point.lat(),point.lng()),
                            toHome:toHome
                        })
                        .then(result => resolve(result))
                })
        })
    };

    getTripRequestsByDayAndHour = (day, hour) => {
        return new Promise(function (resolve, reject) {
            Firebase.getInstance().db.collection("tripRequests").doc(day+" "+hour)
                .collection("tripRequest").get()
                .then(function (col) {
                    var promises = [];
                    col.docs.map(doc =>{
                        promises.push(Firebase.getInstance().getTripRequestByDoc(doc,day, hour))
                    });

                    resolve(Promise.all(promises));
                })
        })
    };

    getTripRequestByDoc= (doc,day, hour) => {
        return new Promise(function (resolve, reject) {
            Firebase.getInstance().getUserById(doc.data().user.id)
                .then(user => {
                    resolve(
                        {
                            point: {latitude: doc.data().point.latitude, longitude: doc.data().point.longitude},
                            toHome: doc.data().toHome,
                            user: user,
                            tripRequestId:doc.id,
                            time:day+" "+hour
                        })
                })
        })
    };

    getTripRequestsByEmail = (email) => {
        return new Promise(function (resolve,reject){
            Firebase.getInstance().db.collection("tripRequests").get()
                .then(function(col){
                    var promises = []
                    col.docs.map(doc =>{
                        var id = doc.id.split(" ")
                        promises.push(Firebase.getInstance().getTripRequestsByDayAndHour(id[0],id[1]))
                    })
                    Promise.all(promises)
                        .then(result=>{
                            var tripsByEmail = [];
                            result.map(array=>{
                                array.map(trip=>{
                                if(trip.user.email===email)
                                    tripsByEmail.push(trip)
                                })
                            })
                            resolve(tripsByEmail);
                        })
                })
        })
    }

    deleteTripRequestByTimeAndId = (day, time, id) => this.db.collection("tripRequests")
        .doc(day+" "+time).collection("tripRequest").doc(id).delete();

    enroleTripRequest = (day, hour, idTripRequest, idTrip, point) =>{
        return new Promise(function (resolve, reject) {
            var tripRequest = Firebase.getInstance().db.collection("tripRequests").doc(day+" "+hour)
                .collection("tripRequest").doc(idTripRequest).get().then(a => {
                    Firebase.getInstance().getTripRequestByDoc(a,day, hour)
                                    .then(result =>{
                                        Firebase.getInstance().addPassengerToTrip(idTrip, day, hour, result.user.email, point)
                                            .then(r => {
                                                Firebase.getInstance().deleteTripRequestByTimeAndId(day,hour,idTripRequest);
                                                resolve(r)
                                            })
                                    })
                });

        })
    };

    static getInstance = () => Firebase.firebase;
}

export default Firebase;