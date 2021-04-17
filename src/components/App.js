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
import PizzaBuilder from "./PizzaBuilder";
import UserPage from "./UserPage";
import Checkout from "./checkout/Checkout";
import {PrivateRoute} from "./utils/PrivateRoute";
import {Role} from "../features/auth/Role";
import {useSelector} from "react-redux";
import {selectUser} from "../features/auth/Auth";
import AdminIngredienst from "./adminInterface/AdminIngredients";

function App() {

    const currentUser = useSelector(selectUser);

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route exact path='/signin' component={SignIn} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/build' component={PizzaBuilder} />

                    <Route exact path='/admin/ingredients' component={AdminIngredienst} />

                    <PrivateRoute exact path='/userpage' component={UserPage} currentUser={currentUser} roles={[Role.User,Role.Admin]} />
                    <Route exact path='/checkout' component={Checkout} />
                    <Redirect from='/' to='/home'/>
                </Switch>
            </ThemeProvider>
        </div>
    );
}

export default withRouter(App);
