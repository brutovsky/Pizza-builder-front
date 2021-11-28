import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    ExitToApp,
    LocalPizza,
    PersonAdd,
    Settings,
    Build,
    Storefront,
    Receipt,
    Category,
    Eco
} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import {Link, useHistory} from "react-router-dom"
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";

import {useDispatch, useSelector} from "react-redux";

import {selectUser, signOut} from '../features/auth/Auth'
import BasketDialog from "./basket/BasketDialog";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Tooltip from "@material-ui/core/Tooltip";
import {isUserRole} from "../utils/Utils";
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
        marginRight: 10,
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
}));

export default function Header() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    const history = useHistory();

    let isPageWide1400 = useMediaQuery('(min-width: 1400px)');
    let isPageWide700 = useMediaQuery('(min-width: 700px)');
    let isPageWide400 = useMediaQuery('(min-width: 400px)');

    const goToPath = (path) => {
        history.push(path);
    }

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
        return SECTIONS_GUEST.map(({title, path}) => {
            return makeButtonLink(path, title)
        })
    }

    const makeUserSection = () => {
        return <div>
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
        return isUserRole(user, "ADMIN") ? <div>
            {makeButtonLink("/admin/ingredients", "🥑Ingredients")}
            {makeButtonLink("/admin/groups", "🥩Groups")}
            {makeButtonLink("/admin/orders", "📜Orders")}
        </div> : ''
    }

    const makeDropdownNavigation = () => {
        return <div>
            <Tooltip title="Account settings">
                <IconButton onClick={handleClick} size="small" sx={{ml: 2}}>
                    <Avatar className={classes.orange} sx={{width: 32, height: 32}}>
                        {user.name.charAt(0)}
                    </Avatar>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                <MenuItem onClick={e => {
                    goToPath("/userpage")
                }}>
                    <Avatar className={classes.orange}>
                        {user.name.charAt(0)}
                    </Avatar>
                    My account
                </MenuItem>
                <Divider/>
                {isUserRole(user, "ADMIN") ? <div>
                <MenuItem onClick={e => {
                    goToPath("/admin/ingredients")
                }}>
                    <ListItemIcon>
                        <Eco fontSize="small"/>
                    </ListItemIcon>
                    Ingredients
                </MenuItem>
                <MenuItem onClick={e => {
                    goToPath("/admin/groups")
                }}>
                    <ListItemIcon>
                        <Category fontSize="small"/>
                    </ListItemIcon>
                    Groups
                </MenuItem>
                <MenuItem onClick={e => {
                    goToPath("/admin/orders")
                }}>
                    <ListItemIcon>
                        <Receipt fontSize="small"/>
                    </ListItemIcon>
                    Orders
                </MenuItem>
                <Divider/>
            </div> : ''}
                <MenuItem onClick={e => {
                    goToPath("/home")
                }}>
                    <ListItemIcon>
                        <Storefront fontSize="small"/>
                    </ListItemIcon>
                    Patterns
                </MenuItem>
                <MenuItem onClick={e => {
                    goToPath("/build")
                }}>
                    <ListItemIcon>
                        <Build fontSize="small"/>
                    </ListItemIcon>
                    Build
                </MenuItem>
                <MenuItem onClick={e => {
                    performSignOut()
                }}>
                    <ListItemIcon>
                        <ExitToApp fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    }

    const makeNavigationSection = () => {
        return isPageWide400 ?
            <div>
                {makeAdminSection()}
                {(user === null) ? makeGuestSection() : makeUserSection()}
            </div>
            :
            <div>
                {(user === null) ? makeGuestSection() : makeDropdownNavigation()}
            </div>
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

                {isUserRole(user, "ADMIN") ? <BasketDialog/> : ''}

                {makeNavigationSection()}

            </Toolbar>
        </AppBar>
    );
}
