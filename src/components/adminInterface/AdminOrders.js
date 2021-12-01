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
    selectOrders, fetchAllOrders, fetchAllStatuses, selectOrderStatuses
} from "../../features/orders/Orders";
import {useDispatch, useSelector} from "react-redux";
import {snack} from "../utils/CustomSnackBar";
import OrderListItem from "./OrderListItem";
import Grid from "@material-ui/core/Grid";
import {Divider} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {fetchCart, increment} from "../../features/basket/basketSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {isStatusLoading} from "../../utils/Utils";
import CircularProgress from "@material-ui/core/CircularProgress";

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

    const fetchStatuses = () => {
        dispatch(fetchAllStatuses());
    }

    // Effects
    useEffect(() => {
        fetchOrders();
        fetchStatuses();
    }, []);

    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const orders = useSelector(selectOrders);
    const orderStatuses = useSelector(selectOrderStatuses);

    const sortedOrders = () => {
        let arrayForSort = [...orders]
        return arrayForSort.sort((a, b) => {
            return (a.checkId - b.checkId)
        })
    }

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
                    {orders === null || (orders.length === 0 && isStatusLoading(status)) ?
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            <Grid item xs={4}>
                                <CircularProgress color="secondary" size={100} className={'circularProgress'}/>
                            </Grid>
                        </Grid>
                        :
                        <Container className={classes.listGroups}>
                            <List>
                                {sortedOrders()
                                    .map((order) => (
                                        <Grid>
                                            <OrderListItem order={order} orderStatuses={orderStatuses}>
                                            </OrderListItem>
                                            <Box
                                                sx={{
                                                    height: 20,
                                                }}
                                            />
                                            <Divider></Divider>
                                        </Grid>
                                    ))}
                            </List>
                        </Container>}
                </Container>
            </main>
            <Footer/>
        </React.Fragment>
    );
}
