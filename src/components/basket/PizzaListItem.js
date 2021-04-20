import Typography from "@material-ui/core/Typography";
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
    const [pizza, setPizza] = useState(props.pizza);
    return <>
        <ListItem className={classes.listItem} key={pizza.name}>
            <ListItemAvatar>
                <Avatar>
                    <img className={classes.ingrImage} src={pizza.photoUrl}/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText fullWidth
                          className={classes.itemText}
                          primary={pizza.name}
                          secondary={(pizza.size) + ' x' + pizza.amount}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end">
                    <RemoveIcon/>
                </IconButton>
                <IconButton edge="end">
                    <AddIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    </>
}
