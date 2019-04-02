import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Universidad from "./Images/mapSample-ECI.png"
import Casa from "./Images/mapSample-Home.png"

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 170,

  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function ScheduledTripsCard(props) {
  const { classes, theme } = props;

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Destino {props.cardContent.destination}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Como {props.cardContent.role}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Llegada {props.cardContent.expectedArrivalTime}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.cardContent.scheduledDays}
           </Typography>
        </CardContent>
      </div>
      <div style={{ height: '5vh', width: '10%' }}>
      </div>
      <CardMedia
          className={classes.cover}
          image={props.cardContent.destination === "Universidad" ? Universidad : Casa}
          title="Destino"
          onClick={() => {
             alert("We are working on the maps. This is a sample");
         }}
       />

    </Card>
  );
}

ScheduledTripsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ScheduledTripsCard);

