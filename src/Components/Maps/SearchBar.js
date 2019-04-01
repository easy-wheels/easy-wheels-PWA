import React from "react";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {InputBase} from "@material-ui/core";

const styles = theme => ({
    input: {
        marginLeft: 8,
        flex: 1,
    },


});

function SearchBar(props) {
    return (
        <InputBase
            fullWidth
            placeholder={props.placeholder}
            inputRef={ref => (props.autocomplete(ref))}
        />

    );
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);