import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Typography} from "@material-ui/core";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

export default class CreditCard extends React.Component{

    constructor(props) {
        super(props);

    }


    render(){
        return(
            <>
                <Card>
                    <CardContent>
                        <Typography>
                            {this.props.tipo}
                        </Typography>
                        <Typography variant="h5">
                            {this.props.numero}
                        </Typography>
                    </CardContent>
                    <CardActions align="right">
                        <Button size="small" >Eliminar</Button>
                    </CardActions>
                </Card>
            </>
        );
    }
}