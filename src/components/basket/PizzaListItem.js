import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {makeStyles} from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {useDispatch} from "react-redux";
import {decrement, deletePatternFromBasket, fetchCart, increment} from "../../features/basket/basketSlice";
import {unwrapResult} from "@reduxjs/toolkit";

const useStyles = makeStyles((theme) => ({
    ingrImage: {
        maxWidth: 40,
        maxHeight: 60
    },
    listItem: {},
    itemText: {}
}));

export default function PizzaListItem(props) {
    const classes = useStyles();

    const dispatch = useDispatch()

    const incrementPattern = () => {
        dispatch(increment({
            uuid: props.pizza.uuid,
            size: props.pizza.size,
        })).then(unwrapResult)
            .then(originalPromiseResult => {
                dispatch(fetchCart())
                console.log(originalPromiseResult);
            })
            .catch(rejectedValueOrSerializedError => {
                console.log(rejectedValueOrSerializedError);
            })
    }

    const decrementPattern = () => {
        if (props.pizza.quantity <= 1) {
            deletePattern();
        } else
            dispatch(decrement({
                uuid: props.pizza.uuid,
                size: props.pizza.size,
            })).then(unwrapResult)
                .then(originalPromiseResult => {
                    dispatch(fetchCart())
                    console.log(originalPromiseResult);
                })
                .catch(rejectedValueOrSerializedError => {
                    console.log(rejectedValueOrSerializedError);
                })
    }

    const deletePattern = () => {
        dispatch(deletePatternFromBasket({
            uuid: props.pizza.uuid,
            size: props.pizza.size,
        })).then(unwrapResult)
            .then(originalPromiseResult => {
                dispatch(fetchCart())
                console.log(originalPromiseResult);
            })
            .catch(rejectedValueOrSerializedError => {
                console.log(rejectedValueOrSerializedError);
            })
    }

    return <>
        <ListItem className={classes.listItem} key={props.pizza.name}>
            <ListItemAvatar>
                <Avatar>
                    <img className={classes.ingrImage} src={props.pizza.photoUrl}/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText fullWidth
                          className={classes.itemText}
                          primary={props.pizza.name}
                          secondary={(props.pizza.size) + 'size X ' + props.pizza.quantity + ' = ' + (Number(props.pizza.price).toFixed(2))}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" onClick={event => deletePattern()}>
                    <DeleteIcon/>
                </IconButton>
                <IconButton edge="end" onClick={event => decrementPattern()}>
                    <RemoveIcon/>
                </IconButton>
                <IconButton edge="end" onClick={event => incrementPattern()}>
                    <AddIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    </>
}
