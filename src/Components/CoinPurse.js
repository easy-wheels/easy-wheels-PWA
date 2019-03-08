import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Purse = () => (
    <>
        <Card>
            <CardContent>
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
            <ListItem button component={Link} to="/mainView/coinpurse/mycards">
                 Mis tarjetas
            </ListItem>
        </List>
            </CardContent>
        </Card>
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