import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    ingrImage: {
        maxWidth: 40,
        maxHeight: 60
    },
    listItem: {},
    itemText: {}
}));

export default function OrderPizzaListItem(props) {
    const classes = useStyles();

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
        </ListItem>
    </>
}
