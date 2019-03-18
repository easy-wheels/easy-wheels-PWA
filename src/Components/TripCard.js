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
import ExpandMore from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classNames from 'classnames';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ExpandLess from '@material-ui/icons/ExpandLess';

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




});

function Transition(props) {
    return <Slide direction="left" {...props} />;
}

class TripCard extends React.Component {
    state = {
        open: false,
        expanded: false,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };

    render() {
        const {classes} = this.props;
        return (
            <>
                <Card onClick={this.handleClickOpen}>
                    <CardContent className={classes.card}>

                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {this.props.trip.driver ? <> Eres conductor </> : <>Eres pasajero</>}
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
                    <main className={classes.content}>
                        <Grid container spacing={24}>
                            <Grid wrap="nowrap" item xs={12} sm={6}>
                                <Card onClick={this.handleClickOpen}>
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
                                                <List
                                                    component="nav"
                                                    subheader={<ListSubheader component="div">Nested List
                                                        Items</ListSubheader>}
                                                    className={classes.root}
                                                >
                                                    <ListItem button>
                                                        <ListItemIcon>

                                                        </ListItemIcon>
                                                        <ListItemText inset primary="Sent mail"/>
                                                    </ListItem>
                                                    <ListItem button>
                                                        <ListItemIcon>

                                                        </ListItemIcon>
                                                        <ListItemText inset primary="Drafts"/>
                                                    </ListItem>
                                                    <ListItem button onClick={this.handleClick}>
                                                        <ListItemIcon>

                                                        </ListItemIcon>
                                                        <ListItemText inset primary="Inbox"/>
                                                        {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                                                    </ListItem>
                                                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                                        <List component="div" disablePadding>
                                                            <ListItem button className={classes.nested}>
                                                                <ListItemIcon>

                                                                </ListItemIcon>
                                                                <ListItemText inset primary="Starred"/>
                                                            </ListItem>
                                                        </List>
                                                    </Collapse>
                                                </List>

                                            </>
                                            : <>Viajas como
                                                pasajero</>}

                                    </CardContent>
                                    <CardActions>

                                        <Button size="medium" color="secondary">
                                            Cancelar Viaje
                                        </Button>
                                    </CardActions>

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