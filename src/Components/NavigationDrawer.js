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
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import MenuList from "@material-ui/core/MenuList";
import CoinPurse from './CoinPurse.js';
import {Route, Link} from "react-router-dom";
import MapView from './Maps/Maps';
import AddPayment from './AddPayment.js';
import History from './History';
import AddMoney from './AddMoney';
import ScheduleTripsView from "./ScheduledTripsView";
import CreateAndEditView from "./CreateAndEditView";


const drawerWidth = 280;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    avatarBox: {
        width: '80%',
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
            width: theme.spacing.unit * 8,
        },
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    avatar: {
        margin: theme.spacing.unit - 10,
        width: 50,
        height: 50,
    },
});

class NavigationDrawer extends React.Component {
    state = {
        open: false,

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
                <CssBaseline/>
                <div className={classes.root}>
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
                                    left: -5,
                                }}>
                                    <Avatar>N</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Nicolas Garcia"
                                    secondary="nicoga97@gmail.com"
                                />
                                <ListItemSecondaryAction style={{
                                    position: 'absolute',
                                    left: 220,
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

                            <ListItem button key="travell" component={Link} to="/mainView/">
                                <ListItemIcon><DirectionsCarIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Programa tu vaje"/>
                            </ListItem>
                            <ListItem button key="week" component={Link} to="/mainView/scheduledTrips">
                                <ListItemIcon><DateRangeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Programa tu semana"/>
                            </ListItem>
                            <ListItem button key="tasks" component={Link} to="/mainView/coinpurse">
                                <ListItemIcon><AtachMoneyIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Monedero"/>
                            </ListItem>
                            <ListItem button key="sign-out" component={Link} to="/mainView/tasks">
                                <ListItemIcon><LaunchIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Cerrar sesion"/>
                            </ListItem>

                        </MenuList>


                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <Route exact path={this.props.match.url + "/coinpurse"} component={CoinPurse}/>
                        <Route exact path={this.props.match.url + "/"} component={MapView}/>

                        <Route path={this.props.match.url +"/coinpurse/addpayment" }component={AddPayment}/>
                        <Route exact path={this.props.match.url +"/scheduledTrips" }component={ScheduleTripsView}/>
                        <Route exact path={this.props.match.url +"/scheduledTrips/create" }component={CreateAndEditView}/>
                        <Route path={this.props.match.url +"/coinpurse/addmoney"} component={AddMoney}/>
                        <Route path={this.props.match.url +"/coinpurse/history"} component={History}/>

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