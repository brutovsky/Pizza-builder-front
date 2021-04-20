import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Header from "./Header";
import Footer from "./Footer";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchAllPatterns,
    selectStatus,
    selectPatterns
} from "../features/pizzaPatterns/PizzaPatterns";
import {
    selectUser
} from "../features/auth/Auth";
import PizzaCard from "./cards/PizzaCard";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
    cardActions:{
        alignContent:"center",
        justifyContent:"center"
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    root:{
        minHeight: '79vh',
    }
}));

function Home() {
    const classes = useStyles();

    const fetchPatterns = () =>{
        dispatch(fetchAllPatterns());
    }

    useEffect(()=>fetchPatterns(), []);

    const dispatch = useDispatch();

    const pizzaStatus = useSelector(selectStatus);

    const pizzaPatterns = useSelector(selectPatterns);

    const user = useSelector(selectUser);

    const [onlyUserPatterns, setOnlyUserPatterns] = useState(false);

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <main className={classes.root}>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Pizza Layouts
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Choose the pizza you like and modify it to your tastes
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" href={"/build"}>
                                        Create your own pattern
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary" href={"/checkout"}>
                                        Checkout
                                    </Button>
                                </Grid>
                                {user != null && <Grid item>
                                    <FormControlLabel
                                        control={<Checkbox checked={onlyUserPatterns} onChange={e => setOnlyUserPatterns(!onlyUserPatterns)} name="Connfirmed" />}
                                        label="Show only my patterns"
                                    />
                                </Grid>}
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {pizzaPatterns !== null && pizzaPatterns.map((pattern) => (
                            <PizzaCard pattern={pattern} user={user}/>
                        ))}
                    </Grid>
                </Container>
            </main>
            <Footer/>
        </React.Fragment>
    );
}

export default Home
