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
    selectStatus,
    selectPatterns, fetchConfirmedPatterns, fetchUserPatterns
} from "../features/pizzaPatterns/PizzaPatterns";
import {
    selectUser
} from "../features/auth/Auth";
import PizzaCard from "./cards/PizzaCard";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Link} from "react-router-dom";

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
    }
}));

function Home() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const pizzaStatus = useSelector(selectStatus);

    const pizzaPatterns = useSelector(selectPatterns);

    const user = useSelector(selectUser);

    const [onlyUserPatterns, setOnlyUserPatterns] = useState(false);

    const onChangeOnlyUserPatterns = () =>{
        const value = onlyUserPatterns;
        if(!value){
            dispatch(fetchUserPatterns());
            setOnlyUserPatterns(!value);
        }else{
            if(user == null){
                dispatch(fetchConfirmedPatterns());
            }else if(user.role === "ADMIN"){
                dispatch(fetchAllPatterns());
            }else if(user.role === "USER"){
                dispatch(fetchConfirmedPatterns());
            }else{
                dispatch(fetchConfirmedPatterns());
            }
            setOnlyUserPatterns(!value);
        }
    }

    const fetchPatterns = () => {
        if(onlyUserPatterns){
            dispatch(fetchUserPatterns());
        }else if(user == null){
            dispatch(fetchConfirmedPatterns());
        }else if(user.role === "ADMIN"){
            dispatch(fetchAllPatterns());
        }else if(user.role === "USER"){
            dispatch(fetchConfirmedPatterns());
        }else{
            dispatch(fetchConfirmedPatterns());
        }
    }

    useEffect(() => fetchPatterns(), []);

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
                        <Grid container spacing={2} justify="center" className={classes.heroButtons}>
                            <Grid item key={"button1"}>
                                <Link variant="contained" color={"primary"} to={"/build"}>
                                    Create your own pattern
                                </Link>
                            </Grid>
                            <Grid item key={"button2"}>
                                <Button variant="outlined" color="primary" href={"/checkout"}>
                                    Checkout
                                </Button>
                            </Grid>
                            {user != null && <Grid item key={"button3"}>
                                <FormControlLabel
                                    control={<Checkbox checked={onlyUserPatterns}
                                                       onChange={e => onChangeOnlyUserPatterns()}
                                                       name="Connfirmed"/>}
                                    label="Show only my patterns"
                                />
                            </Grid>}
                        </Grid>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {pizzaPatterns !== null && pizzaPatterns.map((pattern) => (
                            <PizzaCard pattern={pattern} user={user} key={pattern.uuid}/>
                        ))}
                    </Grid>
                </Container>
            </main>
            <Footer/>
        </React.Fragment>
    );
}

export default Home
