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
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {
    createGroup,
    deleteGroup,
    fetchAllGroups,
    selectGroups,
    selectStatus
} from "../../features/ingredients/Ingredients";
import {useDispatch, useSelector} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import {snack} from "../utils/CustomSnackBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import {isStatusLoading} from "../../utils/Utils";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '79vh',
        flexGrow: 1,
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
    const showSnack = (severity, text) => {
        setSnackSeverity(severity);
        setSnackText(text);
        setSnackOpen(true);
    }

    // Validation
    const [validGroupName, setValidGroupName] = useState(true);
    const [validGroupLabel, setValidGroupLabel] = useState(true);
    const validate = () => {
        const isValidName = groupName != "";
        setValidGroupName(isValidName);

        const isValidGroupLabel = groupLabel != "";
        setValidGroupLabel(isValidGroupLabel);

        return isValidName && isValidGroupLabel;
    }

    // State
    const [groupName, setGroupName] = useState('');
    const [groupLabel, setGroupLabel] = useState('🍉');

    const fetchGroups = () => {
        dispatch(fetchAllGroups());
    }

    const createNewGroup = () => {
        if (validate()) {
            dispatch(createGroup({
                uuid: "",
                name: groupName,
                label: groupLabel
            })).then(unwrapResult)
                .then(originalPromiseResult => {
                    console.log(originalPromiseResult)
                    showSnack("success", "Group successfully created !");
                })
                .catch(rejectedValueOrSerializedError => {
                    showSnack("error", "Something went wrong :/");
                    console.log(rejectedValueOrSerializedError)
                });
        }
    }

    useEffect(() => fetchGroups(), []);

    const dispatch = useDispatch();

    const groupsStatus = useSelector(selectStatus);

    const groups = useSelector(selectGroups);

    const deleteG = (group) => {
        dispatch(deleteGroup({
            uuid: group.uuid
        })).then(unwrapResult)
            .then(originalPromiseResult => {
                console.log(originalPromiseResult)
                dispatch(fetchAllGroups());
                showSnack("success", "Group successfully deleted !");
            })
            .catch(rejectedValueOrSerializedError => {
                showSnack("error", "Something went wrong :/");
                console.log(rejectedValueOrSerializedError)
            });
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <main>
                <Container className={classes.root} maxWidth="md">
                    <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                        Create New Group
                    </Typography>
                    {snack(snackOpen, setSnackOpen, snackSeverity, snackText)}
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
                                value={groupName}
                                autoFocus
                                onChange={e => setGroupName(e.target.value)}
                                helperText={
                                    groupName == "" ? "Group name is requires" : ""
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
                                name="name"
                                fullWidth
                                autoFocus
                                value={groupLabel}
                                onChange={e => setGroupLabel(e.target.value)}
                                helperText={
                                    groupLabel == "" ? "Group label is requires" : ""
                                }
                                error={!validGroupLabel}
                            />
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            // disabled={groupsStatus === "loading"}
                            onClick={event => createNewGroup()}
                        >
                            Create new group
                        </Button>
                    </Grid>
                    {groups === null || (groups.length === 0 && isStatusLoading(groupsStatus)) ?
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
                                {groups.map((group) => (
                                    <ListItem key={group.name}>
                                        <Typography>{group.label}</Typography>
                                        <ListItemText className={classes.listItemText}
                                                      primary={group.name}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete"
                                                        onClick={event => deleteG(group)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </Container>}
                </Container>
            </main>
            <Footer/>
        </React.Fragment>
    );
}
