import React from 'react';
import FireBase from "./Firebase";

const firebase = FireBase.getInstance();

class prueba{
    constructor(){

        // firebase.addUser("nicolas.garcia-r@mail.escuelaing.edu.co","Nicolás García").then(resp => console.log(resp));
        //
        // firebase.addUser("sergio.rodriguez-tor@mail.escuelaing.edu.co","Sergio Rodríguez").then(resp => console.log(resp));
        //
        // firebase.getUserByEmail("nicolas.garcia-r@mail.escuelaing.edu.co").then(resp => console.log(resp));
        //
        // firebase.getTripsByTime("Monday 8:30").then(resp => console.log(resp));
        //
        // firebase.deleteTripByTime("Monday 7:00").then(resp => console.log(resp));
        //
        // firebase.getTripsByTime("Monday 7:00").then(resp => console.log(resp));
        //
        // firebase.getAllTrips().then(resp => console.log(resp));
        //
        // firebase.getTripsAsDriver("nicolas.garcia-r@mail.escuelaing.edu.co").then((resp) => console.log(resp));
        //
        // firebase.getTripsAsPassenger("sergio.rodriguez-tor@mail.escuelaing.edu.co").then((resp) => console.log(resp));
        //
        // firebase.addTrip(
        //     5,
        //     [{lat:5,lng:8},{lat:0,lng:0}],
        //     "nicolas.garcia-r@mail.escuelaing.edu.co",
        //     "Monday 7:00",
        //     false).then((resp) => console.log(resp));
        //
        // firebase.addTrip(
        //     5,
        //     [{lat:5,lng:8},{lat:0,lng:0}],
        //     "nicolas.garcia-r@mail.escuelaing.edu.co",
        //     "Monday 8:30",
        //     false).then((resp) => console.log(resp));
        //
/*        firebase.addTrip(
            5,
            [{lat:5,lng:8},{lat:0,lng:0}],
            "a@mail.escuelaing.edu.co",
            "Monday 8:30",
            false).then((resp) => console.log(resp));*/
        //
        //
        // firebase.addTripRequest(
        //     "sergio.rodriguez-tor@mail.escuelaing.edu.co",
        //     "Monday 7:00",
        //     {lat:4.864758,lng:-74.05091800000001},
        //     false
        // ).then((resp) => console.log(resp));
        //
        // firebase.getTripRequestsByTime("Monday 7:00").then((resp) => console.log(resp));
        //
        // firebase.getTripRequestsByEmail("sergio.rodriguez-tor@mail.escuelaing.edu.co").then((resp) => {console.log(resp);console.log(encodeGeohash(resp[0].point))});
        //
        // firebase.deleteTripRequestByTime("Monday 7:00").then((resp) => console.log(resp));
        //
        // firebase.addPassengerToTrip(
        //     "nicolas.garcia-r@mail.escuelaing.edu.co",
        //     "sergio.rodriguez-tor@mail.escuelaing.edu.co",
        //     "Monday 7:00",
        //     {lat:5,lng:3}
        // ).then((resp) => console.log(resp));

    }
}

export default prueba;