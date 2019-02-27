import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

class AddPayment extends React.Component{
    render() {
        return(
          <>
              <form>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="titular">Titular</InputLabel>
                      <Input id="titular" name="titular" />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="numTarjeta">Numero de la targeta</InputLabel>
                      <Input id="numTarjeta" name="numTarjeta" />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="codSeguridad">Codigo de Seguridad</InputLabel>
                      <Input id="codSeguridad" name="codSeguridad" />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="fechaExpiracion">Fecha De expiracion</InputLabel>
                      <Input id="fechaExpiracion" name="fechaExpiracion" />
                  </FormControl>
                  <Button>Submit</Button>
              </form>
          </>
        );
    }
}

export default AddPayment;