import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import chisi from "../../resources/images/chisi.jpg";
import Divider from "@material-ui/core/Divider";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import {AddCircle, RemoveCircle} from "@material-ui/icons";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    content: {},
    media: {
        height: '100%',
        width: '100%',
        paddingTop: '40%', // 16:9
    },
    card: {
        height: 100,
        width: 100,
    },
    howManyBox: {
        width:25,
        alignContent: 'center',
        backgroundColor: 'white'
    },
    howManyText: {
        textAlign: 'center',
    }
}));

export default function IngredientInPizza(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Card className={classes.card}>

            <CardMedia
                className={classes.media}
                image={'https://www.wisconsinrivermeats.com/prodimages/cheddar-cheese.jpg'}
                title="Image title"
            >
                <Box mx={4.2} border={1}  className={classes.howManyBox} borderRadius="50%">
                    <Typography className={classes.howManyText} variant={"body2"}>
                        10
                    </Typography>
                </Box>
                <IconButton aria-label="settings">
                    <RemoveCircle/>
                </IconButton>
                <IconButton aria-label="settings">
                    <AddCircle/>
                </IconButton>
            </CardMedia>
            <CardContent className={classes.content}>
            </CardContent>
        </Card>
    );
}
