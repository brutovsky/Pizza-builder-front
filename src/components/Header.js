import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {HouseOutlined, LocalPizza, ShoppingBasket, ExitToApp} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import {Link, useHistory} from "react-router-dom"

import Tooltip from "@material-ui/core/Tooltip";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";

import {useDispatch, useSelector} from "react-redux";

import {
    signOut,
    selectUser,
    signInUser
} from '../features/auth/Auth'
import BasketDialog from "./basket/BasketDialog";

const TITLE = 'Home'

const SECTIONS_GUEST = [
    {title: 'Sign In', href: '/signin'},
    {title: 'Sign Up', href: '/signup'},
]

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        minWidth: 80,
        marginRight: theme.spacing(2),
    },
    basket: {
        minWidth: 80,
        marginRight: theme.spacing(2),
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: '#FFF'
        }
    },
    title: {
        flexGrow: 1,
    },
    howManyText: {
        textAlign: 'center',
    },
    exitIcon: {
        paddingRight: 5,
        color: '#FFF'
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
}));

export default function Header() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    const history = useHistory();

    let isPageWide1400 = useMediaQuery('(min-width: 1400px)');
    let isPageWide700 = useMediaQuery('(min-width: 700px)');
    let isPageWide400 = useMediaQuery('(min-width: 400px)');

    const performSignOut = () => {
        dispatch(signOut());
        history.push("/home");
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" href="/home">
                    <LocalPizza className={classes.icon}/>
                </IconButton>

                <Typography variant="h6" className={classes.title}>
                    {isPageWide700 ? 'Pizza Builder' : ''}
                </Typography>

                {(user != null && user.role === 'ADMIN')?<div>
                    <Button color={"inherit"} href={'/admin/ingredients'} className={classes.menuButton} key={'/admin/ingredients'}><span>Ingredients</span></Button>
                    <Button color={"inherit"} href={'/admin/groups'} className={classes.menuButton} key={'/admin/groups'}><span>Groups</span></Button>
                </div> : ''}
                <BasketDialog/>
                <Button color={"inherit"} href={'/build'} className={classes.menuButton}><span>BUILD</span></Button>
                {(user == null)?(isPageWide400 ? SECTIONS_GUEST.map(({title, href}) => {
                    return <Button color={"inherit"} href={href} className={classes.menuButton} key={href}><span>{title}</span></Button>
                }) : ''):''}

                {(user !== null)? <div>
                    <Button href={'/userpage'} key={'/userpage'}><span> <Avatar className={classes.orange} >{user.name.charAt(0)}</Avatar></span></Button>
                    <Button onClick={e => {performSignOut()}}><ExitToApp className={classes.exitIcon}/> </Button>
                </div>:''}

            </Toolbar>
        </AppBar>
    );
}
