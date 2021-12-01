import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from "./Header";
import Footer from "./Footer";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchAllPatterns,
    fetchConfirmedPatterns,
    fetchUserPatterns,
    selectPatterns,
    selectStatus
} from "../features/pizzaPatterns/PizzaPatterns";
import {selectUser} from "../features/auth/Auth";
import PizzaCard from "./cards/PizzaCard";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Link} from "react-router-dom";
import {snack} from "./utils/CustomSnackBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import {isStatusLoading} from "../utils/Utils";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 0),
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
        paddingTop: '56.25%',
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
    root: {
        minHeight: '79vh',
    },
}));

function Home() {
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

    const pizzaStatus = useSelector(selectStatus);

    const pizzaPatterns = useSelector(selectPatterns);

    const user = useSelector(selectUser);

    const [onlyUserPatterns, setOnlyUserPatterns] = useState(false);

    const [chosenLabels, updateChosenLabels] = React.useState([]);

    const handleLabelChange = (newLabel) => {
        if (newLabel === '') {
            updateChosenLabels([]);
        } else if (chosenLabels.includes(newLabel)) {
            updateChosenLabels(chosenLabels.filter(label => label !== newLabel))
        } else
            updateChosenLabels([...chosenLabels, newLabel]);
    };

    const onChangeOnlyUserPatterns = () => {
        const value = onlyUserPatterns;
        if (!value) {
            dispatch(fetchUserPatterns());
            setOnlyUserPatterns(!value);
        } else {
            if (user == null) {
                dispatch(fetchConfirmedPatterns());
            } else if (user.role === "ADMIN") {
                dispatch(fetchAllPatterns());
            } else if (user.role === "USER") {
                dispatch(fetchConfirmedPatterns());
            } else {
                dispatch(fetchConfirmedPatterns());
            }
            setOnlyUserPatterns(!value);
        }
    }

    const patternLabelsMatch = (pattern, labels) => {
        if (labels.length <= 0) return true
        let patternLabels = [];

        const ingredients = pattern.ingredients.map(i => i.ingredient);
        console.log("HERE")
        console.log(ingredients)
        const spicy = ingredients.find(i => i.spicy);
        const vegetarian = ingredients.every(i => i.vegetarian);
        const vegan = ingredients.every(i => i.vegan);
        if (spicy) {
            patternLabels.push('spicy')
        }
        if (vegetarian && !vegan) {
            patternLabels.push('milk')
        }
        if ((vegan && !vegetarian) || (vegan && vegetarian)) {
            patternLabels.push('vegan')
        }
        let difference = labels.filter(x => patternLabels.includes(x));
        console.log(difference)
        return patternLabels.length !== 0 && difference.length !== 0;
    }

    const fetchPatterns = () => {
        if (onlyUserPatterns) {
            dispatch(fetchUserPatterns());
        } else if (user == null) {
            dispatch(fetchConfirmedPatterns());
        } else if (user.role === "ADMIN") {
            dispatch(fetchAllPatterns());
        } else if (user.role === "USER") {
            dispatch(fetchConfirmedPatterns());
        } else {
            dispatch(fetchConfirmedPatterns());
        }
    }

    const deletePatternCallback = (pizza, successful) => {
        console.log(pizza)
        if (successful) {
            fetchPatterns()
            showSnack("success", "Pattern successfully deleted !");
        } else {
            showSnack("error", "Something went wrong :/");
        }
    };

    useEffect(() => fetchPatterns(), []);

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <main className={classes.root}>
                {snack(snackOpen, setSnackOpen, snackSeverity, snackText)}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Pizza Layouts
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Choose the pizza you like and modify it to your tastes
                        </Typography>
                        <Grid container spacing={2} justify="center" className={classes.heroButtons}>
                            <Grid item key={"button1"}>
                                <Link variant="contained" color={"primary"} to={"/build"} className={'custom-link'}>
                                    <Button variant="contained" color="primary">
                                        <Typography>
                                            Create your own pattern
                                        </Typography>
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item key={"button2"}>
                                <Link variant="outlined" color="primary" to={"/checkout"} className={'custom-link'}>
                                    <Button variant="outlined" color="primary">
                                        Checkout
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item key={"button3"} container spacing={5} justify="center">
                                <Grid xs={1}/>
                                <Grid item xs={6} sm={4}>
                                    <ButtonGroup variant="outlined" color="primary"
                                                 aria-label="contained primary button group"
                                                 className={classes.cardActions}>
                                        <Button variant={chosenLabels.length === 0 ? 'contained' : 'outlined'}
                                                onClick={e => handleLabelChange('')}
                                                key={'all'}>🍕</Button>
                                        <Button variant={chosenLabels.includes('spicy') ? 'contained' : 'outlined'}
                                                onClick={e => handleLabelChange('spicy')}
                                                key={'spicy'}>🌶️</Button>
                                        <Button variant={chosenLabels.includes('milk') ? 'contained' : 'outlined'}
                                                onClick={e => handleLabelChange('milk')}
                                                key={'milk'}>🥛</Button>
                                        <Button variant={chosenLabels.includes('vegan') ? 'contained' : 'outlined'}
                                                onClick={e => handleLabelChange('vegan')}
                                                key={'vegan'}>🥦</Button>
                                    </ButtonGroup>
                                </Grid>
                                <Grid xs={1}>

                                </Grid>
                                {user != null &&
                                <Grid item xs={6} justify="center">
                                    <FormControlLabel
                                        control={<Checkbox checked={onlyUserPatterns}
                                                           onChange={e => onChangeOnlyUserPatterns()}
                                                           name="Connfirmed"/>}
                                        label="Show only my patterns"
                                    />
                                </Grid>
                                }
                            </Grid>
                        </Grid>
                    </Container>
                </div>
                {pizzaPatterns === null || (pizzaPatterns.length === 0 && isStatusLoading(pizzaStatus)) ?
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item xs={3}>
                            <CircularProgress color="secondary" size={100} className={'circularProgress'}/>
                        </Grid>
                    </Grid>
                    :
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid container spacing={4}>
                            {pizzaPatterns
                                .filter((pattern) => {
                                    return patternLabelsMatch(pattern, chosenLabels)
                                })
                                .map((pattern) => (
                                    <PizzaCard pattern={pattern} user={user} key={pattern.uuid}
                                               deletePatternCallback={deletePatternCallback}/>
                                ))}
                        </Grid>
                    </Container>}
            </main>
            <Footer/>
        </React.Fragment>
    );
}

export default Home
