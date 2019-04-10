import React from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker, Polyline} from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Maps.css';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
    map: {
        width: '20vw',
        height: '20vh',
        marginLeft: '10px',
        marginRight: '10px'
    },


});

class GoogleMapsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            userPosition: ""
        };
        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
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
    //Map functions
    moveMarker = (props, marker, coord) => {
        const {latLng} = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.reverseGeocode(latLng);
        this.props.setPoint(lat, lng);


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

    render() {
        if (!this.props.loaded) return <h1>Loading...</h1>;

        return (
            <Map
                style={{height: '20vh', 'marginLeft': '5px', 'marginRight': '5px', position: 'fixed'}}
                item
                xs={12}
                className="container"
                google={this.props.google}
                onClick={this.onMapClick}
                centerAroundCurrentLocation

                zoom={14}>

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

                <Marker
                    onClick={this.onMarkerClick}
                    position={this.props.dragableMarker}
                    name={'Punto de recogida de'}
                    draggable={true}
                    onDragend={this.moveMarker}
                />

                <Polyline
                    path={this.props.route}
                    strokeColor="#0000FF"
                    strokeOpacity={0.6}
                    strokeWeight={8}/>
            </Map>


        );
    }

}

GoogleMapsContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(GoogleApiWrapper({
    apiKey: 'AIzaSyBb23DZ9UPaSVg-W6e-SEXSGSytg1nAPPw'
})(GoogleMapsContainer));

