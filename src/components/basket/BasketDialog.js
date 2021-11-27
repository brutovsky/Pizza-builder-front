import React, {useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {ShoppingBasket} from "@material-ui/icons";
import List from "@material-ui/core/List";
import PizzaListItem from "./PizzaListItem";
import {useDispatch, useSelector} from "react-redux";
import {selectPatterns, fetchCart} from "../../features/basket/basketSlice";
import Tooltip from "@material-ui/core/Tooltip";
import {selectUser} from "../../features/auth/Auth";
import {Link} from "react-router-dom";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const useBasketStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    basketIcon: {
        paddingRight: 5
    },
    basket: {
        minWidth: 80,
        marginRight: theme.spacing(2),
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: '#FFF'
        }
    },
}));


const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function BasketDialog(props) {
    const classes = useBasketStyles();

    useEffect(() => dispatch(fetchCart()), []);

    const dispatch = useDispatch()
    const patterns = useSelector(selectPatterns)
    const user = useSelector(selectUser)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const totalSum = () => {
        return Number(patterns.reduce((a, b) => (a + b.price), 0)).toFixed(2);
    }

    let isPageWide700 = useMediaQuery('(min-width: 700px)');

    return (
        <div>
            {user != null &&
            <Tooltip title={(patterns != null ? patterns.length : 0) + " items in the basket"}>
                <Button color={"inherit"} onClick={handleClickOpen} className={classes.basket}>
                    {isPageWide700 ? <ShoppingBasket className={classes.basketIcon}/> : ''}
                    <Typography className={classes.howManyText} variant={"h5"}>
                        {patterns != null ? totalSum() : 0}$
                    </Typography>
                </Button>
            </Tooltip>}
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Basket
                </DialogTitle>
                <DialogContent dividers>
                    <List>
                        {patterns != null && patterns.map(p =>
                            <PizzaListItem key={p.name} pizza={{
                                uuid: p.patternUuid,
                                name: p.name,
                                quantity: p.quantity,
                                price: p.price,
                                size: p.size,
                                photoUrl: p.photoUrl
                            }}
                            />
                        )}
                    </List>
                    <Typography gutterBottom>
                        Total sum: {patterns != null ? totalSum() : 0}$
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant={"outlined"} autoFocus onClick={handleClose} color="primary">
                        Go back to shopping
                    </Button>
                    <Link autoFocus color="primary" to={"/checkout"}>
                        <Button variant={"contained"} color="primary">
                            Go to checkout
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
}
