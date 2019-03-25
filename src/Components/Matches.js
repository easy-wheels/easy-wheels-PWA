import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TripCard from "./TripCard";


const styles = theme => ({
  control: {
    padding: theme.spacing.unit * 2,
  },

});

class Matches extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      spacing: '16',
      trips:[
        {driver:true, destination:{desc:"Escuela Colombiana de ingeniería",lat: 4.782515, lng: -74.048611},
          origin: {desc: "Carrera 23a #24-32", lat: 4.782515, lng: -74.048611},
          passengers:[{name:"Nicolas Garcia", pickup:{des:"Carrera 23a #24-32",lat: 4.782515, lng: -74.048611},phone:"456149646"},
            {name:"Adres Perez", pickup:{des:"Carrera 54 #78-32",lat: 4.782515, lng: -74.048611},phone:"555244456"}],
          day:"Lunes",
          hour:"2:00PM"
        },{driver:false, destination:{desc:"Escuela Colombiana de ingeniería",lat: 4.782515, lng: -74.048611},
          origin: {desc: "Carrera 23a #24-32", lat: 4.782515, lng: -74.048611},
          matchDriver:{name:"Nicolas Garcia", origin:{des:"Carrera 23a #24-32",lat: 4.782515, lng: -74.048611},phone:"454444444"},
          day:"Martes",
          hour:"11:00AM"
        },

      ]
    } ;
  }



  render() {
    const { classes } = this.props;
    const tripsList = this.state.trips.map((trip) => {
      return (
          <Grid wrap="nowrap" item xs={12} sm={6}>
            <TripCard  trip={trip}/>
          </Grid>
      );
    });

    return (
      <Grid container   spacing={24}>

          {tripsList}

      </Grid>
    );
  }
}

Matches.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Matches);