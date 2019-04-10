import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import classNames from 'classnames';
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import GoogleMapsContainer from "./Maps/MapsContainer";
import './Maps/Maps.css';
import MaterialTable from 'material-table';
import FireBase from "../Firebase";
import TripCard from "./TripCard";
import CircularProgress from "@material-ui/core/CircularProgress";

const firebase = FireBase.getInstance();
const styles = theme => ({
    card: {
        minWidth: 255,
    },
    title: {
        fontSize: 14,
    },
    actions: {
        display: 'flex',
    },
    chip: {
        marginRight: theme.spacing.unit,
    },
    column: {
        flexBasis: '33.33%',

    },
    column2: {
        flexBasis: '66.66%',

    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    details: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        position: 'initial !important'
    },


});


class TripDetailsDialog extends React.Component {
    state = {
        passenger: "",
        possiblePassengers: [],
        loading: "",
    };

    componentWillMount() {
        console.log(this.props.trip)
        this.setState({loading: true})
        firebase.getTripRequestsByDayAndHour(this.props.trip.route.time.split(" ")[0], this.props.trip.route.time.split(" ")[1]).then(a => {
            this.setState({possiblePassengers: a, loading: false})
        })
    }


    render() {
        const {classes} = this.props;
        const passengers = this.props.trip.passengers.map((passenger, i) => {
            return (
                <Chip avatar={<Avatar>{passenger.passenger.name.match(/\b(\w)/g).join('')}</Avatar>} value={passenger}
                      onClick={() => this.setState({expanded: !this.state.expanded, passenger: passenger})}
                      className={classes.chip} label={passenger.name}/>
            );
        });
        return (<>
                {!this.state.loading ?
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <Card>
                                <CardContent className={classes.card}>

                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Detalles del Viaje
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {this.props.trip.route.driver.email === firebase.isLoggedIn().email ? <> Viajas
                                            como
                                            conductor </> : <>Viajas como
                                            pasajero</>}
                                    </Typography>
                                    <br/>

                                    <Typography component="p">
                                        Tu destino es {this.props.trip.route.toHome ? "Casa" : "Universidad"}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {this.props.trip.route.time}
                                    </Typography>


                                    {this.props.trip.route.driver.email === firebase.isLoggedIn().email ?
                                        <>
                                            <Typography gutterBottom variant="body1">
                                                Pasajeros
                                            </Typography>
                                            <div>
                                                {passengers}
                                            </div>

                                            <Divider/>
                                            <br/>

                                        </>
                                        : <>Viajas como
                                            pasajero</>}

                                    <GoogleMapsContainer
                                        route={this.props.trip.route.points}
                                        markerPosition={{lat: 4.782715, lng: -74.042611}}
                                        markerTitle={"Punto de recogida de "}
                                    />
                                </CardContent>


                            </Card>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MaterialTable
                                columns={[
                                    {title: 'Nombre', field: 'user'},
                                    {title: 'Direccion de recogida', field: 'pickup'},
                                    {title: 'Estado', field: 'state'},
                                ]}
                                data={
                                    this.state.possiblePassengers.map((passenger) => {
                                        console.log(passenger)
                                        if (passenger.toHome===this.props.trip.route.toHome){
                                            return {user:passenger.user.name, pickup:passenger.lat, point:{lat:passenger.point.latitude,lng:passenger.point.longitude}}
                                        }

                                    })
                                }
                                title="Posibles pasajeros"
                                detailPanel={[
                                    {
                                        tooltip: 'Detalles de ubicación',
                                        render: rowData => {
                                            return (

                                                    <div className={classes.details}>
                                                        <div className={classes.column2}>
                                                            <GoogleMapsContainer
                                                                route={this.props.trip.route.points}
                                                                dragableMarker={rowData.point}
                                                                markerTitle={"Punto de recogida de "}

                                                            />
                                                        </div>


                                                        <div className={classNames(classes.column, classes.helper)}>
                                                            <Typography variant="caption">
                                                                En el mapa puedes observar tu ruta de viaje y la
                                                                posicion del
                                                                usuario
                                                                mueve el marcador con el fin de definir el punto de
                                                                recogida del
                                                                usuario
                                                            </Typography>
                                                            <br/>
                                                            <Button variant="contained" color="primary">
                                                                Agregar pasajero
                                                            </Button>
                                                        </div>
                                                    </div>

                                            )
                                        },
                                    },


                                ]}
                                onRowClick={(event, rowData, togglePanel) => togglePanel(0)}
                            />
                        </Grid>
                    </Grid>
                    :   <div className="center-loading">
                        <CircularProgress size={60} thickness={3}color="primary"/>
                    </div>}
            </>
        );
    }
}

TripDetailsDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TripDetailsDialog);