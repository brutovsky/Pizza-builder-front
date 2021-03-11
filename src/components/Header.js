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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";

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
        minWidth:80,
        marginRight: theme.spacing(2),
    },
    basket:{
        minWidth:80,
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
    basketIcon: {
        paddingRight: 5
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
}));

export default function Header() {
    const classes = useStyles();

    let isPageWide1400 = useMediaQuery('(min-width: 1400px)')
    let isPageWide700 = useMediaQuery('(min-width: 700px)')
    let isPageWide400 = useMediaQuery('(min-width: 400px)')

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start"  color="inherit" aria-label="menu" href="/home">
                    <LocalPizza className={classes.icon}/>
                </IconButton>

                <Typography variant="h6" className={classes.title}>
                    {isPageWide700 ? 'Pizza Builder' : ''}
                </Typography>


                <Tooltip title="4 items in the basket">
                    <Button color={"inherit"} href={'/checkout'} className={classes.basket} variant="raised"
                            renderAs="Button" >
                        {isPageWide700 ? <ShoppingBasket className={classes.basketIcon}/> : ''}
                        <Typography className={classes.howManyText} variant={"h5"}>
                            $34.06
                        </Typography>
                    </Button>
                </Tooltip>


                {isPageWide400 ? SECTIONS.map(({title, href}) => {
                    return <Button color={"inherit"} href={href} className={classes.menuButton}
                                   renderAs="Button"><span>{title}</span></Button>
                }) : ''}

                <Button href={'/userpage'}><span> <Avatar className={classes.orange} >P</Avatar></span></Button>


            </Toolbar>
        </AppBar>
    );
}
