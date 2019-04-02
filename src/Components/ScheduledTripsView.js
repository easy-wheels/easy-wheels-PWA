import React from 'react';
import ScheduledTripsCard from "./ScheduledTripsCard";
import FloatingActionButton from "./FloatingActionButton.js"


export class ScheduledTripsView extends React.Component{


    render(){

        return (
            <div>
                <ScheduledTripsCard cardContent={{
                    "destination": "Universidad",
                    "role": "Pasajero",
                    "expectedArrivalTime": "7:00 AM",
                    "scheduledDays": "Lunes, Martes y Viernes"
                }} />
                <br/>
                <br/>
                <ScheduledTripsCard cardContent={{
                    "destination": "Casa",
                    "role": "Pasajero",
                    "expectedArrivalTime": "7:00 AM",
                    "scheduledDays": "Lunes, Martes y Viernes"
                }} />
                <br/>
                <br/>
                <ScheduledTripsCard cardContent={{
                    "destination": "Universidad",
                    "role": "Pasajero",
                    "expectedArrivalTime": "7:00 AM",
                    "scheduledDays": "Lunes, Martes y Viernes"
                }} />
                <FloatingActionButton/>
            </div>

        );
    }
}


export default ScheduledTripsView;