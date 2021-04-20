import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IngredientGridList from "./IngredientGridList";
import Ingredient from "../../models/Ingredient";

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
        console.log("HERE1 - " + ingredients)
        const ingres = ingredients.map((ingr) => new Ingredient(ingr.uuid, ingr.groupUuid, ingr.name, ingr.price, ingr.spicy, ingr.vegetarian, ingr.vegan, ingr.photoUrl))
        console.log("HERE2 - " + ingres)
        return <TabPanel value={value} index={index}>
            <IngredientGridList plusCallback={props.plusCallback} minusCallback={props.minusCallback} ingredients={ingres} />
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
                    {props.groups != null && props.groups.map((group,i)=>
                        <Tab className={classes.tab} label={group.label} {...a11yProps(i)} />
                    )}
                </Tabs>
            </AppBar>
            {props.groups != null && props.groups.map((group,i)=>
                {return props.ingredients != null ?  tabPanel(i,props.ingredients.filter(it=>it.groupName === group.name)) : ''}
            )}
        </div>
    );
}
