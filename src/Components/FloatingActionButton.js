import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {Link} from "react-router-dom";

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

function FloatingActionButton(props) {
    const {classes} = props;
    return (
        <div>
            <Fab color="primary" aria-label="Add" component={Link} to="/mainView/scheduledTrips/create"
                 className={classes.fab}>
                <AddIcon/>
            </Fab>
        </div>
    );
}

FloatingActionButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButton);
