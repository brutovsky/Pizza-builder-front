import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Header from "../Header";
import Footer from "../Footer";
import TextField from "@material-ui/core/TextField";
import {validateEmail, validatePassword} from "../utils/Validation";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import PizzaCard from "../cards/PizzaCard";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import CurrencyTextField from '@unicef/material-ui-currency-textfield'

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '76vh',
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    addIngr: {
        padding: theme.spacing(8, 0, 6),
    },
    ingrImage: {
        maxWidth: 400,
        maxHeight: 600
    },
    ingrTextField: {
        minWidth: 200,
        margin: 4
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function AdminIngredienst() {
    const classes = useStyles();

    const [ingrImage, setIngrImage] = useState('');
    const [ingrGroup, setIngrGroup] = useState('');
    const [ingrName, setIngrName] = useState('');
    const [ingrPrice, setIngrPrice] = useState('');

    const handleCheckChange = (event) => {
        setIngrChecks({...ingrChecks, [event.target.name]: event.target.checked});
    };

    const [ingrChecks, setIngrChecks] = useState({
        spicy: false,
        vegeterian: false,
        vegan: false,
    });

    const handleImageChange = (event) => {
        console.log(event.target.files[0])
        setIngrImage({
            file: URL.createObjectURL(event.target.files[0])
        })
        console.log(URL.createObjectURL(event.target.files[0]))
    }
    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <main>
                <Container className={classes.root} maxWidth="md">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Create new ingredient
                    </Typography>
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
                                        label="Ingr image"
                                        fullWidth
                                        defaultValue="https://basketbaba.com/wp-content/uploads/2017/11/Pineapple.jpg'"
                                        name="image"
                                        autoFocus
                                        onChange={e => setIngrImage(e.target.value)}
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
                                defaultValue="melon"
                                name="name"
                                autoFocus
                                onChange={e => setIngrName(e.target.value)}
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
                                onChange={(event, value)=> setIngrPrice(value)}
                            />
                            <FormControl variant="standard" className={classes.ingrTextField}>
                                <InputLabel id="demo-simple-select-filled-label">Group</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={ingrGroup}
                                    onChange={(e) => {
                                        setIngrGroup(e.target.value)
                                    }}
                                >
                                    <MenuItem value={'cheese'}>Cheese</MenuItem>
                                    <MenuItem value={'meat'}>Meat</MenuItem>
                                    <MenuItem value={'vegetables'}>Vegetable</MenuItem>
                                    <MenuItem value={'sauce'}>Sauce</MenuItem>
                                    <MenuItem value={'bread'}>Bread</MenuItem>
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
                                                               onChange={handleCheckChange} name="vegeterian"/>}
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
                        >
                            Create
                        </Button>
                    </Grid>
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid container spacing={4}>
                            {cards.map((card) => <p>{card}</p>)}
                        </Grid>
                    </Container>
                </Container>
            </main>
            {/* Footer */}
            <Footer/>
            {/* End footer */}
        </React.Fragment>
    );
}
