import React from 'react';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CreditCard from '@material-ui/icons/CreditCard';
import DateRange from '@material-ui/icons/DateRange';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';



class AddPayment extends React.Component{
    constructor(props){
        super(props);
        this.state = {tipo:"Visa"};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return(
          <>
              <Card>
                  <CardContent>
                      <form>
                          <Typography variant="h4">
                              Agregar Tarjeta
                          </Typography>
                          <FormControl  margin="normal" required fullWidth>
                              <InputLabel htmlFor="status" required={true} shrink={true}
                                          startadornment={
                                              <InputAdornment position="start">
                                                  <CreditCard style={{ fontSize: 30 }}/>
                                              </InputAdornment>
                                          }>Tipo</InputLabel>
                              <Select
                                  onChange={this.handleChange}
                                  value={this.state.tipo}
                                  input={
                                      <Input
                                          name="tipo"
                                          id="tipo"
                                          startAdornment={
                                              <InputAdornment position="start">
                                                  <CreditCard style={{ fontSize: 30 }}/>
                                              </InputAdornment>
                                          }
                                          labelwidth={100}
                                      />
                                  }
                              >
                                  <MenuItem value={"Visa"} default>Visa</MenuItem>
                                  <MenuItem value={"Master Card"}>Master Card</MenuItem>
                              </Select>
                          </FormControl>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="titular">Titular</InputLabel>
                      <Input id="titular" name="titular" onChange={this.handleChange} startAdornment={
                                                                     <InputAdornment position="start">
                                                                       <AccountCircle style={{ fontSize: 30 }}/>
                                                                     </InputAdornment>
                                                                   }/>
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="numTarjeta">Numero de la tarjeta</InputLabel>
                      <Input id="numTarjeta" name="numTarjeta" onChange={this.handleChange} startAdornment={
                                                                              <InputAdornment position="start">
                                                                               <CreditCard style={{ fontSize: 30 }}/>
                                                                              </InputAdornment>
                                                                                                                                  }/>
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="codSeguridad">Codigo de Seguridad</InputLabel>
                      <Input id="codSeguridad" name="codSeguridad" onChange={this.handleChange} startAdornment={
                                                                                  <InputAdornment position="start">
                                                                                   <CreditCard style={{ fontSize: 30 }}/>
                                                                                   </InputAdornment>
                                                                                                                                      }/>
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="fechaExpiracion">Fecha De expiracion</InputLabel>
                      <Input id="fechaExpiracion" name="fechaExpiracion" onChange={this.handleChange} type="date" startAdornment={
                                                                                        <InputAdornment position="start">
                                                                                         <DateRange style={{ fontSize: 30 }}/>
                                                                                        </InputAdornment>
                                                                                                                                            }/>
                  </FormControl>

                  <Button  size="large" color="primary" variant="contained">Submit</Button>
                      </form>
                  </CardContent>
                  </Card>

          </>
        );
    }
}

export default AddPayment;