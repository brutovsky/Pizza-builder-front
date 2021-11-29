import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from "../Header";
import Footer from "../Footer";
import TextField from "@material-ui/core/TextField";
import {validateImageUrl} from "../utils/Validation";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import {
    createIngredient,
    deleteIngredient,
    fetchAllGroups,
    fetchAllIngredients,
    selectGroups,
    selectIngredients,
    selectStatus
} from "../../features/ingredients/Ingredients";
import {useDispatch, useSelector} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {unwrapResult} from "@reduxjs/toolkit";
import {snack} from "../utils/CustomSnackBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import {isStatusLoading} from "../../utils/Utils";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '79vh',
    },
    addIngr: {
        padding: theme.spacing(8, 0, 6),
    },
    ingrImage: {
        maxWidth: 400,
        maxHeight: 600
    },
    ingrTextField: {
        minWidth: 150,
        margin: 4
    },
    formControl: {
        margin: theme.spacing(3),
    },
    listGroups: {
        alignContent: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20
    },
    ingrCard: {
        margin: 10,
        minWidth: 280
    }
}));

export default function AdminIngredienst() {
    const classes = useStyles();

    // SnackBar
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [snackSeverity, setSnackSeverity] = React.useState('success');
    const [snackText, setSnackText] = React.useState('Mellon');
    const showSnack = (severity, text) => {
        setSnackSeverity(severity);
        setSnackText(text);
        setSnackOpen(true);
    }

    // Validation
    const [validIngrName, setValidIngrName] = useState(true);
    const [validIngrPrice, setValidIngrPrice] = useState(true);
    const [validIngrImage, setValidIngrImage] = useState(true);
    const [validIngrGroup, setValidIngrGroup] = useState(true);
    const validate = () => {
        const isValiIngrdName = ingrName != "";
        setValidIngrName(isValiIngrdName);

        const isValidIngrPrice = ingrPrice != "";
        setValidIngrPrice(isValidIngrPrice);

        const isValidIngrGroup = ingrGroup != "";
        setValidIngrGroup(isValidIngrGroup);

        const isValidIngrImage = validateImageUrl(ingrImage) === true;
        setValidIngrImage(isValidIngrImage);

        return isValiIngrdName && isValidIngrPrice && isValidIngrGroup && isValidIngrImage;
    }

    //
    const fetchGroups = () => {
        console.log("fetch")
        dispatch(fetchAllGroups());
    }

    const fetchIngredients = () => {
        console.log("fetch")
        dispatch(fetchAllIngredients());
    }

    const createNewIngredient = () => {
        if (validate()) {
            dispatch(createIngredient({
                uuid: "",
                groupUuid: ingrGroup,
                name: ingrName,
                price: ingrPrice,
                spicy: ingrChecks.spicy,
                vegetarian: ingrChecks.vegeterian,
                vegan: ingrChecks.vegan,
                photoUrl: ingrImage
            })).then(unwrapResult)
                .then(originalPromiseResult => {
                    console.log(originalPromiseResult)
                    showSnack("success", "Ingredient successfully created !");
                })
                .catch(rejectedValueOrSerializedError => {
                    showSnack("error", "Something went wrong :/");
                    console.log(rejectedValueOrSerializedError)
                });
        }
    }

    // State
    const [ingrImage, setIngrImage] = useState('https://basketbaba.com/wp-content/uploads/2017/11/Pineapple.jpg');
    const [ingrGroup, setIngrGroup] = useState('');
    const [ingrName, setIngrName] = useState('melon');
    const [ingrPrice, setIngrPrice] = useState('300.0');
    const [ingrChecks, setIngrChecks] = useState({
        spicy: false,
        vegeterian: false,
        vegan: false,
    });
    const handleCheckChange = (event) => {
        setIngrChecks({...ingrChecks, [event.target.name]: event.target.checked});
    };

    // Effects
    useEffect(() => {
        fetchIngredients();
        fetchGroups();
    }, []);

    // Redux
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const groups = useSelector(selectGroups);
    const ingredients = useSelector(selectIngredients);
    //

    const deleteI = (ingr) => {
        dispatch(deleteIngredient({
            uuid: ingr.uuid
        })).then(unwrapResult)
            .then(originalPromiseResult => {
                console.log(originalPromiseResult)
                dispatch(fetchAllIngredients());
                showSnack("success", "Ingredient successfully deleted !");
            })
            .catch(rejectedValueOrSerializedError => {
                showSnack("error", "Something went wrong :/");
                console.log(rejectedValueOrSerializedError)
            });
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <main>
                <Container className={classes.root}>
                    <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                        Create New Ingredient
                    </Typography>
                    {snack(snackOpen, setSnackOpen, snackSeverity, snackText)}
                    <Grid container spacing={1} className={classes.addIngr}>
                        <Grid item xs={12} sm={12} md={6}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        className={classes.ingrTextField}
                                        variant="standard"
                                        margin="normal"
                                        required
                                        id="image"
                                        label="Ingredient image"
                                        fullWidth
                                        defaultValue="https://basketbaba.com/wp-content/uploads/2017/11/Pineapple.jpg"
                                        name="image"
                                        autoFocus
                                        onChange={e => setIngrImage(e.target.value)}
                                        helperText={validateImageUrl(ingrImage)}
                                        error={!validIngrImage}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <img className={classes.ingrImage} src={ingrImage}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                className={classes.ingrTextField}
                                variant="standard"
                                margin="normal"
                                required
                                id="name"
                                label="Ingr name"
                                value={ingrName}
                                name="name"
                                autoFocus
                                onChange={e => setIngrName(e.target.value)}
                                helperText={
                                    ingrName == "" ? "Name is requires" : ""
                                }
                                error={!validIngrName}
                            />
                            <CurrencyTextField
                                className={classes.ingrTextField}
                                label="Price"
                                variant="standard"
                                value={ingrPrice}
                                currencySymbol="$"
                                outputFormat="string"
                                decimalCharacter="."
                                digitGroupSeparator=","
                                onChange={(event, value) => setIngrPrice(value)}
                                helperText={
                                    ingrPrice == "" ? "Price is requires" : ""
                                }
                                error={!validIngrPrice}
                            />
                            <FormControl variant="standard" className={classes.ingrTextField}>
                                <InputLabel>Group</InputLabel>
                                <Select
                                    value={ingrGroup}
                                    onChange={(e) => {
                                        setIngrGroup(e.target.value)
                                    }}
                                    error={!validIngrGroup}
                                >
                                    {groups !== null && groups.map((group) => <MenuItem
                                        value={group.uuid}>{group.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <div>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Choose ingredient options</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox checked={ingrChecks.spicy} onChange={handleCheckChange}
                                                               name="spicy"/>}
                                            label="Spicy"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={ingrChecks.vegeterian}
                                                               onChange={handleCheckChange}
                                                               name="vegeterian"/>}
                                            label="Vegeterian"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={ingrChecks.vegan} onChange={handleCheckChange}
                                                               name="vegan"/>}
                                            label="Vegan"
                                        />
                                    </FormGroup>
                                    <FormHelperText>Choose carefully</FormHelperText>
                                </FormControl>
                            </div>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={event => createNewIngredient()}
                            // disabled={status === "loading"}
                        >
                            Create
                        </Button>
                    </Grid>
                    {ingredients === null || (ingredients.length === 0 && isStatusLoading(status)) ?
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            <Grid item xs={4}>
                                <CircularProgress color="secondary" size={100} className={'circularProgress'}/>
                            </Grid>
                        </Grid>
                        :
                    <Container className={classes.listGroups} maxWidth="md">
                        <Grid container spacing={4}>
                            {ingredients.map((ingr) => (
                                <Card key={ingr.name} xs={12} sm={6} md={4} className={classes.ingrCard}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={ingr.photoUrl}
                                            title={ingr.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {ingr.name}
                                            </Typography>
                                            <Typography><b>Price: </b>{ingr.price}$</Typography>
                                            {ingr.spicy && <Typography>Spicy 🌶️</Typography>}
                                            {ingr.vegetarian && <Typography>Vegetarian 🥦</Typography>}
                                            {ingr.vegan && <Typography>Vegan 🥑</Typography>}
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <IconButton edge="end" aria-label="delete" onClick={event => deleteI(ingr)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            ))}
                        </Grid>
                    </Container>}
                </Container>
            </main>
            <Footer/>
        </React.Fragment>
    );
}
