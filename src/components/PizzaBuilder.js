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

import pizza_bg from '../resources/images/pizza-bg.png'
import IngredientInPizzaCard from "./builderComponents/IngredientInPizzaCard";

import IngredientInPizza from "../models/IngredientInPizza";
import Ingredient from "../models/Ingredient";

import {useSelector, useDispatch} from 'react-redux'
import {
    decrement,
    increment,
    incrementByAmount,
    selectCount
} from '../features/basket/basketSlice'
import TextField from "@material-ui/core/TextField";

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
        minHeight: '53vh',
        maxHeight: '83vh'
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
    footer: {
        backgroundColor: theme.palette.background.paper,
        //padding: theme.spacing(6),
    },
    root: {
        paddingTop: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
    },
    pizzaInfo: {
        paddingBottom: theme.spacing(2),
    },
    pizzaButton: {
        height: '100%',
    },
    textField: {
        width: "100%"
    },
    priceText: {
        paddingLeft: theme.spacing(5),
        paddingTop: theme.spacing(2),
    }
}));

const ingredientsList = [
    new Ingredient('Cheddar', 'cheese', '', 'https://www.wisconsinrivermeats.com/prodimages/cheddar-cheese.jpg'),
    new Ingredient('Feta', 'cheese', '', 'http://cdn.shopify.com/s/files/1/2836/2982/products/Feta_hero_grande.jpg?v=1529434179'),
    new Ingredient('Mushroom', 'vegetables', '', 'https://static.fanpage.it/wp-content/uploads/sites/22/2018/03/chicken-mushroom-4-638x425.jpg'),
    new Ingredient('Beckon', 'meat', '', 'https://www.thespruceeats.com/thmb/D1UAHYlf62gGzqSR4DcKud7HVlw=/1500x844/smart/filters:no_upscale()/how-to-make-your-own-bacon-4146515-17-5b4643f1c9e77c0037514094.jpg'),
    new Ingredient('Chicken', 'meat', '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-IdhPsX5dHqJNkDuGs4aJh3IKZw1ZVspECQ&usqp=CAU'),
    new Ingredient('Tomato', 'vegetables', '', 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg'),
    new Ingredient('Ananas', 'vegetables', '', 'https://basketbaba.com/wp-content/uploads/2017/11/Pineapple.jpg'),
    new Ingredient('Tomato1', 'vegetables', '', 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg'),
    new Ingredient('Ananas2', 'vegetables', '', 'https://basketbaba.com/wp-content/uploads/2017/11/Pineapple.jpg'),
    new Ingredient('Tomato3', 'vegetables', '', 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg'),
    new Ingredient('Ananas4', 'vegetables', '', 'https://basketbaba.com/wp-content/uploads/2017/11/Pineapple.jpg'),
    new Ingredient('Tomato5', 'vegetables', '', 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg'),
    new Ingredient('Ananas6', 'vegetables', '', 'https://basketbaba.com/wp-content/uploads/2017/11/Pineapple.jpg'),
    new Ingredient('Tomato7', 'vegetables', '', 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg'),
    new Ingredient('Ananas8', 'vegetables', '', 'https://basketbaba.com/wp-content/uploads/2017/11/Pineapple.jpg'),
    new Ingredient('Tomato9', 'vegetables', '', 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg'),
    new Ingredient('Ananas10', 'vegetables', '', 'https://basketbaba.com/wp-content/uploads/2017/11/Pineapple.jpg'),
];

const testIngr1 = new IngredientInPizza('Cheddar', 5, 'https://www.wisconsinrivermeats.com/prodimages/cheddar-cheese.jpg');
const testIngr2 = new IngredientInPizza('Mushroom', 1, 'https://static.fanpage.it/wp-content/uploads/sites/22/2018/03/chicken-mushroom-4-638x425.jpg');
const testIngr3 = new IngredientInPizza('Beckon', 1, 'https://www.thespruceeats.com/thmb/D1UAHYlf62gGzqSR4DcKud7HVlw=/1500x844/smart/filters:no_upscale()/how-to-make-your-own-bacon-4146515-17-5b4643f1c9e77c0037514094.jpg');
const testIngr4 = new IngredientInPizza('Tomato', 1, 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg');

function PizzaBuilder() {

    const [ingredients, setIngredients] = useState([testIngr1, testIngr2, testIngr3, testIngr4]);

    const count = useSelector(selectCount)
    const dispatch = useDispatch()

    const addIngredient = (ingr) => {
        setIngredients(oldIngredients => [...oldIngredients, ingr]);
    };

    const removeIngredient = (ingr) => {
        setIngredients(oldIngredients => [oldIngredients.push(ingr), []]);
    };

    const handlePlusIngr = (ingr) => {
        let newIngredients = [...ingredients];
        let toChange = newIngredients.find(it => it.name === ingr.name);
        if (toChange === undefined) {
            if (newIngredients.length >= 12) {
                alert('Maximum amount of ingredints: 12')
            } else
                newIngredients.push(ingr);
        } else toChange.plus();
        setIngredients(newIngredients);
    };

    const handleMinusIngr = (ingr) => {
        let newIngredients = [...ingredients]
        let toChange = newIngredients.find(it => it.name === ingr.name)
        if (toChange !== undefined) {
            toChange.minus()
            if (toChange.isAny()) {
                setIngredients(newIngredients);
            } else
                setIngredients(newIngredients.filter(it => it.name !== ingr.name));
        }
    };

    const ingredientTile = (ingr) => {
        return <Grid key={ingr.name} item xs={3}>
            <IngredientInPizzaCard ingr={ingr} plusCallback={handlePlusIngr} minusCallback={handleMinusIngr}/>
        </Grid>
    }

    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <main className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <Container>
                            <Grid container spacing={3} className={classes.pizzaInfo}>
                                <Grid item sm={4} xs={4} md={2} lg={2}>
                                    <Typography variant={"h6"} className={classes.priceText}>
                                        <b>88.90$</b>
                                    </Typography>
                                </Grid>
                                <Grid item sm={8} xs={8} md={5} lg={5}>
                                    <form noValidate autoComplete="off">
                                        <TextField className={classes.textField} label="Pizza name" variant="filled"/>
                                    </form>
                                </Grid>
                                <Grid item sm={12} xs={12} md={5} lg={5}>
                                    <Button variant={"outlined"} color={"primary"} fullWidth={true}
                                            className={classes.pizzaButton}>
                                        Save pattern
                                    </Button>
                                </Grid>
                            </Grid>
                            <Container className={classes.pizzaBuilder}>
                                <Grid container spacing={3}>
                                    {ingredients.map((test) => ingredientTile(test))}
                                </Grid>
                            </Container>
                        </Container>
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <Container>
                            <IngredientGroupTabs plusCallback={handlePlusIngr} minusCallback={handleMinusIngr}
                                                 ingredients={ingredientsList}/>
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

export default PizzaBuilder
