import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";

const Purse = () => (
    <>
        <Typography variant="subtitle1" >
            Dinero en el monedero:
        </Typography>
        <Typography variant="h3" gutterBottom>
            $2,500
        </Typography>
        <Divider/>
        <List>
            <ListItem button component={Link} to="/mainView/coinpurse/addmoney">
                Agregar Dinero al Monedero
            </ListItem>
            <Divider/>
            <ListItem button component={Link} to="/mainView/coinpurse/history">
                Historial de transacciones
            </ListItem>
            <Divider/>
            <ListItem button component={Link} to="/mainView/coinpurse/addpayment">
                Agregar metodo de pago
            </ListItem>
        </List>
        <Divider/>
    </>
)

class CoinPurse extends React.Component{
    render() {
        return (
           <Purse/>
        );
    }
}

export default CoinPurse;