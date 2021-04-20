import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import {ButtonGroup, CardActionArea} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'hidden',
    },
    gridList: {
        height: '62vh'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
        justifyContent:'center'
    }
}));

export default function IngredientGridList(props) {
    const classes = useStyles();

    let isPageWide1400 = useMediaQuery('(min-width: 1400px)')
    let isPageWide600 = useMediaQuery('(min-width: 600px)')

    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList} cols={isPageWide1400 ? 3 : (isPageWide600 ? 2 : 1)}>
                {props.ingredients.map((ingr) => (
                    <GridListTile key={ingr.name}>
                        <img src={ingr.photoUrl}/>
                        <GridListTileBar
                            title={ingr.name}
                            actionIcon={
                                <ButtonGroup>
                                    <IconButton className={classes.icon} onClick={(e) => props.plusCallback(ingr.ingredient(1))}>
                                        <Add />
                                    </IconButton>
                                    <IconButton className={classes.icon} onClick={(e) => props.minusCallback(ingr.ingredient(1))}>
                                        <Remove />
                                    </IconButton>
                                </ButtonGroup>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}
