import React from 'react';
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
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Home() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <main>
                {/* Hero unit */}
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
                                    <Button variant="contained" color="primary">
                                        Create your own pattern
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Checkout
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Pizza Four-Cheese 🥦
                                        </Typography>
                                        <Divider/>
                                        <Typography variant={"body1"}>
                                            Tasty pizza description.
                                        </Typography>
                                        <Divider/>
                                        <Typography variant={"body2"}>
                                            <p><b>🧀 Mozarella, Feta, Parmezan, Cheddar</b></p>
                                            <p><b>🍖 No</b></p>
                                            <p><b>🥣 Al`fredo</b></p>
                                        </Typography>

                                        <ButtonGroup variant="outlined" color="primary"
                                                     aria-label="contained primary button group">
                                            <Button variant={"contained"}>Small</Button>
                                            <Button>Medium</Button>
                                            <Button>Large</Button>
                                        </ButtonGroup>

                                    </CardContent>

                                    <CardActions className={classes.cardActions} disableSpacing={false}>
                                        <Typography color={"secondary"} variant={"body1"}>
                                            <b><i>Price: 99.9$</i></b>
                                        </Typography>
                                        <Button size="large" color="primary">
                                            Modify
                                        </Button>
                                        <Button size="large" color="primary">
                                            Buy
                                        </Button>
                                    </CardActions>


                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Footer/>
            {/* End footer */}
        </React.Fragment>
    );
}

export default Home
