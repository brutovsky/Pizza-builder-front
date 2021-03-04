import React from 'react';

import {
    Route,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom"

import '../styles/App.sass';

import SignIn from "./SignIn";
import Home from "./Home";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path='/signin' component={SignIn} />
                <Route exact path='/home' component={Home} />
                <Redirect from='/' to='/home'/>
            </Switch>
        </div>
    );
}

export default withRouter(App);
