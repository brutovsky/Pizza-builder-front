import {makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Footer from "./Footer";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";

import MuiPhoneInput from 'material-ui-phone-number';

import {useDispatch, useSelector} from "react-redux";

import {
    updateUser,
    selectStatus,
    selectUser,
    selectError
} from '../features/auth/Auth'
import {unwrapResult} from "@reduxjs/toolkit";
import {snack} from "./utils/CustomSnackBar";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    root: {
        paddingTop: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        minHeight: '78vh',
        flexDirection: 'column',
        align: "center"
    },
    container: {
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        align: "center"
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    avatarBox: {
        width: 125,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: "80%",
    },
    emailTextField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 233,
    },
    saveButton: {}
}));

export default function UserPage() {
    // SnackBar
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [snackSeverity, setSnackSeverity] = React.useState('success');
    const [snackText, setSnackText] = React.useState('Mellon');
    const showSnack = (severity, text) =>{
        setSnackSeverity(severity);
        setSnackText(text);
        setSnackOpen(true);
    }
    //

    const classes = useStyles();

    const dispatch = useDispatch();

    const updateStatus = useSelector(selectStatus);

    const user = useSelector(selectUser);

    const [editUser, setEditUser] = useState(user);

    const updateEditUser = (field, val) => {
        setEditUser(prevEditUser => ({
            ...prevEditUser,
            [field]: val
        }))
    }

    const updateEditUserAddress = (field, val) => {
        setEditUser(prevEditUser => ({
            ...prevEditUser,
            address: {...prevEditUser.address, [field]: val}
        }))
    }

    const dispatchUpdateUser = () => {
        dispatch(
            updateUser(editUser)
        ).then(unwrapResult)
            .then(originalPromiseResult => {
                console.log(originalPromiseResult);
                showSnack("success","User info successfully updated !");
            })
            .catch(rejectedValueOrSerializedError => {
                console.log(rejectedValueOrSerializedError);
                showSnack("error","Something went wrong :/");
            })
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <main className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Container>
                            <Grid container spacing={3} className={classes.container}>
                                {snack(snackOpen,setSnackOpen,snackSeverity,snackText)}
                                <Grid item xs={12}>
                                    <Container className={classes.avatarBox}>
                                        <Avatar
                                            className={classes.orange}>{editUser.name.charAt(0).toUpperCase()}</Avatar>
                                    </Container>
                                </Grid>
                                <Grid item xs={12}>
                                    <MuiPhoneInput defaultCountry={'ua'}
                                                   value={editUser.phone}
                                                   onChange={(e) => {
                                                       updateEditUser('phone', e)
                                                   }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Your name"
                                        defaultValue={editUser.name}
                                        className={classes.emailTextField}
                                        helperText="Enter your name"
                                        onChange={(e) => {
                                            updateEditUser('name', e.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        defaultValue={editUser.email}
                                        className={classes.emailTextField}
                                        helperText="Enter your email"
                                        onChange={(e) => {
                                            updateEditUser('email', e.target.value)
                                        }}
                                    />
                                </Grid>

                                <Divider/>
                                <Grid item xs={12}>
                                    <Typography variant={"h3"}>
                                        Your Address
                                    </Typography>
                                </Grid>


                                <div>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="City"
                                            defaultValue={editUser.address.city}
                                            className={classes.textField}
                                            helperText="Enter your city"
                                            onChange={(e) => {
                                                updateEditUserAddress('city', e.target.value)
                                            }}
                                        />
                                    </Grid>

                                    <TextField
                                        label="Street"
                                        defaultValue={editUser.address.street}
                                        className={classes.textField}
                                        helperText="Enter your street"
                                        onChange={(e) => {
                                            updateEditUserAddress('street', e.target.value)
                                        }}
                                    />
                                    <TextField
                                        label="Building"
                                        defaultValue={editUser.address.build}
                                        className={classes.textField}
                                        helperText="Enter your building"
                                        onChange={(e) => {
                                            updateEditUserAddress('build', e.target.value)
                                        }}
                                    />
                                    <TextField
                                        label="Flat"
                                        defaultValue={editUser.address.flat}
                                        className={classes.textField}
                                        helperText="Enter your flat"
                                        onChange={(e) => {
                                            updateEditUserAddress('flat', e.target.value)
                                        }}
                                    />
                                </div>


                                <Grid item xs={12}>
                                    <Button variant={"outlined"}
                                            color={"primary"}
                                            className={classes.saveButton}
                                            disabled={updateStatus === "loading"}
                                            onClick={e => {
                                                dispatchUpdateUser()
                                            }}
                                    >
                                        Save changes
                                    </Button>
                                </Grid>

                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
                <br/>

                <br/>
            </main>
            <Footer/>
        </React.Fragment>
    );
}
