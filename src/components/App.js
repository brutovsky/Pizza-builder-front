import React from 'react';

import {Redirect, Route, Switch, withRouter} from "react-router-dom"

import '../styles/App.sass';

import SignIn from "./SignIn";
import Home from "./Home";
import SignUp from "./SignUp";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from "./Theme";
import PizzaBuilder from "./PizzaBuilder";
import UserPage from "./UserPage";
import Checkout from "./checkout/Checkout";
import {PrivateRoute} from "./utils/PrivateRoute";
import {Role} from "../features/auth/Role";
import {useSelector} from "react-redux";
import {selectUser} from "../features/auth/Auth";
import AdminIngredienst from "./adminInterface/AdminIngredients";
import AdminIgnredientGroups from "./adminInterface/AdminIgnredientGroups";

function App() {

    const currentUser = useSelector(selectUser);

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route exact path='/signin' component={SignIn} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/home' component={Home} />

                    <PrivateRoute exact path='/admin/groups' component={AdminIgnredientGroups} currentUser={currentUser} roles={[Role.Admin]} />
                    <PrivateRoute exact path='/admin/ingredients' component={AdminIngredienst} currentUser={currentUser} roles={[Role.Admin]} />
                    <PrivateRoute exact path='/build' component={PizzaBuilder} currentUser={currentUser} roles={[Role.User,Role.Admin]}/>
                    <PrivateRoute exact path='/checkout' component={Checkout} currentUser={currentUser} roles={[Role.User,Role.Admin]}/>
                    <PrivateRoute exact path='/userpage' component={UserPage} currentUser={currentUser} roles={[Role.User,Role.Admin]} />

                    <Redirect from='/' to='/home'/>
                </Switch>
            </ThemeProvider>
        </div>
    );
}

export default withRouter(App);
