import React from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker, Polyline} from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SearchBar from "./SearchBar";
import {MuiPickersUtilsProvider, DatePicker} from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import './Maps.css';
import Button from "@material-ui/core/Button";

class MapsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            pathCoords: [],
            position: null,
            dueDate: new Date()
        };
        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.centerMoved = this.centerMoved.bind(this);
    }

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
    moveMarker = (props, marker, coord) => {
        console.log(marker);
        console.log(coord);
        const {latLng} = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.setState({position: {lat, lng}});
        console.log({lat, lng});
        console.log(marker);
    };

    componentDidMount() {
        this.renderAutoComplete();

    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps.map) this.renderAutoComplete();
    }

    onSubmit(e) {
        e.preventDefault();
    }

    renderAutoComplete() {
        const {google, map} = this.props;

        if (!google || !map) return;

        const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
        autocomplete.bindTo('bounds', map);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();

            if (!place.geometry) return;

            if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
            else {
                map.setCenter(place.geometry.location);
                map.setZoom(18);
            }

            this.setState({position: place.geometry.location});
        });
    }

    centerMoved(mapProps, map) {
        const coord = {lat: map.getCenter().lat(), lng: map.getCenter().lng()};
        this.setState({position: coord})
    }


    render() {
        if (!this.props.loaded) return <h1>Loading...</h1>;
        const style = {
            width: '100vw',
            height: '100vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        };

        return (
            <>
                <Paper elevation={5} className="floating-panel">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            margin="normal"
                            label="Fecha"
                            value={this.state.dueDate}
                            clearable
                            onChange={date => this.setState({dueDate: date})}
                        />
                    </MuiPickersUtilsProvider>
                    <form onSubmit={this.onSubmit}>
                        <SearchBar ref={ref => (this.autocomplete = ref)}/>
                    </form>
                </Paper>
                <div className='unAbsolute'>
                    <Map
                        item
                        xs={12}
                        style={style}
                        google={this.props.google}
                        onClick={this.onMapClick}
                        center={this.state.position}
                        zoom={17}
                        onDragend={this.centerMoved}
                    >
                        <Marker
                            onClick={this.onMarkerClick}
                            title={'Escuela colombiana de ingenieria Julio Garavito'}
                            position={{lat: 4.782715, lng: -74.042611}}
                            name={'Escuela colombiana de ingenieria Julio Garavito'}
                            description={'AK 45 #205-59 Bogota\nInstitucion universitaria'}
                        />
                        <Marker
                            onClick={this.onMarkerClick}
                            title={'Su posicion'}
                            position={this.state.position}
                            name={'Su posicion'}
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
                            path={this.state.pathCoords}
                            strokeColor="#0000FF"
                            strokeOpacity={0.8}
                            strokeWeight={2}/>
                    </Map>
                </div>
                <Button className="floating-button" variant="outlined" color="primary">
                    Pasajero
                </Button>
                <Button className="floating-button-conductor" variant="outlined" color="primary">
                    Conductor
                </Button>
            </>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyBb23DZ9UPaSVg-W6e-SEXSGSytg1nAPPw'
})(MapsContainer)