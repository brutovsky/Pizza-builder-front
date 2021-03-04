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

function App(props) {
    const { history } = props
    return (
        <div className="App">
            <Switch>
                <Route history={history} path='/signin' component={SignIn} />
                <Route history={history} path='/home' component={Home} />
                <Redirect from='/' to='/home'/>
            </Switch>
        </div>
    );
}

export default withRouter(App);
