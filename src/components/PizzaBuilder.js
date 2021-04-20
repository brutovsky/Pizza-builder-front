import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Footer from "./Footer";
import IngredientGroupTabs from "./builderComponents/IngredientTabs";

import pizza_bg from '../resources/images/pizza-bg.png'
import IngredientInPizzaCard from "./builderComponents/IngredientInPizzaCard";

import {useSelector, useDispatch} from 'react-redux'
import TextField from "@material-ui/core/TextField";
import {
    fetchAllGroups,
    fetchAllIngredients,
    selectGroups,
    selectIngredients,
    selectStatus
} from "../features/ingredients/Ingredients";

import {
    createPattern
} from "../features/pizzaPatterns/PizzaPatterns";
import {selectUser} from "../features/auth/Auth";

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
        minHeight: '79vh',
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

function PizzaBuilder() {
    const classes = useStyles();

    const [ingredients, setIngredients] = useState([]);
    const [pizzaName, setPizzaName] = useState('');

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

    const ingredientTile = (ingredientInPizza) => {
        return <Grid key={ingredientInPizza.name} item xs={3}>
            <IngredientInPizzaCard ingredientInPizza={ingredientInPizza} plusCallback={handlePlusIngr} minusCallback={handleMinusIngr}/>
        </Grid>
    }


    const fetchGroups = () =>{
        console.log("fetch")
        dispatch(fetchAllGroups());
        dispatch(fetchAllIngredients());
    }
    useEffect(()=>fetchGroups(), []);

    const dispatch = useDispatch();

    const status = useSelector(selectStatus);

    const groups = useSelector(selectGroups);
    const allIngredients = useSelector(selectIngredients);
    const user = useSelector(selectUser);

    const pizzaTotalSum = () => {
        console.log(ingredients)
        const res = ingredients !== [] ? ingredients.reduce((a,b)=>{return (a + b.price*b.howMany)}, 0) : 0;
        return Number(res).toFixed(2);
    }

    const createNewPattern = () => {
        console.log(ingredients)
        console.log(pizzaName)
        console.log(user)
        dispatch(createPattern(
            {
                uuid: '',
                name: pizzaName,
                userEntityUUID:user.uuid,
                ingredients:ingredients.map((ingr)=>{return {ingredientUuid:ingr.uuid, quantity:ingr.howMany}}),
                photoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.readersdigest.ca%2Fwp-content%2Fuploads%2Fsites%2F14%2F2010%2F12%2Fpepperoni-pizza.jpg'
            }
        ))
    }

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
                                        <b>{pizzaTotalSum()}$</b>
                                    </Typography>
                                </Grid>
                                <Grid item sm={8} xs={8} md={5} lg={5}>
                                    <form noValidate autoComplete="off">
                                        <TextField
                                            className={classes.textField}
                                            label="Pizza name"
                                            variant="filled"
                                            value={pizzaName}
                                            onChange={(event => setPizzaName(event.target.value))}
                                        />
                                    </form>
                                </Grid>
                                <Grid item sm={12} xs={12} md={5} lg={5}>
                                    <Button variant={"outlined"} color={"primary"} fullWidth={true}
                                            className={classes.pizzaButton} onClick={e => createNewPattern()}>
                                        Save pattern
                                    </Button>
                                </Grid>
                            </Grid>
                            <Container className={classes.pizzaBuilder}>
                                <Grid container spacing={3}>
                                    {ingredients.map((ingr) => ingredientTile(ingr))}
                                </Grid>
                            </Container>
                        </Container>
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <Container>
                            <IngredientGroupTabs plusCallback={handlePlusIngr} minusCallback={handleMinusIngr}
                                                 ingredients={allIngredients} groups={groups}/>
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
