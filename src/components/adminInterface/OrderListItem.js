import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {ExpandLess, ExpandMore, Person, PersonPinCircle, StarBorder} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {Divider} from "@material-ui/core";
import OrderPizzaListItem from "./OrderPizzaListItem";
import {unwrapResult} from "@reduxjs/toolkit";
import {fetchCart} from "../../features/basket/basketSlice";
import {fetchAllOrders, updateStatus} from "../../features/orders/Orders";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({}));

export default function OrderListItem(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [confirmed, setConfirmed] = React.useState(false);
    const confirmOrder = () => {

    }

    const dispatch = useDispatch()

    const updateOrderStatus = (newStatus) => {
        dispatch(updateStatus({
            orderId: props.order.checkId,
            status: newStatus
        })).then(unwrapResult)
            .then(originalPromiseResult => {
                dispatch(fetchAllOrders())
                console.log(originalPromiseResult);
            })
            .catch(rejectedValueOrSerializedError => {
                console.log(rejectedValueOrSerializedError);
            })
    }

    const order = props.order

    const [currentOrderStatus, setCurrentOrderStatus] = React.useState(props.order.status);

    const changeCurrentOrderStatus = (event) =>{
        setCurrentOrderStatus(event.target.value)
        updateOrderStatus(event.target.value)
    }

    const handleClick = () => {
        setOpen(!open);
    };

    return <div>
        <ListItem button onClick={handleClick}>
            <ListItemIcon>
            </ListItemIcon>
            📜 Order №
            <ListItemText primary={order.checkId}/>
            {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container spacing={2} justify="center">
                <Grid>
                    <Grid xs={2}>

                    </Grid>
                    <Grid>
                        <TableContainer>
                            <Table sx={{minWidth: 700, maxWidth: 700}} aria-label="simple table">
                                <TableBody>
                                    <TableRow
                                        key={"f"}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Person/>
                                        </TableCell>
                                        <TableCell align="right">{order.userName}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        key={"f2"}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            💵
                                        </TableCell>
                                        <TableCell align="right">{order.totalPrice.toFixed(2) + '$'}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        key={"f3"}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            <PersonPinCircle/>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography>
                                                City: {order.address.city}
                                            </Typography>
                                            <Typography>
                                                Street: {order.address.street}
                                            </Typography>
                                            <Typography>
                                                Building: {order.address.build}
                                            </Typography>
                                            <Typography>
                                                Flat: {order.address.flat}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        key={"f4"}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            Status
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={currentOrderStatus}
                                                    label="Status"
                                                    onChange={changeCurrentOrderStatus}
                                                >
                                                    {props.orderStatuses.map(orderStatus => {
                                                        return <MenuItem value={orderStatus}>{orderStatus}</MenuItem>
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        key={"f5"}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {order.patternViewList.map(pattern => {
                                                return <OrderPizzaListItem pizza={pattern}/>
                                            })}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>
        </Collapse>
    </div>
}
