import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Header from "../Header";
import Footer from "../Footer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from '@material-ui/icons/Delete';
import {createGroup, fetchAllGroups, selectGroups, selectStatus} from "../../features/ingredients/Ingredients";
import {useDispatch, useSelector} from "react-redux";
import PizzaCard from "../cards/PizzaCard";
import {unwrapResult} from "@reduxjs/toolkit";
import {snack} from "../utils/CustomSnackBar";
import {validateEmail} from "../utils/Validation";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '79vh',
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    listGroups: {
        alignContent: "center",
        justifyContent: "center",
        marginTop: 20
    },
    listItemText: {
        marginLeft: 20,
        marginRight: 20
    }
}));

export default function AdminIngredientGroups() {
    const classes = useStyles();

    // SnackBar
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [snackSeverity, setSnackSeverity] = React.useState('success');
    const [snackText, setSnackText] = React.useState('Mellon');
    const showSnack = (severity, text) =>{
        setSnackSeverity(severity);
        setSnackText(text);
        setSnackOpen(true);
    }

    // Validation
    const [validGroupName, setValidGroupName] = useState(true);
    const validate = () =>{
        const isValidName = groupName != "";
        setValidGroupName(isValidName);

        return isValidName;
    }
    //

    const [groupName, setGroupName] = useState('');
    const [groupLabel, setGroupLabel] = useState('');

    const fetchGroups = () =>{
        console.log("fetch")
        dispatch(fetchAllGroups());
    }

    const createNewGroup = () =>{
        if(validate()){
            dispatch(createGroup({
                uuid : "",
                name: groupName
            })).then(unwrapResult)
                .then(originalPromiseResult => {
                    console.log(originalPromiseResult)
                    showSnack("success","Group successfullt created !");
                })
                .catch(rejectedValueOrSerializedError => {
                    showSnack("error","Something went wrong :/");
                    console.log(rejectedValueOrSerializedError)
                });
        }
    }

    useEffect(()=>fetchGroups(), []);

    const dispatch = useDispatch();

    const groupsStatus = useSelector(selectStatus);

    const groups = useSelector(selectGroups);

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <main>
                <Container className={classes.root} maxWidth="md">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Create new group
                    </Typography>
                    {snack(snackOpen,setSnackOpen,snackSeverity,snackText)}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={10}>
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                id="name"
                                label="Group name"
                                name="name"
                                fullWidth
                                autoFocus
                                onChange={e => setGroupName(e.target.value)}
                                helperText={
                                    groupName == "" ? "Group name is requires":""
                                }
                                error={!validGroupName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={2}>
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                id="name"
                                label="Group label"
                                defaultValue="melon"
                                name="name"
                                fullWidth
                                autoFocus
                                onChange={e => setGroupLabel(e.target.value)}
                            />
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={event => createNewGroup()}
                        >
                            Create new group
                        </Button>
                    </Grid>
                    <Container className={classes.listGroups}>
                        <Grid container>
                            <div>
                                <List>
                                    {groups !== null && groups.map((group) => (
                                        <ListItem key={group.name}>
                                            <Typography>🍉</Typography>
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
                                </List>
                            </div>
                        </Grid>
                    </Container>
                </Container>
            </main>
            {/* Footer */}
            <Footer/>
            {/* End footer */}
        </React.Fragment>
    );
}

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}
