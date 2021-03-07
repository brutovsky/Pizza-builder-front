import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {HouseOutlined, LocalPizza, ShoppingBasket} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import {Link} from "react-router-dom"

import {ReactComponent as LoginIcon} from '../resources/images/login.svg'
import {Box} from "@material-ui/core";

import theme from './Theme'
import Tooltip from "@material-ui/core/Tooltip";

const TITLE = 'Home'

const SECTIONS = [
    {title: 'BUILD', href: '/build'},
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
    basket:{
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
    howManyBox: {
        width:30,
        height:30,
        alignContent: "center",
        backgroundColor: theme.palette.primary.dark
    },
    howManyText: {
        paddingLeft: 8,
        textAlign: 'center',
    }
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
                    Pizza Builder
                </Typography>


                <Tooltip title="10 items in the basket">
                    <Button color={"inherit"} className={classes.basket} variant="raised"
                            renderAs="Button" >
                        <ShoppingBasket className={classes.icon}/>
                        <Typography className={classes.howManyText} variant={"h5"}>
                            999.5$
                        </Typography>
                    </Button>
                </Tooltip>


                {SECTIONS.map(({title, href}) => {
                    return <Button color={"inherit"} href={href} className={classes.menuButton}
                                   renderAs="Button"><span>{title}</span></Button>
                })}
            </Toolbar>
        </AppBar>
    );
}
