import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./Components/Login";
import NavigationDrawer from "./Components/NavigationDrawer";
import NewUser from "./Components/NewUser/NewUser";
import FireBase from "./Firebase"

const firebase = FireBase.getInstance();

class App extends Component {
    constructor(props){
        super(props);
        this.state = {logged:false};
        this.updateLogged = this.updateLogged;
    }

    componentDidMount() {
        if((localStorage.email!==undefined && localStorage.password!==undefined)||
            (localStorage.email!=="undefined" && localStorage.password!=="undefined")){
            console.log("entro");
            firebase.doSignInWithEmailAndPassword(localStorage.email, localStorage.password).then(authUser =>{
                this.setState({logged:true});
            });
        }
    }

    updateLogged = (log) => {this.setState({logged:log})}

    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={()=> <Login updateLogged={this.updateLogged}/>}/>
                        {this.state.logged===true?<Route path="/mainView" component={NavigationDrawer}/>:null}
                        <Route path={"/NewUser"} component={NewUser}/>
                        <Route render={() => <Login updateLogged={this.updateLogged}/>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
