import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import Review from './Review';
import Header from "../Header";
import Footer from "../Footer";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../features/auth/Auth";
import {fetchCart, placeOrder, selectPatterns} from "../../features/basket/basketSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        minHeight: '72vh',
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

export default function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const dispatch = useDispatch()

    const [checkId, setCheckId] = useState(null);

    const handleNext = () => {
        if(activeStep === 1){
            dispatch(placeOrder({
                city: address.city,
                street: address.street,
                build: address.build,
                flat: address.flat,
            })).then(unwrapResult)
                .then(originalPromiseResult => {
                    console.log(originalPromiseResult);
                    setCheckId(originalPromiseResult.result.checkId)
                    setActiveStep(activeStep + 1);
                    dispatch(fetchCart())
                })
                .catch(rejectedValueOrSerializedError => {
                    console.log(rejectedValueOrSerializedError)
                })
        }else if(validate()){
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const user = useSelector(selectUser);
    const [address, setAddress] = useState({...user.address, name: user.name});

    const updateAddress = (field, value) =>{
        setAddress({...address, [field]:value});
    }

    // Validation
    const isValidName = address.name != '';
    const isValidCity = address.city != '';
    const isValidFlat = address.flat != '';
    const isValidBuild = address.build != '';
    const isValidStreet = address.street != '';

    const validate = () => {
        return isValidName && isValidCity && isValidFlat && isValidBuild && isValidStreet;
    }
    //

    const steps = ['Shipping address', 'Review your order'];

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm address={address} updateAddress={updateAddress} validate/>;
            case 1:
                return <Review patterns={patterns} address={address}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    const patterns = useSelector(selectPatterns)

    return (
        <React.Fragment>
            <CssBaseline />
            <Header/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #{checkId}. We have emailed your order confirmation, and will
                                    send you an update when your order has shipped.
                                </Typography>
                                <Link to={'/home'}>
                                    Back to shopping🍕🍔🍟🌭🥑.
                                </Link>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
            <Footer/>
        </React.Fragment>
    );
}
