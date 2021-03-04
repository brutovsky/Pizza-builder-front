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
import SignUp from "./SignUp";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./Theme";

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route exact path='/signin' component={SignIn} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/home' component={Home} />
                    <Redirect from='/' to='/home'/>
                </Switch>
            </ThemeProvider>
        </div>
    );
}

export default withRouter(App);
