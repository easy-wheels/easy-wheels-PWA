import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import AddPayment from './AddPayment.js';
import History from './History';
import AddMoney from './AddMoney';
import Divider from "@material-ui/core/Divider";

const Purse = () => (
    <>
        <Typography variant="subtitle1" >
            Dinero en el monedero:
        </Typography>
        <Typography variant="h3" gutterBottom>
            $2,500
        </Typography>
        <List>
            <ListItem button component={Link} to="/addmoney">
                Agregar Dinero al Monedero
            </ListItem>
            <ListItem button component={Link} to="/history">
                Historial de transacciones
            </ListItem>
            <ListItem button component={Link} to="/addpayment">
                Agregar metodo de pago
            </ListItem>
        </List>
        <Divider/>
    </>
)

class CoinPurse extends React.Component{
    render() {
        return (
            <>
                <Router>
                    <>
                    <Route path="/" component={Purse}/>
                    <Route path="/addpayment" component={AddPayment}/>
                    <Route path="/addmoney" component={AddMoney}/>
                    <Route path="/history" component={History}/>
                    </>
                </Router>
            </>
        );
    }
}

export default CoinPurse;