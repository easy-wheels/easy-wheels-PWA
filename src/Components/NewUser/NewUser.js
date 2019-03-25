import {Component} from "react";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import user from "../Images/user.svg";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";
import "./NewUser.css"
import Firebase from "../../Firebase.js"

const INITIAL_STATE = {
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    error:null
};

const firebase = Firebase.getInstance();


class NewUser extends Component {

    constructor(props) {
        super(props);
        this.state = {name: "", email: "", password: "", confirmPassword: "", doRedirect: false, error:null};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
       const { name, email, password,confirmPassword } = this.state;
        if(password!==confirmPassword) {
            window.alert("Las constraseñas no son las mismas");
        }else if(email.endsWith("escuelaing.edu.co")===false){
            window.alert("Para utilizar el servico debe poner el correo de la escuela")
        }else {
            firebase
                .doCreateUserWithEmailAndPassword(email, password)
                .then(authUser => {
                    firebase.doChangeName(name);
                    firebase.doEmailVerification();
                    firebase.addUser(email,name).then(a => {
                        window.alert("Asegurese de confirmar el email");
                        this.setState({name: "", email: "", password: "", confirmPassword: ""});
                        this.setState({doRedirect: true});
                        firebase.doSignOut();
                    });


                })
                .catch(error => {
                    window.alert(error);
                    this.setState({name: "", email: "", password: "", confirmPassword: ""});
                });
        }
    }

    render() {
        return (
            <>
                <Paper elevation={5} className="paper">
                    <Typography variant="h4">Registration</Typography>
                    <img src={user} alt="user" className="img"/>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <TextField required label="Full name" fullWidth
                                   onChange={event => this.setState({name: event.target.value})}/>
                        <TextField required label="Email" fullWidth
                                   onChange={event => this.setState({email: event.target.value})}/>

                        <TextField required label="Password" type="password" fullWidth
                                   onChange={event => this.setState({password: event.target.value})}/>
                        <TextField required label="Confirm password" type="password" fullWidth
                                   onChange={event => this.setState({confirmPassword: event.target.value})}/>
                        <br/><br/>
                        <Button type="submit" color="primary" variant="contained" fullWidth>
                            Create account
                        </Button>
                        <br/>
                        <br/>
                        <Button color="primary" variant="contained" fullWidth component={Link} to={"/"}>
                            Back
                        </Button>
                        {this.state.doRedirect && <Redirect to={"/"}/>}
                    </form>
                </Paper>
            </>
        );
    }
}

export default NewUser;
