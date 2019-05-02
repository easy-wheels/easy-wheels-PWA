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
        this.auth.setPersistence(process.env.NODE_ENV === 'test'
            ? app.auth.Auth.Persistence.NONE
            : app.auth.Auth.Persistence.LOCAL);
    }


    // *** Auth API ***

    doUpdateStateLogin = (fun) => {
        this.auth.onAuthStateChanged((user) => {
            if (user) {
                fun(true)
            } else {
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

    doVerify = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    doChangeName = (name) => this.auth.currentUser.updateProfile({displayName: name});

    isEmailVerified = () => this.auth.currentUser.emailVerified;

    isLoggedIn = () => this.auth.currentUser;

    doKeepSignedIn = () => this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);

    doNotKeepSignedIn = () => this.auth.setPersistence(app.auth.Auth.Persistence.SESSION);

    onChange = () => {
        return this.auth
    };

    // *** DB API ***
    //User
    addUser = (email, name) => this.db.collection("users").doc(email).set({
        email: email,
        name: name
    });

    getUserByEmail = async (email) => {
        const query = await this.db.collection("users").doc(email).get();
        return query.data()
    };

    // Trips

    getAllTrips = async () => {
        const docsTrips = await this.db.collection("trips").get();
        return docsTrips.docs.map(doc => doc.data())
    };

    getTripsAsDriver = async (driverEmail) => {
        const docsTrips = await this.db.collection("trips").where("driverEmail", "==", driverEmail).get();
        return docsTrips.docs.map(doc => doc.data())
    };

    getTripsAsPassenger = async (passengerEmail) => {
        const docsTrips = await this.db.collection("trips").where("passengers", "array-contains", passengerEmail).get();
        return docsTrips.docs.map(doc => doc.data())
    };

    addTrip = async (capacity, routePoints, driverEmail, day, hour, toUniversity, departureDate, arrivalDate) => {
        return await this.db.collection("trips").doc(`${driverEmail} ${day} ${hour}`).set({
            capacity: capacity,
            route: routePoints.map(point => new firebase.firestore.GeoPoint(point.lat, point.lng)),
            driverEmail: driverEmail,
            passengers: null,
            passengersWithPoint: null,
            day: day,
            hour: hour,
            toUniversity: toUniversity,
            departureDate: departureDate,
            arrivalDate: arrivalDate,
            full: false
        })
    };

    //TripRequests

    addTripRequest = async (email, day, hour, point, toUniversity, arrivalDate) => {
        return await this.db.collection("tripRequests").doc(`${email} ${day} ${hour}`).set({
            email: email,
            day: day,
            hour: hour,
            matched: false,
            userPosition: new firebase.firestore.GeoPoint(point.lat, point.lng),
            toUniversity: toUniversity,
            arrivalDate: arrivalDate
        })
    };

    getTripRequestsByEmail = async (email) => {
        const docsTripRequests = await this.db.collection("tripRequests").where("email", "==", email).get();
        return docsTripRequests.docs.map(doc => doc.data())
    };

    addPassengerToTrip = async (driverEmail, day, hour, full, passenger) => {
        await this.db.collection("trips").doc(`${driverEmail} ${day} ${hour}`).update({
            passengers: firebase.firestore.FieldValue.arrayUnion(passenger.email),
            passengersWithInfo: firebase.firestore.FieldValue.arrayUnion({
                passengerEmail: passenger.email,
                meetingPoint: passenger.meetingPoint,
                meetingDate: passenger.meetingDate,
            }),
            full: full
        });
        await this.updateTripRequestMatched(passenger);
    };

    addPassengersToTrip = async (driverEmail, day, hour, full, passengers) => {
        await this.db.collection("trips").doc(`${driverEmail} ${day} ${hour}`).update({
            passengers: passengers.map(passenger => passenger.email),
            passengersWithInfo: passengers.map(passenger => {
                return {
                    passengerEmail: passenger.email,
                    meetingPoint: passenger.meetingPoint,
                    meetingDate: passenger.meetingDate,
                }
            }),
            full: full

        });
        await Promise.all(passengers.map(passenger => this.updateTripRequestMatched(passenger)));
    };

    updateTripRequestMatched = async (passenger) => {
        await this.db.collection("tripRequests").doc(`${passenger.email} ${passenger.day} ${passenger.hour}`).update({
            matched: true,
            meetingPoint: passenger.meetingPoint,
            meetingDate: passenger.meetingDate,
            departureDate: passenger.departureDate,
            routeWalking: passenger.routeWalking

        })
    };

    static getInstance = () => Firebase.firebase;
}

export default Firebase;