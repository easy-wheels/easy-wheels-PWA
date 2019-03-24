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
    }

    // *** Auth API ***

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
               pickUps.push([doc.data().position.latitude,  doc.data().position.longitude]);
           });
           return pickUps;
        });

    

    static getInstance = () => Firebase.firebase;
}

export default Firebase;