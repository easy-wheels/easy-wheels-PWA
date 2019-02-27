import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';

class AddMoney extends React.Component{

    render(){
        return(
            <>
                <Typography variant="subtitle1" >
                    Id: 53252525
                </Typography>
                <Typography variant="subtitle1" >
                    Con el siguiente Id puede dirigirse a cualquier de los puntos de recarga
                    y agregar dinero a su monedero.
                </Typography>
            </>
        );
    }
}

export default AddMoney;