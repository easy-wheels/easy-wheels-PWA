import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const styles   = theme => ({
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
                <Card onClick={this.handleClickOpen} >
                    <CardContent className={classes.card}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {this.props.trip.driver ?<> Eres conductor </>:<>Eres pasajero</>}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Destino: {this.props.trip.destination.desc}
                        </Typography>
                        <Typography color="textSecondary">
                            {this.props.trip.day}-{this.props.trip.hour}
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
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                Detalles del viaje
                            </Typography>
                            <Button color="inherit" onClick={this.handleClose}>
                                Guardar
                            </Button>
                        </Toolbar>
                    </AppBar>

                </Dialog>
            </>
        );
    }
}

TripCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TripCard);