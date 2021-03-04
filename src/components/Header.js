import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {HouseOutlined, LocalPizza} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import {Link} from "react-router-dom"

import {ReactComponent as LoginIcon} from '../resources/images/login.svg'

const TITLE = 'Home'

const SECTIONS = [
    {title: 'Sign In', href: '/signin'},
    {title: 'Sign Up', href: '/signup'},
]

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header() {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" href="/home">
                    <LocalPizza className={classes.icon}/>
                </IconButton>

                <Typography variant="h6" className={classes.title}>
                    Pizza Builder Home
                </Typography>
                {SECTIONS.map(({title, href}) => {
                    return <Button color={"inherit"} href={href} className={classes.menuButton}
                                   renderAs="Button"><span>{title}</span></Button>
                })}
            </Toolbar>
        </AppBar>
    );
}
