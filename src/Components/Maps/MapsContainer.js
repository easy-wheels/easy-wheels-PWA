import React from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Maps.css';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';


const styles   = theme => ({
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


    render() {
        const {classes} = this.props;
        if (!this.props.loaded) return <h1>Loading...</h1>;

        return (

               <Map
                   style={{ height: '20vh', 'marginLeft': '5px', 'marginRight': '5px',position:'fixed'}}
                   item
                   xs={12}
                   className="container"
                   google={this.props.google}
                   onClick={this.onMapClick}
                   centerAroundCurrentLocation
                   center={{lat: this.props.markerPosition.lat, lng: this.props.markerPosition.lng}}
                   zoom={14}>
               <Marker
                   onClick={this.onMarkerClick}
                   name={" "}
                   position={{lat: this.props.markerPosition.lat, lng: this.props.markerPosition.lng}}
                   description={this.props.markerTitle}
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
GoogleMapsContainer.propTypes = {
        classes: PropTypes.object.isRequired,
    };
export default  withStyles(styles)(GoogleApiWrapper({
                                       apiKey: 'AIzaSyBb23DZ9UPaSVg-W6e-SEXSGSytg1nAPPw'
                                   })(GoogleMapsContainer));

