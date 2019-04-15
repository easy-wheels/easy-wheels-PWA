import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./Components/Login";
import NavigationDrawer from "./Components/NavigationDrawer";
import NewUser from "./Components/NewUser/NewUser";
import FireBase from "./Firebase"
import CircularProgress from "@material-ui/core/CircularProgress";
import prueba from "./prueba";

const firebase = FireBase.getInstance();

const prueba1 = new prueba();

class App extends Component {
    constructor(props){
        super(props);
        this.state = {logged:false, loaded:false};
        this.updateLogged = this.updateLogged.bind(this);
        firebase.doUpdateStateLogin(this.updateLogged);
    }


    updateLogged = (log) => {this.setState({logged:log, loaded:true})};

    render() {
        return (
            <Router>
                <div className="App">
                    {this.state.loaded===true?
                        <>
                            {this.state.logged===true?
                                <Switch>
                                    <Route path="/" component={NavigationDrawer}/>
                                </Switch>
                                :
                                <Switch>
                                    <Route exact path="/" component={() => <Login updateLogged={this.updateLogged}/>}/>
                                    <Route path={"/NewUser"} component={NewUser}/>
                                </Switch>
                            }
                        </>
                        :
                        <div className="center-loading">
                            <CircularProgress size={100} thickness={3.8}/>
                        </div>}
                </div>
            </Router>
        );
    }
}

export default App;
