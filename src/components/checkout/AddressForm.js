import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/Auth";
import {validateImageUrl} from "../utils/Validation";

export default function AddressForm(props) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        error={props.address.firstName == ''}
                        value={props.address.firstName}
                        onChange={e => props.updateAddress('firstName', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        error={props.address.lastName == ''}
                        value={props.address.lastName}
                        onChange={e => props.updateAddress('lastName', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        error={props.address.city == ''}
                        value={props.address.city}
                        onChange={e => props.updateAddress('city', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="street"
                        name="street"
                        label="Street"
                        fullWidth
                        autoComplete="shipping address-level2"
                        error={props.address.street == ''}
                        value={props.address.street}
                        onChange={e => props.updateAddress('street', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="build"
                        name="build"
                        label="Building"
                        fullWidth
                        required
                        error={props.address.build == ''}
                        value={props.address.build}
                        onChange={e => props.updateAddress('build', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="flat"
                        name="flat"
                        label="Flat"
                        fullWidth
                        autoComplete="shipping address-level2"
                        error={props.address.flat == ''}
                        value={props.address.flat}
                        onChange={e => props.updateAddress('flat', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes"/>}
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
