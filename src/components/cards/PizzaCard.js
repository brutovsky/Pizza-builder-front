import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
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

export default function PizzaCard({pizza}) {
    const classes = useStyles();

    return <Grid item key={pizza.uuid} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
                title="Image title"
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {pizza.name} 🥦
                </Typography>
                <Divider/>
                <Typography variant={"body1"}>
                    Tasty pizza description.
                </Typography>
                <Divider/>
                <Typography variant={"body2"}><span><b>🧀 Mozarella, Feta, Parmezan, Cheddar</b></span></Typography>
                <Typography variant={"body2"}><span><b>🍖 No</b></span></Typography>
                <Typography variant={"body2"}><span><b>🥣 Al`fredo</b></span></Typography>

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
}
