import React from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class GoogleMapsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            userPosition: {lat: 4.782515, lng: -74.048611}
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
    moveMarker = (props, marker,coord) => {
        console.log(marker);
        console.log(coord);
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.setState({position: {lat,lng}});
        console.log({lat,lng});
        console.log(marker);
    };

    render() {
        if (!this.props.loaded) return <h1>Loading...</h1>;
        const style = {
            width: '50vw',
            height: '75vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        };
        return (
            <Map
                item
                xs={12}
                style={style}
                google={this.props.google}
                onClick={this.onMapClick}
                zoom={14}
                initialCenter={{lat: 4.782715, lng: -74.042611}}
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
                    title={'Si posicion'}
                    position={this.state.userPosition}
                    name={'Su posicion'}
                    description={'Indique su ubicacion actual arrastrando el indicador'}
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
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    api: (process.env.GOOGLE_API_KEY_GOES_HERE)
})(GoogleMapsContainer)