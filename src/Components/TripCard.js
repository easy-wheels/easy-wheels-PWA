import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TripDetailsDialog from "./TripDetailsDialog";
import FireBase from "../Firebase";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


const firebase = FireBase.getInstance();
const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    card: {
        minWidth: 255,
    },
    title: {
        fontSize: 14,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    unAbsolute: {
        position: 'static',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },

    section1: {
        margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    },
    section2: {
        margin: theme.spacing.unit * 2,
    },





});

function Transition(props) {
    return <Slide direction="left" {...props} />;
}

class TripCard extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };


    render() {
        const {classes} = this.props;

        return (
            <>
                <Card onClick={this.handleClickOpen}>
                    <CardContent className={classes.card}>

                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {this.props.trip.route.driver.email===firebase.isLoggedIn().email ? <> Eres conductor </> : <>Eres pasajero</>}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Destino: {this.props.trip.route.toHome ? "Casa":"Universidad"}
                        </Typography>
                        <Typography color="textSecondary">
                            {this.props.trip.route.time}
                        </Typography>
                        <Typography component="p">

                        </Typography>

                    </CardContent>

                </Card>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <ChevronLeftIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                Detalles del viaje
                            </Typography>

                        </Toolbar>
                    </AppBar>
                    <main className={classes.content}>
                        <TripDetailsDialog trip={this.props.trip}/>

                    </main>

                </Dialog>

            </>
        );
    }
}

TripCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TripCard);