import React from 'react';
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {Link} from "react-router-dom";
import CreditCard from "./CreditCard";
import List from '@material-ui/core/List';

export default class MyCards extends React.Component{
    render() {
        const style = {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed'
        };
        const cards = [{tipo:"Visa",numero:"XXXX-XXXX-XXXX-5236"}];
        return(
            <>
                <List>
                    {cards.map((value => {
                        return(
                          <div key={value.tipo+value.numero}>
                              <CreditCard tipo={value.tipo}
                                            numero = {value.numero}/>
                          </div>
                        );
                    }))}
                </List>
                <Link to="/coinpurse/addpayment">
                    <Fab style={style} aria-label="Add" color='primary'>
                        <AddIcon/>
                    </Fab>
                </Link>
            </>
        );
    }
}