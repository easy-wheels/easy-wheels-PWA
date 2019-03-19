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
import Grid from '@material-ui/core/Grid';
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classNames from 'classnames';
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import GoogleMapsContainer from "./Maps/MapsContainer";
import './Maps/Maps.css';

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

                            <Typography component="p">
                                Tu destino es {this.props.trip.destination.desc}
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
                                <div className={classes.column} />
                                <div className={classes.column}>
                                <div  >
                                    <GoogleMapsContainer/>
                                </div>

                                </div>
                                <div className={classNames(classes.column, classes.helper)}>
                                    <Typography variant="caption">
                                        {this.state.passenger.name}
                                        <br />
                                        Celular: {this.state.passenger.phone}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Collapse>


                    </Card>

                </Grid>
                <Grid wrap="nowrap" item xs={12} sm={6}>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton>
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title="Shrimp and Chorizo Paella"
                            subheader="September 14, 2016"
                        />

                        <CardContent>
                            <Typography component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook
                                together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.actions} disableActionSpacing>
                            <IconButton aria-label="Add to favorites">
                                <FavoriteIcon/>
                            </IconButton>
                            <IconButton aria-label="Share">
                                <ShareIcon/>
                            </IconButton>
                            <IconButton
                                className={classNames(classes.expand, {
                                    [classes.expandOpen]: this.state.expanded,
                                })}
                                onClick={this.handleExpandClick}
                                aria-expanded={this.state.expanded}
                                aria-label="Show more"
                            >
                                <ExpandMoreIcon/>
                            </IconButton>
                        </CardActions>
                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                    aside for 10
                                    minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                    medium-high
                                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally
                                    until lightly
                                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside,
                                    leaving
                                    chicken and chorizo in the pan. Add pimentón, bay leaves, garlic,
                                    tomatoes, onion,
                                    salt and pepper, and cook, stirring often until thickened and fragrant,
                                    about 10
                                    minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring
                                    to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and
                                    peppers, and cook
                                    without stirring, until most of the liquid is absorbed, 15 to 18
                                    minutes. Reduce heat
                                    to medium-low, add reserved shrimp and mussels, tucking them down into
                                    the rice, and
                                    cook again without stirring, until mussels have opened and rice is just
                                    tender, 5 to 7
                                    minutes more. (Discard any mussels that don’t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            </Grid>


        );
    }
}

TripDetailsDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TripDetailsDialog);