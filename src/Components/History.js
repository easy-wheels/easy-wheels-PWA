import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class History extends React.Component{

    render(){
        const travels = [{"date":"2019-01-01","quantity":"-2500","method":"Pasajero"},
            {"date":"2019-01-03","quantity":"+4000","method":"Conductor"},
            {"date":"2019-01-02","quantity":"-3500","method":"Pasajero"},
            {"date":"2019-01-04","quantity":"+4000","method":"Conductor"}]
        return(
            <>
                <List>
                    {travels.map((value) => {
                        return(
                            <div key={value.date+value.quantity+value.method}>
                                <ListItem>
                                <Card style={{width:"90%"}}>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                             Fecha:
                                        </Typography>
                                        <Typography variant="h6" >
                                            {value.date}
                                        </Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                             Valor:
                                        </Typography>
                                        {console.log(value.quantity[0])}
                                        {value.quantity[0]==="-"?<Typography variant="h5" style={{color:"red"}}>
                                            {value.quantity}
                                        </Typography>:<Typography variant="h5" style={{color:"green"}}>
                                            {value.quantity}
                                        </Typography>}

                                        <Typography color="textSecondary" gutterBottom>
                                             Metodo:
                                        </Typography>
                                        <Typography variant="h6">
                                         {value.method}
                                         </Typography>
                                    </CardContent>
                                    </Card>
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