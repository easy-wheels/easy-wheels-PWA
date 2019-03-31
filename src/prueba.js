import React, {Component} from 'react';
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
    }
}

export default prueba;