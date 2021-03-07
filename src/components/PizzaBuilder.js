import {makeStyles} from "@material-ui/core/styles";
import React from "react";
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
import SimpleTabs from "./builderComponents/IngredientTabs";

import Theme from './Theme'

import pizza_bg from '../resources/images/pizza-bg.png'
import IngredientInPizzaCard from "./builderComponents/IngredientInPizzaCard";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 0, 1),
    },
    pizzaBuilder: {
        backgroundImage: 'url(' + pizza_bg + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        width: '100%',
        height: '83vh'
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
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ingr = {
    'name': 'Cheddare',
    'title': 'Chesee cheese',
    'howMany': 0
};

function PizzaBuilder() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <main className={classes.root}>
                <br/>
                <Grid container spacing={0}>
                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <Container>
                            <div className={classes.heroContent}>
                                <Container maxWidth="sm">
                                    <Typography component="h1" variant="h2" align="center" color="textPrimary"
                                                gutterBottom>
                                        Pizza Builder
                                    </Typography>
                                </Container>
                            </div>
                            <Container className={classes.pizzaBuilder}>
                                <Grid container spacing={3}>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IngredientInPizzaCard ingr={ingr}/>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Container>
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <Container>
                            <SimpleTabs/>
                        </Container>
                    </Grid>
                </Grid>
            </main>
            <Footer/>
        </React.Fragment>
    );
}

export default PizzaBuilder
