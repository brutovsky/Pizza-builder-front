import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import logo from '../resources/images/logo.png'; // Tell webpack this JS file uses this image

import Copyright from './Copyright'
import {useDispatch, useSelector} from "react-redux";

import {unwrapResult} from '@reduxjs/toolkit'

import { useHistory } from "react-router-dom";

import {
    signInUser,
    selectStatus,
    selectUser,
    selectError
} from '../features/auth/Auth'
import {snack} from "./utils/CustomSnackBar";
import {validateEmail} from "./utils/Validation";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2017%2F11%2F17%2F371885-food-pizza.jpg&f=1&nofb=1)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();

    // SnackBar
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [snackSeverity, setSnackSeverity] = React.useState('success');
    const [snackText, setSnackText] = React.useState('Mellon');
    const showSnack = (severity, text) =>{
        setSnackSeverity(severity);
        setSnackText(text);
        setSnackOpen(true);
    }

    // Validation
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const validate = () =>{
        const isValidEmail = validateEmail(email) === true;
        setValidEmail(isValidEmail);

        const isValidPassword = password != "";
        setValidPassword(isValidPassword);

        return isValidEmail && isValidPassword;
    }
    //

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const authStatus = useSelector(selectStatus);

    const history = useHistory();

    const performSignIn = () => {
        if(validate()){
            dispatch(
                signInUser({
                    email: email,
                    password: password
                })
            ).then(unwrapResult)
                .then(originalPromiseResult => {
                    console.log(originalPromiseResult)
                    showSnack("success","You successfully signed up !");
                    history.push("/userpage");
                })
                .catch(rejectedValueOrSerializedError => {
                    showSnack("error","Wrong password or something :/");
                    console.log(rejectedValueOrSerializedError)
                })
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <img src={logo}/>
                    {snack(snackOpen,setSnackOpen,snackSeverity,snackText)}
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={e => setEmail(e.target.value)}
                            helperText={
                                validateEmail(email)
                            }
                            error={!validEmail}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e => setPassword(e.target.value)}
                            helperText={
                                password == '' ?  'Password is required' : ''
                            }
                            error={!validPassword}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={authStatus === "loading"}
                            onClick={e => {
                                performSignIn()
                            }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
