import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Copyright from "./Copyright";
import logo from "../resources/images/logo.png";
import {useDispatch, useSelector} from "react-redux";

import {
    selectStatus,
    signUpUser,
} from '../features/auth/Auth'
import {unwrapResult} from "@reduxjs/toolkit";
import {useHistory} from "react-router-dom";
import {validateEmail, validatePassword} from "./utils/Validation";
import {snack} from "./utils/CustomSnackBar";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
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
    const [validName, setValidName] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const validate = () =>{
        const isValidName = name != "";
        setValidName(isValidName);

        const isValidEmail = validateEmail(email) === true;
        setValidEmail(isValidEmail);

        const isValidPassword = validatePassword(password) === true;
        setValidPassword(isValidPassword);

        return isValidName && isValidEmail && isValidPassword;
    }
    //

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const authStatus = useSelector(selectStatus);

    const history = useHistory();

    const performSignUp = () => {
        if(validate()){
            dispatch(
                signUpUser(
                    {
                        name: name,
                        email: email,
                        phone: '',
                        address: {
                            city: '',
                            street: '',
                            build: 0,
                            flat: 0
                        },
                        password: password
                    })
            ).then(unwrapResult)
                .then(originalPromiseResult => {
                    console.log(originalPromiseResult)
                    showSnack("success","Account successfully created !");
                    history.push("/home");
                })
                .catch(rejectedValueOrSerializedError => {
                    console.log(rejectedValueOrSerializedError)
                    showSnack("error","User with such email or username already exists :/");
                })
        }
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <img src={logo}/>
                {snack(snackOpen,setSnackOpen,snackSeverity,snackText)}
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                onChange={e => setName(e.target.value)}
                                helperText={
                                    name == '' ? 'Name is required':''
                                }
                                error={!validName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={e => setEmail(e.target.value)}
                                helperText={
                                    validateEmail(email)
                                }
                                error={!validEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={e => setPassword(e.target.value)}
                                helperText={
                                    validatePassword(password)
                                }
                                error={!validPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="I want to receive new pizza patter, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={authStatus === "loading"}
                        onClick={e => {
                            performSignUp()
                        }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}
