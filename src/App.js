import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./Components/Login";
import NavigationDrawer from "./Components/NavigationDrawer";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/mainView" component={NavigationDrawer}/>
                        <Route exact path="/" component={Login}/>
                        <Route render={() => <h3>Page not found!</h3>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
