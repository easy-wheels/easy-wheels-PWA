import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class History extends React.Component{

    render(){
        const travels = [{"date":"2019-01-01","quantity":"-2500","method":"pasagero"},
            {"date":"2019-01-02","quantity":"-3500","method":"pasagero"},
            {"date":"2019-01-03","quantity":"+4000","method":"conductor"}]
        return(
            <>
                <List>
                    {travels.map((value) => {
                        return(
                            <div key={value.date+value.quantity+value.method}>
                                <ListItem>
                                    Fecha: {value.date} Valor: {value.quantity} Metodo: {value.method}
                                </ListItem>
                            </div>
                        );
                    })}
                </List>
            </>
        );
    }
}

export default History;