import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";

class AddMoney extends React.Component{

    render(){
        return(
            <>
                <Typography variant="h5" >
                    Id: 53252525
                </Typography>
                <Divider/>
                <Typography variant="subtitle1" >
                    Con el siguiente Id puede dirigirse a cualquier de los puntos de recarga
                    y agregar dinero a su monedero.
                </Typography>
            </>
        );
    }
}

export default AddMoney;