import React from 'react';
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
import deepOrange from "@material-ui/core/colors/deepOrange";
import {ShoppingBasket} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import Container from "@material-ui/core/Container";
import PizzaListItem from "./PizzaListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

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
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
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

/*
{groups !== null && groups.map((group) => (
                                        <ListItem key={group.name}>
                                            <Typography>{group.label}</Typography>
                                            <ListItemText className={classes.listItemText}
                                                          primary={group.name}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
 */

export default function BasketDialog(props) {
    const classes = useBasketStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let isPageWide700 = useMediaQuery('(min-width: 700px)');

    return (
        <div>
            <Button color={"inherit"} onClick={handleClickOpen} className={classes.basket}>
                {isPageWide700 ? <ShoppingBasket className={classes.basketIcon}/> : ''}
                    <Typography className={classes.howManyText} variant={"h5"}>
                        $34.06
                    </Typography>
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Basket
                </DialogTitle>
                <DialogContent dividers>
                    <List>
                        <PizzaListItem pizza={{name:"TOOOOOOOOP", photoUrl:"http://kingfisher.scene7.com/is/image/Kingfisher/5055013400359_01c"}}></PizzaListItem>
                        <PizzaListItem pizza={{name:"TOOOOOOOOP", photoUrl:"http://kingfisher.scene7.com/is/image/Kingfisher/5055013400359_01c"}}></PizzaListItem>
                        <PizzaListItem pizza={{name:"TOOOOOOOOP", photoUrl:"http://kingfisher.scene7.com/is/image/Kingfisher/5055013400359_01c"}}></PizzaListItem>
                    </List>
                    <Typography gutterBottom>
                        Total sum: 100$
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant={"outlined"} autoFocus onClick={handleClose} color="primary">
                        Go back to shopping
                    </Button>
                    <Button variant={"contained"} autoFocus href={"/checkout"} color="primary">
                        Go to checkout
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
