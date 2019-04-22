import React from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker, Polyline} from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import './Maps.css';
import SearchBar from "./SearchBar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import withStyles from "@material-ui/core/styles/withStyles";
import DetailsIcon from '@material-ui/icons/EditAttributes';
import DriverIcon from '@material-ui/icons/DriveEta';
import PassangerIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import Collapse from "@material-ui/core/Collapse";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FireBase from "../../Firebase";

const firebase = FireBase.getInstance();

const styles = {
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '70vw',
        position: 'absolute',
        zIndex: 5,
        textAlign: 'center',
    },
    display: {
        display: 'flex',
        position: 'absolute',
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
    position: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    }

};
const availableSeats = [
    {
        value: '1',
        label: '1 Cupo',
    },
    {
        value: '2',
        label: '2 Cupos',
    },
    {
        value: '3',
        label: '3 Cupos',
    },
    {
        value: '5',
        label: '5 Cupos',
    },
    {
        value: '6',
        label: '6 Cupos',
    },
    {
        value: '7',
        label: '7 Cupos',
    },

];
const availableDays = [
    {
        value: 'Monday',
        label: 'Lunes',
    },
    {
        value: 'Tuesday',
        label: 'Martes',
    },
    {
        value: 'Wednesday',
        label: 'Miercoles',
    },
    {
        value: 'Thursday',
        label: 'Jueves',
    },
    {
        value: 'Friday',
        label: 'Viernes',
    },
    {
        value: 'Saturday',
        label: 'Sabado',
    },

];
const availableHours = [
    {
        value: '7:00',
        label: '7:00 AM',
    },
    {
        value: '8:30',
        label: '8:30 AM',
    },
    {
        value: '10:00',
        label: '10:00 AM',
    },
    {
        value: '11:30',
        label: '11:30 AM',
    },
    {
        value: '13:00',
        label: '1:00 PM',
    },
    {
        value: '14:30',
        label: '2:30 PM',
    },
    {
        value: '16:00',
        label: '4:00 PM',
    },
    {
        value: '17:30',
        label: '5:30 PM',
    },
    {
        value: '19:00',
        label: '7:00 PM',
    },

];

const toleranceMatch = 0.0045;

class MapsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            availableSeats: 1,
            snackbarOpen: false,
            driverMode: false,
            toUniversity: true,
            expanded: false,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            pathRoute: [],
            position: null,
            hour: "",
            day: "",
            university: {lat: 4.782715, lng: -74.042611},
            meetingPoint: null,
            possiblePassengers: []
        };
        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);

        // Other binds
        this.setRefInput = this.setRefInput.bind(this);
        this.setCurrentPosition = this.setCurrentPosition.bind(this);
        this.passengerRequestTravel = this.passengerRequestTravel.bind(this);
        this.driverCreateTravel = this.driverCreateTravel.bind(this);
        this.convertObjectToLatLng = this.convertObjectToLatLng.bind(this);

        this.setDirectionRoute = this.setDirectionRoute.bind(this)
    }

    // Event handlers
    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    onMapClick = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    onInfoWindowClose = () =>
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });

    handleClick = () => {
        const message = "Has cambiado tu rol a " + (this.state.driverMode ? "pasajero" : "conductor");
        this.setState({
            snackbarOpen: true,
            driverMode: !this.state.driverMode,
            message: message,
            pathRoute: [],
            meetingPoint: null,
            possiblePassengers: []
        });
    };

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({snackbarOpen: false});
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleSwitchChange = name => event => {
        this.setState({[name]: event.target.checked});
    };

    //Set aux functions
    setCurrentPosition(position) {
        const latLng = {lat: position.coords.latitude, lng: position.coords.longitude};
        this.reverseGeocode(latLng);
        this.setState({userPosition: latLng, position: latLng});
    }

    setRefInput(ref) {
        this.autocomplete = ref;
    }

    //Map functions
    moveMarker = (props, marker, coord) => {
        const {latLng} = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.reverseGeocode(latLng);
        this.setState({userPosition: {lat, lng}});

    };

    reverseGeocode(latLng) {
        const {google} = this.props;
        const geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': latLng}, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    this.autocomplete.value = results[0].formatted_address;

                } else {
                    this.autocomplete.value = "Posición desconocida";
                }
            } else {
                this.autocomplete.value = "Posición desconocida";
            }
        });
    }

    renderAutoComplete() {
        const {google, map} = this.props;

        if (!google || !map) return;

        const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
        autocomplete.bindTo('bounds', map);

        // Set initial restrict to the greater list of countries.
        autocomplete.setComponentRestrictions({'country': ['co']});

        // Specify only the data fields that are needed.
        autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();

            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No hay detalles sobre: '" + place.name + "'");
                return;
            }

            if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
            else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
            const userPosition = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
            this.setState({position: place.geometry.location, userPosition: userPosition});
        });
    }

    setDirectionRoute() {
        const {google, map} = this.props;
        if (!google || !map) return;
        const directionsService = new google.maps.DirectionsService();
        directionsService.route({
            origin: this.state.userPosition,
            destination: this.state.university,
            travelMode: 'DRIVING',
        }, (response, status) => {
            if (status === 'OK') {
                const pathRoute = response.routes[0];
                const message = "Duracion estimada: " + pathRoute.legs[0].duration.text;
                this.setState({pathRoute: pathRoute, snackbarOpen: true, message: message});
                this.driverCreateTravel()
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    convertLatLngToObject(array) {
        return array.map(latLng => {
            return {lat: latLng.lat(), lng: latLng.lng()}
        })
    }

    convertObjectToLatLng(obj) {
        const {google} = this.props;
        return new google.maps.LatLng(obj.lat, obj.lng)
    }

    //Firebase functions
    async driverCreateTravel() {
        const {google} = this.props;
        const time = `${this.state.day} ${this.state.hour}`;
        const points = this.convertLatLngToObject(this.state.pathRoute.overview_path);
        await firebase.addTripV2(this.state.availableSeats, points, firebase.isLoggedIn().email, time, this.state.toUniversity, points);
    }

    async matchDriverWithPassengers(possiblePassengers) {
        this.setState({possiblePassengers: possiblePassengers});
        // possiblePassengers.forEach((passenger) => {
        //     firebase.addPassengerToTripV2(
        //         firebase.isLoggedIn().email,
        //         passenger.email,
        //         time,
        //         passenger.point)
        // })
    }

    async passengerRequestTravel() {
        const tripRequest = await firebase.addTripRequestV2(firebase.isLoggedIn().email, `${this.state.day} ${this.state.hour}`, this.state.userPosition, this.state.toUniversity);
    }

    async matchPassengerWithDriver(trip) {
        const pathPoints = {overview_path: trip.route};
        if (pathPoints) {
            const message = "Necesitas caminar " + trip.distance + "m";
            firebase.addPassengerToTripV2(trip.driverEmail,`${this.state.day} ${this.state.hour}`, trip.meetingPoint);
            this.setState({snackbarOpen: true, message: message, meetingPoint: trip.meetingPoint, pathRoute: pathPoints})
        } else {
            this.setState({pathRoute: []});

            alert("No hemos encontrado una ruta cerca a tu ubicacion pero te hemos agregado a una lista de espera")
        }
    }

    getUserPointToRoute(userLocation, pathRoute) {
        const {google} = this.props;
        let minDistance = 1 << 30;
        let index = pathRoute.length;
        pathRoute.forEach((point, i) => {
            const dis = google.maps.geometry.spherical.computeDistanceBetween(point, userLocation);
            if (minDistance > dis) {
                minDistance = dis;
                index = i;
            }
        });
        return {index: index, distance: Math.round(minDistance), point: pathRoute[index]};
    }

    //React component functions
    componentDidMount() {
        this.renderAutoComplete();
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setCurrentPosition)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.map !== prevProps.map) this.renderAutoComplete();
    }

    render() {
        const {classes} = this.props;

        const style = {
            width: '100vw',
            height: '100vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        };

        return (
            <>
                <Paper className={classes.root} elevation={1}>
                    <Grid container>
                        <Grid item xs={12} className={classes.position}>
                            <IconButton className={classes.iconButton}
                                        onClick={() => this.setState({expanded: !this.state.expanded})}
                                        aria-label="Menu">
                                <DetailsIcon/>
                            </IconButton>
                            <FormControl fullWidth onSubmit={e => e.preventDefault()}>
                                <SearchBar required
                                           placeholder={this.state.toUniversity ? this.state.driverMode ? "Direccion de salida" : "Direccion de recogida" : "Direccion de destino"}
                                           autocomplete={this.setRefInput}/>
                            </FormControl>
                            <Divider className={classes.divider}/>
                            <IconButton color="primary" className={classes.iconButton} onClick={this.handleClick}
                                        aria-label="Directions">
                                {this.state.driverMode ? <DriverIcon/> : <PassangerIcon/>}
                            </IconButton>
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                style={{left: "unset"}}
                                open={this.state.snackbarOpen}
                                onClose={this.handleSnackbarClose}
                                autoHideDuration={6000}
                                ContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={
                                    <span id="message-id">
                                        {this.state.message}
                                    </span>
                                }
                                action={[

                                    <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        className={classes.close}
                                        onClick={this.handleSnackbarClose}
                                    >
                                        <CloseIcon/>
                                    </IconButton>,
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Collapse in={this.state.expanded} className={classes.absolute} timeout="auto"
                                      unmountOnExit>
                                <CardContent>
                                    <form onSubmit={e => e.preventDefault()}>
                                        <Grid container spacing={24}>

                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="weekDay"
                                                    select
                                                    variant="outlined"
                                                    type='text'
                                                    label="Día del viaje"
                                                    fullWidth
                                                    value={this.state.day}
                                                    onChange={this.handleChange('day')}

                                                >
                                                    {availableDays.map(option => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="hour"
                                                    select
                                                    variant="outlined"
                                                    type='text'
                                                    label={this.state.toUniversity ? "Hora de llegada" : "Hora de salida"}
                                                    fullWidth
                                                    value={this.state.hour}
                                                    onChange={this.handleChange('hour')}

                                                >
                                                    {availableHours.map(option => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={this.state.toUniversity}
                                                            onChange={this.handleSwitchChange('toUniversity')}
                                                            value="toUniversity"
                                                            color="primary"
                                                        />
                                                    }
                                                    label={this.state.toUniversity ? "Viajas hacia la U" : "Viajas desde la U"}
                                                />
                                            </Grid>
                                            {this.state.driverMode ?
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        required
                                                        id="availableSeats"
                                                        select
                                                        variant="outlined"
                                                        type='text'
                                                        label="Con cuantos cupos cuentas?"
                                                        fullWidth
                                                        value={this.state.availableSeats}
                                                        onChange={this.handleChange('availableSeats')}
                                                    >
                                                        {availableSeats.map(option => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                                : null
                                            }

                                        </Grid>
                                    </form>
                                </CardContent>
                                <CardActions>
                                    {this.state.driverMode ?
                                        <Button size="medium" color="primary" onClick={this.setDirectionRoute}>
                                            Crear Viaje
                                        </Button>
                                        :
                                        <Button size="medium" color="primary" onClick={this.passengerRequestTravel}>
                                            Solicitar Viaje
                                        </Button>
                                    }
                                </CardActions>
                            </Collapse>
                        </Grid>
                    </Grid>
                </Paper>
                <div className='center-map'>
                    <Map
                        mapTypeControl={false}
                        item
                        xs={12}
                        style={style}
                        google={this.props.google}
                        onClick={this.onMapClick}
                        zoom={17}
                        center={this.state.position}
                        initialCenter={this.state.university}
                        centerAroundCurrentLocation={false}
                    >
                        {this.state.driverMode ?
                            <Marker
                                onClick={this.onMarkerClick}
                                title={'Escuela colombiana de ingenieria Julio Garavito'}
                                position={this.state.university}
                                name={'Escuela colombiana de ingenieria Julio Garavito'}
                                description={'AK 45 #205-59 Bogota\nInstitucion universitaria'}
                            />
                            :
                            null
                        }

                        {this.state.meetingPoint ?
                            <Marker
                                onClick={this.onMarkerClick}
                                title={"Punto de encuentro con el conductor"}
                                position={this.state.meetingPoint.point}
                                name={"Punto de encuentro con " + this.state.meetingPoint.driver.name}
                                description={"vas a tener que caminar " + this.state.meetingPoint.distance + "m"}
                            />
                            : null
                        }
                        {this.state.possiblePassengers.map((passenger, i) => {
                            return (
                                <Marker
                                    onClick={this.onMarkerClick}
                                    title={i}
                                    position={passenger.point}
                                    name={passenger.user.name}
                                    description={"Pasajero número " + (i + 1)}
                                />);
                        })
                        }
                        <Marker
                            onClick={this.onMarkerClick}
                            title={'Si posicion'}
                            position={this.state.userPosition}
                            name={'Su posición'}
                            description={'Indique su ubicacion actual arrastrando el marcador'}
                            draggable={true}
                            onDragend={this.moveMarker}
                        />
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onInfoWindowClose}
                        >
                            <Paper>
                                <Typography
                                    variant='headline'
                                    component='h4'
                                >
                                    {this.state.selectedPlace.name}
                                </Typography>
                                <Typography
                                    component='p'
                                >
                                    {this.state.selectedPlace.description}
                                </Typography>
                            </Paper>
                        </InfoWindow>
                        <Polyline
                            path={this.state.pathRoute.overview_path}
                            strokeColor={this.state.toUniversity ? "#0000FF" : "#FF0000"}
                            strokeOpacity={0.6}
                            strokeWeight={8}/>
                    </Map>
                </div>
            </>
        );
    }
}

MapsContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

const MapWrapper = props => (
    <div className="unAbsolute">
        <Map className="map" google={props.google} visible={false}>
            <MapsContainer {...props} />
        </Map>
    </div>
);

const LoadingContainer = (props) => (
    <div className="center-loading">
        <CircularProgress size={100} thickness={3.8}/>
    </div>
);

export default withStyles(styles)(GoogleApiWrapper({
    apiKey: 'AIzaSyBb23DZ9UPaSVg-W6e-SEXSGSytg1nAPPw',
    language: "es",
    LoadingContainer: LoadingContainer
})(MapWrapper))