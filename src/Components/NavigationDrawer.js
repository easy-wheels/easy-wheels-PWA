import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LaunchIcon from '@material-ui/icons/Launch';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AtachMoneyIcon from '@material-ui/icons/AttachMoney';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import Avatar from "@material-ui/core/Avatar";
import CreateIcon from '@material-ui/icons/Create';
import MatchIcon from '@material-ui/icons/SupervisorAccount';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import MenuList from "@material-ui/core/MenuList";
import CoinPurse from './CoinPurse.js';
import {Link, Route} from "react-router-dom";
import MapView from './Maps/Maps';
import AddPayment from './AddPayment.js';
import History from './History';
import AddMoney from './AddMoney';
import ScheduleTripsView from "./ScheduledTripsView";
import CreateAndEditView from "./CreateAndEditView";
import MyCards from "./MyCards";
import Matches from './Matches';
import Firebase from "../Firebase";

const firebase = Firebase.getInstance();

const drawerWidth = 256;

const styles = theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    avatarBox: {
        width: '100%',
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,

    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    inline: {
        display: 'inline',
    },
    item: {
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
    },
    itemAvatar: {
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
        width: 250,
        whiteSpace: "normal",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',

    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 7,
        },
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: "center",
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
    },
    avatar: {
        margin: theme.spacing.unit - 10,
        width: 50,
        height: 50,
    },
});

class NavigationDrawer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
        };
        this.LogOut = this.LogOut.bind(this);
    }



    LogOut = () =>{
        firebase.doSignOut();
        this.props.history.push('/');
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes, theme} = this.props;

        return (
            <Fragment>
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar
                        position="fixed"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: this.state.open,
                        })}
                    >
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, {
                                    [classes.hide]: this.state.open,
                                })}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap>
                                Easy Wheels
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={classNames(classes.drawer, {
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        })}
                        classes={{
                            paper: classNames({
                                [classes.drawerOpen]: this.state.open,
                                [classes.drawerClose]: !this.state.open,
                            }),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={this.handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                            </IconButton>
                        </div>
                        <Divider/>
                        <List className={classes.avatarBox}>
                            <ListItem>
                                <ListItemAvatar style={{
                                    left: -8,
                                }}>
                                {firebase.isLoggedIn().displayName?<Avatar>{firebase.isLoggedIn().displayName.charAt(0).toUpperCase()}</Avatar>:<Avatar>A</Avatar>}
                                </ListItemAvatar>
                                <ListItemText
                                    primary={firebase.isLoggedIn().displayName}

                                    secondary={
                                        <Typography color="textSecondary" noWrap>
                                            {firebase.isLoggedIn().email}
                                        </Typography>}
                                />

                                <ListItemSecondaryAction style={{
                                    position: 'absolute',
                                    left: 204,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                }}>
                                    <IconButton>
                                        <CreateIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                        <Divider/>
                        <MenuList>
                            <ListItem button key="travel" component={Link} to="/">
                                <ListItemIcon className={classes.item}>
                                    <DirectionsCarIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Programa tu vaje"/>
                            </ListItem>
                            <ListItem button key="week" component={Link} to="/scheduledTrips">
                                <ListItemIcon className={classes.item}>
                                    <DateRangeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Programa tu semana"/>
                            </ListItem>
                            <ListItem button key="coinpurse" component={Link} to="/coinpurse">
                                <ListItemIcon className={classes.item}>
                                    <AtachMoneyIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Monedero"/>
                            </ListItem>
                            <ListItem button key="matches" component={Link} to="/matches">
                                <ListItemIcon className={classes.item}>
                                    <MatchIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Viajes"/>
                            </ListItem>

                            <div style={{bottom:0}}>
                                <ListItem button key="sign-out" onClick={this.LogOut}>
                                    <ListItemIcon className={classes.item}>
                                        <LaunchIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Cerrar sesion"/>
                                </ListItem>
                            </div>
                        </MenuList>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <Route exact path={"/coinpurse"} component={CoinPurse}/>
                        <Route exact path={ "/matches"} component={Matches}/>
                        <Route exact path={"/"} component={MapView}/>
                        <Route exact path={"/coinpurse/addpayment" } component={AddPayment}/>
                        <Route exact path={"/scheduledTrips" } component={ScheduleTripsView}/>
                        <Route exact path={"/scheduledTrips/create" } component={CreateAndEditView}/>
                        <Route exact path={"/coinpurse/addmoney"} component={AddMoney}/>
                        <Route exact path={"/coinpurse/history"} component={History}/>
                        <Route exact path={"/coinpurse/mycards"} component={MyCards}/>
                    </main>
                </div>
            </Fragment>
        );
    }
}

NavigationDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(NavigationDrawer);