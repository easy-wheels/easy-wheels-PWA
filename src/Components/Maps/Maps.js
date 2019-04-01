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
import {DateTimePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FireBase from "../../Firebase";
import {getDayAsString, getHoursAsString} from "../../DateManager";


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

class MapsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            availableSeats: 1 ,
            snackbarOpen: false,
            driverMode: false,
            toUniversity: true,
            expanded: false,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            pathCoordinates: [],
            position: null,
            dueDate: new Date(),
            university: {lat: 4.782715, lng: -74.042611}
        };
        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);

        // Other binds
        this.setRefInput = this.setRefInput.bind(this);
        this.setCurrentPosition = this.setCurrentPosition.bind(this);
        this.userRequestTravel = this.userRequestTravel.bind(this);
        this.driverCreateTravel = this.driverCreateTravel.bind(this);

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
        this.setState({snackbarOpen: true, driverMode: !this.state.driverMode});
    };

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({snackbarOpen: false});
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleSwitchChange = name => event => {
        this.setState({ [name]: event.target.checked });
      };

    //Set aux functions
    setCurrentPosition(position) {
        const latLng = {lat: position.coords.latitude, lng: position.coords.longitude};
        // this.reverseGeocode(latLng);
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

            this.setState({position: place.geometry.location, userPosition: place.geometry.location});
        });
    }

    setDirectionRoute() {
        const {google, map} = this.props;
        if (!google || !map) return;
        const directionsService = new google.maps.DirectionsService();
        const directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        directionsService.route({
            origin: this.state.userPosition,
            destination: this.state.university,
            travelMode: 'DRIVING',
            drivingOptions: {
                departureTime: this.state.dueDate
            }
        }, (response, status) => {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                const overViewCoords = response.routes[0].overview_path;
                this.setState({pathCoordinates: overViewCoords});
                console.log(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
        this.setState({loadV: true})
    }

    //Google maps functions
    driverCreateTravel() {
        firebase.addRoute(firebase.isLoggedIn().email,
            getDayAsString(this.state.dueDate),
            getHoursAsString(this.state.dueDate),
            !this.state.toUniversity,
            this.state.pathCoordinates)
            .then(a => console.log(a));
    }

    userRequestTravel() {
        firebase.addTripRequest(
            firebase.isLoggedIn().email,
            this.state.userPosition,
            getDayAsString(this.state.dueDate),
            getHoursAsString(this.state.dueDate),
            !this.state.toUniversity)
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
                        <Grid wrap="nowrap" item xs={12} className={classes.position}>
                            <IconButton className={classes.iconButton}
                                        onClick={() => this.setState({expanded: !this.state.expanded})}
                                        aria-label="Menu">
                                <DetailsIcon/>
                            </IconButton>
                            <FormControl fullWidth onSubmit={e => e.preventDefault()}>
                                <SearchBar
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
                                style={{left:"unset"}}
                                open={this.state.snackbarOpen}
                                onClose={this.handleSnackbarClose}
                                autoHideDuration={6000}
                                ContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={<span
                                    id="message-id"> Has cambiado tu rol a {this.state.driverMode ? <>conductor</> : <>pasajero</>}</span>}
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
                        <Grid wrap="nowrap" item xs={12}>
                            <Collapse in={this.state.expanded} className={classes.absolute} timeout="auto"
                                      unmountOnExit>
                                <CardContent>
                                    <Grid container spacing={24}>
                                        <Grid item xs={12} sm={6}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DateTimePicker
                                                    label={this.state.toUniversity ? "Fecha y hora de llegada" : "Fecha y hora de salida"}
                                                    clearable
                                                    fullWidth
                                                    variant="outlined"
                                                    minutesStep={30}
                                                    value={this.state.dueDate}
                                                    onChange={date => this.setState({dueDate: date})}/>
                                            </MuiPickersUtilsProvider>
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
                                        :null
                                        }

                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    {this.state.driverMode ?
                                        <Button size="medium" color="primary" onClick={this.driverCreateTravel}>
                                            Crear Viaje
                                        </Button>
                                        :
                                        <Button size="medium" color="primary" onClick={this.userRequestTravel}>
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
                        <Marker
                            onClick={this.onMarkerClick}
                            title={'Escuela colombiana de ingenieria Julio Garavito'}
                            position={this.state.university}
                            name={'Escuela colombiana de ingenieria Julio Garavito'}
                            description={'AK 45 #205-59 Bogota\nInstitucion universitaria'}
                        />
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
                            path={this.state.pathCoordinates}
                            strokeColor="#0000FF"
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