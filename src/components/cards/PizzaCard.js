import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {confirmPizzaPattern, deletePattern} from "../../features/pizzaPatterns/PizzaPatterns";
import {addPatternToCart, fetchCart,} from "../../features/basket/basketSlice";
import {useDispatch} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {isUserGuest} from "../../utils/Utils";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
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
    cardActions: {
        alignContent: "center",
        justifyContent: "center"
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function PizzaCard(props) {
    const classes = useStyles();

    const dispatch = useDispatch();

    // SnackBar
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [snackSeverity, setSnackSeverity] = React.useState('success');
    const [snackText, setSnackText] = React.useState('Mellon');
    const showSnack = (severity, text) => {
        setSnackSeverity(severity);
        setSnackText(text);
        setSnackOpen(true);
    }

    const [pizzaSize, setPizzaSize] = useState('1');

    const [pizza, setPizza] = useState(props.pattern);
    const [ingredients, setIngredients] = useState(props.pattern.ingredients.map(i => {
            return {...i.ingredient, quantity: i.quantity}
        }
    ));
    const [confirmed, setConfirmed] = useState(props.pattern.confirmed);

    const history = useHistory();

    const pizzaLabels = () => {
        let labels = '';
        const spicy = ingredients.find(i => i.spicy);
        const vegetarian = ingredients.every(i => i.vegetarian);
        const vegan = ingredients.every(i => i.vegan);
        if (spicy) {
            labels += '🌶️'
        }
        if (vegetarian && !vegan) {
            labels += '🥛'
        }
        if ((vegan && !vegetarian) || (vegan && vegetarian)) {
            labels += '🥦'
        }
        return labels;
    }

    const groupBy = function (ingredients, key) {
        return ingredients.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {})
    };

    const groupIngredients = groupBy(ingredients, 'groupName');

    const pizzaPrice = pizza.ingredients.reduce((a, b) => {
        return (a + b.ingredient.price * b.quantity)
    }, 0) * pizzaSize;

    const confirmPattern = () => {
        dispatch(confirmPizzaPattern({
            uuid: pizza.uuid
        })).then(unwrapResult)
            .then(originalPromiseResult => {
                setConfirmed(true);
                console.log(originalPromiseResult);
            })
            .catch(rejectedValueOrSerializedError => {
                console.log(rejectedValueOrSerializedError);
            })
    }

    const deletePizzaPattern = () => {
        dispatch(deletePattern({
            uuid: pizza.uuid
        })).then(unwrapResult)
            .then(originalPromiseResult => {
                props.deletePatternCallback(pizza, true)
                console.log(originalPromiseResult);
            })
            .catch(rejectedValueOrSerializedError => {
                props.deletePatternCallback(pizza, false)
                console.log(rejectedValueOrSerializedError);
            })
    }

    const goToSignIn = () => {
        history.push("/signin");
    }

    const addPizzaToBasket = () => {

        if (isUserGuest(props.user)) {
            goToSignIn();
            return;
        }

        dispatch(addPatternToCart({
            pattern: pizza.uuid,
            amount: 1,
            size: parseInt(pizzaSize),
        })).then(unwrapResult)
            .then(originalPromiseResult => {
                dispatch(fetchCart())
                console.log(originalPromiseResult);
            })
            .catch(rejectedValueOrSerializedError => {
                console.log(rejectedValueOrSerializedError);
            })
    }

    return <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image={pizza.photoUrl}
                title={pizza.name}
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {pizza.name} {pizzaLabels()}
                </Typography>
                {(props.user != null && props.user.role === 'ADMIN') &&
                <FormControlLabel
                    control={<Checkbox checked={confirmed} onChange={e => confirmPattern()}/>}
                    label="Confirmed"
                />
                }
                <Divider/>
                <Typography variant={"body1"}>
                    Ingredients:
                </Typography>
                <Divider/>
                {Object.keys(groupIngredients).map((key) =>
                    <Typography key={key}
                                variant={"body2"}><span><b>{groupIngredients[key][0].groupLabel} {groupIngredients[key].map(i => i.quantity + 'x' + i.name).join(', ')}</b></span></Typography>
                )}
                <Divider/>
            </CardContent>
            <ButtonGroup variant="outlined" color="primary"
                         aria-label="contained primary button group" className={classes.cardActions}>
                <Button variant={pizzaSize === '1' ? 'contained' : 'outlined'} onClick={e => setPizzaSize('1')}
                        key={"b1"}>Small</Button>
                <Button variant={pizzaSize === '2' ? 'contained' : 'outlined'} onClick={e => setPizzaSize('2')}
                        key={"b2"}>Medium</Button>
                <Button variant={pizzaSize === '3' ? 'contained' : 'outlined'} onClick={e => setPizzaSize('3')}
                        key={"b3"}>Large</Button>
            </ButtonGroup>
            <CardActions className={classes.cardActions} disableSpacing={false}>
                <Typography color={"secondary"} variant={"body1"}>
                    <b><i>Price: {pizzaPrice.toFixed(2)}$</i></b>
                </Typography>
                <Button size="large" color="primary" onClick={event => addPizzaToBasket()}>
                    Buy
                </Button>
                {(props.user != null && props.user.role === 'ADMIN') ?
                    <IconButton edge="end" aria-label="delete" onClick={event => deletePizzaPattern()}>
                        <DeleteIcon/>
                    </IconButton>
                    : ""}
            </CardActions>

        </Card>
    </Grid>
}
