import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddPassengerIcon from '@material-ui/icons/HowToReg';
import {withStyles} from "@material-ui/core/styles";

const defaultToolbarSelectStyles = {
    iconButton: {
        marginRight: "24px",
        top: "50%",
        display: "inline-block",
        position: "relative",
        transform: "translateY(-50%)",
    },

    inverseIcon: {
        transform: "rotate(90deg)",
    },
    icon: {},
};

class CustomToolbarSelect extends React.Component {


    handleClickBlockSelected = () => {
        console.log(`block users with dataIndexes: ${this.props.selectedRows.data.map(row => row.dataIndex)}`);
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={"custom-toolbar-select"}>

                <Tooltip title={"Agregar pasajero"}>
                    <IconButton className={classes.iconButton} aria-label="Agregar pasajero"
                                onClick={this.handleClickBlockSelected}>
                        <AddPassengerIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default withStyles(defaultToolbarSelectStyles, {name: "CustomToolbarSelect"})(CustomToolbarSelect);
