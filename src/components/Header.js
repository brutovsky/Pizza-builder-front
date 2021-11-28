import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ExitToApp, LocalPizza} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import {Link, useHistory} from "react-router-dom"
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";

import {useDispatch, useSelector} from "react-redux";

import {selectUser, signOut} from '../features/auth/Auth'
import BasketDialog from "./basket/BasketDialog";
// import Link from "@material-ui/core/Link";

const SECTIONS_GUEST = [
    {title: 'Sign In', path: '/signin'},
    {title: 'Sign Up', path: '/signup'},
]

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        minWidth: 80,
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: '#FFF'
        }
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

    const makeButtonLink = (path, title) => {
        return <Link className={'custom-link'} to={path}>
            <Button color={"inherit"} className={classes.menuButton}><Typography>{title}</Typography></Button>
        </Link>
    }

    const makeGuestSection = () => {
        return isPageWide400 ? SECTIONS_GUEST.map(({title, path}) => {
            return makeButtonLink(path, title)
        }) : ''
    }

    const makeUserSection = () => {
        return (user == null) ? makeGuestSection() :
            <div>
                {makeButtonLink("/home", "🍕Patterns")}
                {makeButtonLink("/build", "🔨Build")}
                <Link className={'custom-link'} to={'/userpage'}>
                    <Button href={'/userpage'} key={'/userpage'}>
                    <span>
                        <Avatar className={classes.orange}>
                            {user.name.charAt(0)}
                        </Avatar>
                    </span>
                    </Button>
                </Link>
                <Button onClick={e => {
                    performSignOut()
                }}>
                    <ExitToApp className={classes.exitIcon}/>
                </Button>
            </div>
    }

    const makeAdminSection = () => {
        return (user != null && user.role === 'ADMIN') ? <div>
            {makeButtonLink("/admin/ingredients", "🥑Ingredients")}
            {makeButtonLink("/admin/groups", "🥩Groups")}
            {makeButtonLink("/admin/orders", "📜Orders")}
        </div> : ''
    }

    return (
        <AppBar position="static">
            <Toolbar>

                <Link className={'custom-link'} to={"/home"}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <LocalPizza className={classes.icon}/>
                    </IconButton>
                </Link>

                <Typography variant="h6" className={classes.title}>
                    {isPageWide700 ? 'Pizza Builder' : ''}
                </Typography>

                {makeAdminSection()}

                {(user !== null && user.role !== 'ADMIN') ? <BasketDialog/> : ''}

                {makeUserSection()}

            </Toolbar>
        </AppBar>
    );
}
