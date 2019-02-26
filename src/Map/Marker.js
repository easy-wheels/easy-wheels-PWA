import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import './Marker.css';
import markerIcon from './markerIcon.svg'

class Marker extends Component {

    render() {
        return (
            <table>
                <tr>
                    <td>
                        <img alt="markerimg" src={markerIcon} className="markerIcon"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Typography>{this.props.text}</Typography>
                    </td>
                </tr>
            </table>

        );
    }
}

export default Marker;
