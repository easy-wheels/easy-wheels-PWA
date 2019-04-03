import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TripCard from "./TripCard";
import FireBase from "../Firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

const firebase = FireBase.getInstance();
const styles = theme => ({
    control: {
        padding: theme.spacing.unit * 2,
    },

});

class Matches extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            spacing: '16',
            trips: [],
            loading: "",

        };
    }


    componentDidMount() {
        this.setState({ loading: true });
        firebase.getTripsAsPassenger(firebase.isLoggedIn().email).then(a =>
            firebase.getTripsAsDriver(firebase.isLoggedIn().email).then(b => {
                this.setState({trips: a.concat(b),loading: false})}))
    }

    render() {
        const tripsList = this.state.trips.map((trip) => {
            console.log(trip);
            return (
                <Grid key={trip[0].tripId} item xs={12} sm={6}>
                    <TripCard trip={trip[0]}/>
                </Grid>
            );
        });

        return (
            <>
            {!this.state.loading ?
                    <Grid container spacing={24}>
                        {tripsList}
                    </Grid>
                    :
                <div className="center-loading">
                    <CircularProgress size={60} thickness={3}color="primary"/>
                </div>

            }
            </>
        );
    }
}

Matches.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Matches);