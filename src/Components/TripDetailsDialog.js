import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from '@material-ui/core/Grid';
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import classNames from 'classnames';
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import GoogleMapsContainer from "./Maps/MapsContainer";
import './Maps/Maps.css';
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from "./CustomToolbarSelect";

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
        display:'flex',
        flexDirection:'row',
        position:'initial !important'
    },


});
const columns = [
    {
        name: "name",
        label: "Nombre",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "location",
        label: "Lugar de recogida",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "state",
        label: "Estado",
        options: {
            filter: true,
            sort: true,
        }
    },

];
const data = [
    ["Camilo rodriguez", "Carrera 19a #159-73", "Sugerido"],
    ["Andres Valero", "Calle 20 #15-73", "Sugerido"],
    ["Daniela Catañeda", "Carrera 7 #134-6", "No sugerido"],
    ["James David", "Carrera 7 #134-6", "No sugerido"],
];

const options = {
    print: false,
    download: false,
    viewColumns: false,
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows}/>
    ),
};

class TripDetailsDialog extends React.Component {
    state = {
        expanded: false,
        passenger: "",
    };

    render() {
        const {classes} = this.props;
        const passengers = this.props.trip.passengers.map((passenger, i) => {
            return (
                <Chip avatar={<Avatar>{passenger.name.match(/\b(\w)/g).join('')}</Avatar>} value={passenger} onClick={() => this.setState( {expanded: !this.state.expanded, passenger:passenger})} className={classes.chip} label={passenger.name}/>
            );
        });
        return (
            <Grid container spacing={24}>
                <Grid wrap="nowrap" item xs={12} sm={6}>
                    <Card >
                        <CardContent className={classes.card}>

                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Detalles del Viaje
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {this.props.trip.driver ? <> Viajas como conductor </> : <>Viajas como
                                    pasajero</>}
                            </Typography>
                            <br/>

                            <Typography component="p">
                                Tu destino es {this.props.trip.destination.desc}
                            </Typography>
                            <Typography component="p">
                                Tu lugar de salida es {this.props.trip.origin.desc}
                            </Typography>
                            <Typography color="textSecondary">
                                {this.props.trip.day}-{this.props.trip.hour}
                            </Typography>
                            <br/>


                            {this.props.trip.driver ?
                                <>
                                    <Divider/>
                                    <br/>
                                    <Typography gutterBottom variant="body1">
                                        Pasajeros
                                    </Typography>
                                    <div >
                                        {passengers}
                                    </div>


                                </>
                                : <>Viajas como
                                    pasajero</>}

                        </CardContent>
                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                            <CardContent className={classes.details}>
                                <div className={classes.column2}>
                                    <GoogleMapsContainer

                                        markerPosition={this.state.passenger.pickup}
                                        markerTitle={"Punto de recogida de " + this.state.passenger.name}
                                    />
                                </div>


                                <div className={classNames(classes.column, classes.helper)}>
                                    <Typography variant="caption">
                                        {this.state.passenger.name}
                                        <br />
                                        Celular: {this.state.passenger.phone}
                                    </Typography>
                                </div>
                            </CardContent>
                            <CardActions className={classes.actions}>
                                <Button size="medium" color="secondary">
                                    Eliminar pasajero
                                </Button>
                            </CardActions>
                        </Collapse>


                    </Card>

                </Grid>
                <Grid wrap="nowrap" item xs={12} sm={6}>
                    <MUIDataTable
                        title={"Posibles pasajeros"}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </Grid>
            </Grid>


        );
    }
}

TripDetailsDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TripDetailsDialog);