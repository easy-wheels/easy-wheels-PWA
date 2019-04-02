import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class AddMoney extends React.Component{

    constructor(props){
        super(props);
        this.state = {value: "pse"}
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    render(){
        return(
            <>
            <Card >
            <CardContent>

                          <FormLabel component="legend">Elija su metodo de pago</FormLabel>
                          <RadioGroup
                            aria-label="gender"
                            name="gender2"
                            value={this.state.value}
                            onChange={this.handleChange}
                          >
                            <FormControlLabel
                              value="pse"
                              control={<Radio color="primary" />}
                              label="PSE"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="payu"
                              control={<Radio color="primary" />}
                              label="PayU"
                              labelPlacement="start"
                            />
                          </RadioGroup>
                          <Button color="primary"
                                  variant="contained"
                                  fullWidth>Siguiente</Button>

            </CardContent>
            </Card>
            </>
        );
    }
}

export default AddMoney;