import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import ScheduledTripsCard from "./ScheduledTripsCard";
import NavigationDrawer from "./NavigationDrawer.js";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FloatingActionButton from "./FloatingActionButton.js"



export class ScheduledTripsView extends React.Component{


    constructor(props) {
        super(props);
    }

    render(){
        const { classes, theme } = this.props;

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