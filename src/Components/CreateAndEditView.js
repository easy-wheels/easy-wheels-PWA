import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect'
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';



const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Shipping address', 'Payment details', 'Review your order'];



class CreateAndEditView extends React.Component {
  state = {
    activeStep: 0,
    arrivalTime: "7:00 AM",

  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      checkedB: true,
    });
  };

  handleChange = name => event => {
     this.setState({ [name]: event.target.value });
   };


  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Crear o Editar un Viaje
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  classes={{
                    switchBase: classes.iOSSwitchBase,
                    bar: classes.iOSBar,
                    icon: classes.iOSIcon,
                    iconChecked: classes.iOSIconChecked,
                    checked: classes.iOSChecked,
                  }}
                  disableRipple
                  checked={this.state.checkedB}

                  value="checkedB"
                />
              }
              label="Repetir todas las Semanas"
            />

            <div>
                   <FormControlLabel
                       value="start"
                       control={<Radio color="primary" />}
                       label="Conductor"
                       labelPlacement="End"
                     />
            </div>

            <div>
                   <FormControlLabel
                       value="start"
                       control={<Radio color="primary" />}
                       label="Pasajero"
                       labelPlacement="End"
                     />
            </div>

            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order confirmation, and will
                    send you an update when your order has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                <br/>
                <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel component="legend">Dias a Programar</FormLabel>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox checked="true" value="Lunes" />
                              }
                              label="Lunes"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox checked="true" value="Martes" />
                              }
                              label="Martes"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked="false"

                                  value="antoine"
                                />
                              }
                              label="Miercoles"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked="false"

                                  value="antoine"
                                />
                              }
                              label="Jueves"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked="false"

                                  value="antoine"
                                />
                              }
                              label="Viernes"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked="false"

                                  value="antoine"
                                />
                              }
                              label="Sábado"
                            />
                          </FormGroup>
                        </FormControl>



                    <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel
                            ref={ref => {
                              this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-age-native-simple"
                          >
                            Arrival Time
                          </InputLabel>
                          <Select
                            native
                            value={this.state.arrivaleTime}
                            onChange={this.handleChange('arrivalTime')}

                            input={
                              <OutlinedInput
                                name="Arrival Time"
                                labelWidth={this.state.labelWidth}
                                id="outlined-age-native-simple"
                              />
                            }
                          >
                            <option value="" />
                            <option value={10}>7:00 AM</option>
                            <option value={20}>9:00 AM</option>
                            <option value={30}>4:00 PM</option>
                          </Select>
                        </FormControl>

                    </div>
                    <div>
                        <TextField
                            id="outlined-name"
                            label="Dirección"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                          />
                    </div>

                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                    Guardar Viaje
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

CreateAndEditView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateAndEditView);
