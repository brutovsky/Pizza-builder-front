import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {ExpandLess, ExpandMore, StarBorder} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
}));

export default function OrderListItem(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [confirmed, setConfirmed] = React.useState(false);
    const confirmOrder = () =>{

    }

    const handleClick = () => {
        setOpen(!open);
    };
    return <div>
        <ListItem button onClick={handleClick}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={props.order.name}/>
            {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                </ListItem>
            </List>
            <FormControlLabel
                control={<Checkbox checked={confirmed} onChange={e => confirmOrder()} name="Connfirmed" />}
                label="Confirmed"
            />
        </Collapse>
    </div>
}
