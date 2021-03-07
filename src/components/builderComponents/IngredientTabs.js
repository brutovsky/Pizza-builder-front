import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import IngredientCard from "./IngredientCard";
import IngredientGridList from "./IngredientGridList";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={0}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tab: {
        minWidth: 40, // a number of your choice
        maxWidth: 150,
        width: '20%', // a number of your choice
    }
}));

export default function IngredientGroupTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabPanel = (index, ingredients) => {
        return <TabPanel value={value} index={index}>
            <IngredientGridList plusCallback={props.plusCallback} minusCallback={props.minusCallback} ingredients={ingredients} />
        </TabPanel>
    }

    return (
        <div className={classes.root}>
            <AppBar position="static"
                    value={value}
                    variant="fullWidth"
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered>
                <Tabs value={value} onChange={handleChange}>
                    <Tab className={classes.tab} label="🧀" {...a11yProps(0)} />
                    <Tab className={classes.tab} label="🍖" {...a11yProps(1)} />
                    <Tab className={classes.tab} label="🍅" {...a11yProps(2)} />
                    <Tab className={classes.tab} label="🥣" {...a11yProps(3)} />
                    <Tab className={classes.tab} label="🍞" {...a11yProps(4)} />
                </Tabs>
            </AppBar>
            {tabPanel(0,props.ingredients.filter((it) => it.group === 'cheese'))}
            {tabPanel(1,props.ingredients.filter((it) => it.group === 'meat'))}
            {tabPanel(2,props.ingredients.filter((it) => it.group === 'vegetables'))}
            {tabPanel(3,props.ingredients.filter((it) => it.group === 'sauce'))}
            {tabPanel(4,props.ingredients.filter((it) => it.group === 'side'))}
        </div>
    );
}
