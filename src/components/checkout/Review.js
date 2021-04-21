import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import PizzaListItem from "../basket/PizzaListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const products = [
    {name: 'Product 1', desc: 'A nice thing', price: '$9.99'},
    {name: 'Product 2', desc: 'Another thing', price: '$3.45'},
    {name: 'Product 3', desc: 'Something else', price: '$6.51'},
    {name: 'Product 4', desc: 'Best thing of all', price: '$14.11'},
    {name: 'Shipping', desc: '', price: 'Free'},
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    {name: 'Card type', detail: 'Visa'},
    {name: 'Card holder', detail: 'Mr John Smith'},
    {name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234'},
    {name: 'Expiry date', detail: '04/2024'},
];

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Review(props) {
    const classes = useStyles();

    const totalSum = () =>{
        return Number(props.patterns.reduce((a,b)=>(a+b.price),0)).toFixed(2);
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {props.patterns != null && props.patterns.map(pizza =>
                    <ListItem className={classes.listItem} key={pizza.name}>
                        <ListItemAvatar>
                            <Avatar>
                                <img className={classes.ingrImage} src={pizza.photoUrl}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText fullWidth
                                      className={classes.itemText}
                                      primary={pizza.name}
                                      secondary={(pizza.size) + 'size X ' + pizza.quantity + ' = ' + pizza.price}
                        />
                    </ListItem>
                )}
                {/*products.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={product.name} secondary={product.desc}/>
                        <Typography variant="body2">{product.price}</Typography>
                    </ListItem>
                ))*/}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1" className={classes.total}>
                        ${props.patterns != null ? totalSum() : 0}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>Recipient: {props.address.name}</Typography>
                    <Typography gutterBottom>City: {props.address.city}</Typography>
                    <Typography gutterBottom>Street: {props.address.street}</Typography>
                    <Typography gutterBottom>Build: {props.address.build}</Typography>
                    <Typography gutterBottom>Flat: {props.address.flat}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        Payment details: cash payment
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
