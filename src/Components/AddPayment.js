import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CreditCard from '@material-ui/icons/CreditCard';
import DateRange from '@material-ui/icons/DateRange';
import InputAdornment from '@material-ui/core/InputAdornment';


class AddPayment extends React.Component{
    render() {
        return(
          <>
              <form>

                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="titular">Titular</InputLabel>
                      <Input id="titular" name="titular" startAdornment={
                                                                     <InputAdornment position="start">
                                                                       <AccountCircle style={{ fontSize: 30 }}/>
                                                                     </InputAdornment>
                                                                   }/>
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="numTarjeta">Numero de la targeta</InputLabel>
                      <Input id="numTarjeta" name="numTarjeta" startAdornment={
                                                                              <InputAdornment position="start">
                                                                               <CreditCard style={{ fontSize: 30 }}/>
                                                                              </InputAdornment>
                                                                                                                                  }/>
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="codSeguridad">Codigo de Seguridad</InputLabel>
                      <Input id="codSeguridad" name="codSeguridad" startAdornment={
                                                                                  <InputAdornment position="start">
                                                                                   <CreditCard style={{ fontSize: 30 }}/>
                                                                                   </InputAdornment>
                                                                                                                                      }/>
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="fechaExpiracion">Fecha De expiracion</InputLabel>
                      <Input id="fechaExpiracion" name="fechaExpiracion" type="date" startAdornment={
                                                                                        <InputAdornment position="start">
                                                                                         <DateRange style={{ fontSize: 30 }}/>
                                                                                        </InputAdornment>
                                                                                                                                            }/>
                  </FormControl>
                  <Button  size="large" color="primary" variant="contained">Submit</Button>
              </form>
          </>
        );
    }
}

export default AddPayment;