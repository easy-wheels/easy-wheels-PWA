import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./Components/Login";
import NavigationDrawer from "./Components/NavigationDrawer";
import NewUser from "./Components/NewUser/NewUser";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/mainView" component={NavigationDrawer}/>
                        <Route exact path="/" component={Login}/>
                        <Route path={"/NewUser"} component={NewUser}/>
                        <Route render={() => <h3>Page not found!</h3>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
