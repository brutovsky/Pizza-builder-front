import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from "../Header";
import Footer from "../Footer";
import List from "@material-ui/core/List";
import {
    selectStatus,
    selectOrders, fetchAllOrders
} from "../../features/orders/Orders";
import {useDispatch, useSelector} from "react-redux";
import {snack} from "../utils/CustomSnackBar";
import OrderListItem from "./OrderListItem";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '79vh',
    },
    listGroups: {
        alignContent: "center",
        justifyContent: "center",
        marginTop: 20
    },
}));

export default function AdminOrders() {
    const classes = useStyles();

    // SnackBar
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [snackSeverity, setSnackSeverity] = React.useState('success');
    const [snackText, setSnackText] = React.useState('Mellon');
    const showSnack = (severity, text) => {
        setSnackSeverity(severity);
        setSnackText(text);
        setSnackOpen(true);
    }

    const fetchOrders = () => {
        dispatch(fetchAllOrders());
    }

    useEffect(() => fetchOrders(), []);

    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const orders = useSelector(selectOrders);

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <main>
                <Container className={classes.root} maxWidth="md">
                    <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                        Orders
                    </Typography>
                    {snack(snackOpen, setSnackOpen, snackSeverity, snackText)}
                    <Container className={classes.listGroups}>
                        <List>
                            {orders !== null && orders.map((order) => (
                                <OrderListItem order={order}>
                                </OrderListItem>
                            ))}
                        </List>
                    </Container>
                </Container>
            </main>
            <Footer/>
        </React.Fragment>
    );
}
