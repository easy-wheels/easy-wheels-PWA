import React, {Component} from 'react';

import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";


class GoogleMap extends Component {
    static defaultProps = {
        center: {
            lat: 4.782715,
            lng: -74.042611
        },
        zoom: 14
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100vw', 'marginLeft': 'none', 'marginRight': 'none' }}>
                <GoogleMapReact
                    //bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}

                >
                    <Marker
                        lat={this.props.center.lat}
                        lng={this.props.center.lng}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default GoogleMap;