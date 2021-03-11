import {makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CardActions from "@material-ui/core/CardActions";
import Footer from "./Footer";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import IngredientGroupTabs from "./builderComponents/IngredientTabs";

import Theme from './Theme'
import {useDispatch} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";

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
    avatarBox:{
        width: 125,
    }
}));

export default function UserPage() {
    const classes = useStyles();

    const dispatch = useDispatch()

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <main className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Container>
                            <Grid container spacing={3} className={classes.container}>
                                <Grid item xs={12}>
                                    <Typography variant={"h6"}>
                                        <b>@pasha</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Container className={classes.avatarBox}>
                                        <Avatar className={classes.orange}>P</Avatar>
                                    </Container>
                                </Grid>
                                <Grid item xs={12}>
                                    <form noValidate autoComplete="off">
                                        <TextField className={classes.textField} label="Pizza name" variant="filled"/>
                                    </form>
                                </Grid>
                                <Grid item xs={12} >
                                    <Button variant={"outlined"} color={"primary"} fullWidth={true}
                                            className={classes.pizzaButton}>
                                        Save pattern
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
