import React from 'react';
import FireBase from "./Firebase";

const firebase = FireBase.getInstance();

class prueba{
    constructor(){
        //ADD ROUTE
        /**firebase.addRoute("david.rodriguez-a@mail.escuelaing.edu.co",
            "Monday",
            "8:00",
            false,
            [{latitude:3,longitude:8}])
            .then(a => console.log(a));**/
        //GET ALL ROUTES
        /**firebase.getAllRoutes()
         * .then(a => console.log(a));**/
        //GET ALL ROUTES BY EMAIL
        /**firebase.getRoutesByEmail("david.rodriguez-a@mail.escuelaing.edu.co")
            .then(a => console.log(a));**/
        //GET ROUTE BY ID => FIRST YOU HAVE TO OBTAIN THE ROUTE ID OR HAVE IT LOCALLY!!
        /**firebase.getRoutesByEmail("david.rodriguez-a@mail.escuelaing.edu.co")
            .then(a => {
                const id = a[0].routeId;
                firebase.getRouteById(id)
                    .then(b => console.log(b));
            });**/
        //MODIFY ROUTE
        /**firebase.getRoutesByEmail("david.rodriguez-a@mail.escuelaing.edu.co")
            .then(a => {
                const id = a[0].routeId;
                firebase.modifyRoute(id, "Tuesday", "8:30", true, [{latitude:3,longitude:8},{latitude:6.353,longitude:8.535}])
                    .then(a => console.log(a))
            })**/
        //DELETE ROUTE
        /**firebase.getRoutesByEmail("david.rodriguez-a@mail.escuelaing.edu.co")
         .then(a => {
                const id = a[0].routeId;
                firebase.deleteRoute(id);
            })**/
        //ADD TRIP
        /**firebase.addTrip("kbHvzoOafzHffGjltOAn",4).then(a => console.log(a))**/
        //ADD Passenger to trip
        /**firebase.addPasangerToTrip(
            "3Lf4RqjSKNEt2L5V3Fj9",
            "Tuesday",
            "8:30",
            "nicolas.garcia-r@mail.escuelaing.edu.co",
            {latitude:6.353,longitude:8.535})
            .then(a => console.log(a))**/
        //GET TRIPS WITH DAY AND HOUR
        /**firebase.getTripsWithDayAndHour("Tuesday","8:30").then(a => console.log(a));**/
        //DELETE TRIPS WITH DAY AND HOUR AND ID
        /**firebase.deleteTripByTimeAndId("Tuesday","8:30","3Lf4RqjSKNEt2L5V3Fj9")**/
        //ADD TRIP REQUEST
        /**firebase.addTripRequest(
            "david.rodriguez-a@mail.escuelaing.edu.co",
            {latitude:5,longitude:8},
            "Tuesday",
            "8:30",
            false)**/
        //GET TRIP REQUEST BY TIME
        /**firebase.getTripRequestsByDayAndHour("Tuesday","8:30").then(a => console.log(a))**/
        //DELETE TRIP
        /**firebase.deleteTripRequestByTimeAndId("Tuesday","8:30",
         ihLhrnJNl8npkvEd2uIv) **/
        //firebase.getTripsAsDriver("sergio.rodriguez-tor@mail.escuelaing.edu.co").then(a => console.log(a))
        //firebase.getAllTrips().then(a => console.log(a));
        //firebase.getTripsWithDayAndHour("Thuesday", "14:30").then(a => console.log(a))
        //firebase.getTripsAsPassenger("laura.hernandez-g@mail.escuelaing.edu.co").then(a => console.log(a))
        //firebase.getTripsAsPassenger("nicolas.garcia-r@mail.escuelaing.edu.co").then(a=>console.log(a));
        //firebase.getTripRequestsByEmail("nicolas.garcia-r@mail.escuelaing.edu.co").then(a=>console.log(a));



        // firebase.addUserV2("nicolas.garcia-r@mail.escuelaing.edu.co","Nicolás García").then(resp => console.log(resp));
        //
        // firebase.addUserV2("sergio.rodriguez-tor@mail.escuelaing.edu.co","Sergio Rodríguez").then(resp => console.log(resp));
        //
        //
        // firebase.getUserByEmailV2("nicolas.garcia-r@mail.escuelaing.edu.co").then(resp => console.log(resp));
        //
        // firebase.getTripsByTimeV2("Monday 8:30").then(resp => console.log(resp));
        //
        // firebase.deleteTripByTimeV2("Monday 7:00").then(resp => console.log(resp));
        //
        // firebase.getTripsByTimeV2("Monday 7:00").then(resp => console.log(resp));
        //
        // firebase.getAllTripsV2().then(resp => console.log(resp));
        //
        // firebase.getTripsAsDriverV2("nicolas.garcia-r@mail.escuelaing.edu.co").then((resp) => console.log(resp));
        //
        // firebase.getTripsAsPassengerV2("sergio.rodriguez-tor@mail.escuelaing.edu.co").then((resp) => console.log(resp));
        //
        // firebase.addTripV2(
        //     5,
        //     [{lat:5,lng:8},{lat:0,lng:0}],
        //     "nicolas.garcia-r@mail.escuelaing.edu.co",
        //     "Monday 7:00",
        //     false).then((resp) => console.log(resp));
        //
        // firebase.addTripV2(
        //     5,
        //     [{lat:5,lng:8},{lat:0,lng:0}],
        //     "nicolas.garcia-r@mail.escuelaing.edu.co",
        //     "Monday 8:30",
        //     false).then((resp) => console.log(resp));
        //
/*        firebase.addTripV2(
            5,
            [{lat:5,lng:8},{lat:0,lng:0}],
            "a@mail.escuelaing.edu.co",
            "Monday 8:30",
            false).then((resp) => console.log(resp));*/
        //
        //
        // firebase.addTripRequestV2(
        //     "sergio.rodriguez-tor@mail.escuelaing.edu.co",
        //     "Monday 7:00",
        //     {lat:4.864758,lng:-74.05091800000001},
        //     false
        // ).then((resp) => console.log(resp));
        //
        // firebase.getTripRequestsByTimeV2("Monday 7:00").then((resp) => console.log(resp));
        //
        // firebase.getTripRequestsByEmailV2("sergio.rodriguez-tor@mail.escuelaing.edu.co").then((resp) => {console.log(resp);console.log(encodeGeohash(resp[0].point))});
        //
        // firebase.deleteTripRequestByTimeV2("Monday 7:00").then((resp) => console.log(resp));
        //
        // firebase.addPassengerToTripV2(
        //     "nicolas.garcia-r@mail.escuelaing.edu.co",
        //     "sergio.rodriguez-tor@mail.escuelaing.edu.co",
        //     "Monday 7:00",
        //     {lat:5,lng:3}
        // ).then((resp) => console.log(resp));


    }
}

export default prueba;