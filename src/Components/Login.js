import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from "react-router-dom";
import logo from "./Images/car-logo.svg";
import Firebase from "../Firebase";

const firebase = Firebase.getInstance();

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    bigAvatar: {
        margin: theme.spacing.unit,
        width: 100,
        height: 120,
    },
});



class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigate: false,
            referrer: null,
            email:"",
            password:"",
            remember : false
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <main className={classes.main}>
                    <CssBaseline/>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Easy Wheels
                        </Typography>
                        <img src={logo} alt="logoBigAvatar" className={classes.bigAvatar}/>
                        <form className={classes.form} onSubmit={this.handleLogin}>
                            <FormControl margin="normal" required fullWidth onChange={event =>
                                this.setState({email:event.target.value})}>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" name="email" autoComplete="email" autoFocus/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth onChange={event =>
                                this.setState({password:event.target.value})}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input name="password" type="password" id="password"
                                       autoComplete="current-password"/>
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox color="primary"/>}
                                label="Remember me"
                                onChange={event => {this.setState({remember:event.target.checked})}}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Login
                            </Button>
                            <Button
                                component={Link}
                                to={"/NewUser"}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Create Account
                            </Button>
                        </form>
                    </Paper>
                </main>
            </div>
        );

    }

    handleLogin(e) {
        e.preventDefault();
        firebase.doSignInWithEmailAndPassword(this.state.email, this.state.password).then(authUser =>{
            if(firebase.isEmailVerified()){
                this.props.updateLogged(true);
            }else{
                window.alert("El usuario no ha confirmado email")
            }
            /**if(this.state.remember===true){
                firebase.doKeepSignedIn();
            }else{
                firebase.doNotKeepSignedIn();
            }**/
        }).catch(error=>
            window.alert(error)
        );
    }

}

export default withStyles(styles)(SignIn);