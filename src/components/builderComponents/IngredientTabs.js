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
        maxWidth:150,
        width: '20%', // a number of your choice
    }
}));

const cards = [
    {
        'name' : 'Cheddare',
        'title' : 'Chesee cheese',
        'howMany': 0
    },
    {
        'name' : 'Cheddare',
        'title' : 'Chesee cheese',
        'howMany': 0
    },
    {
        'name' : 'Cheddare',
        'title' : 'Chesee cheese',
        'howMany': 0
    },
    {
        'name' : 'Cheddare',
        'title' : 'Chesee cheese',
        'howMany': 0
    },
    {
        'name' : 'Cheddare',
        'title' : 'Chesee cheese',
        'howMany': 0
    },
    {
        'name' : 'Cheddare',
        'title' : 'Chesee cheese',
        'howMany': 0
    },
    {
        'name' : 'Cheddare',
        'title' : 'Chesee cheese',
        'howMany': 0
    },
    {
        'name' : 'Cheddare',
        'title' : 'Chesee cheese',
        'howMany': 0
    },
    {
        'name' : 'Cheddare',
        'title' : 'Chesee cheese',
        'howMany': 0
    },
    {
        'name' : 'Cheddare',
        'title' : 'Chesee cheese',
        'howMany': 0
    },
    {
        'name' : 'Cheddare',
        'title' : 'Chesee cheese',
        'howMany': 0
    },
    {
        'name' : 'Cheddare',
        'title' : 'Chesee cheese',
        'howMany': 0
    },
];

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
            <TabPanel value={value} index={0}>
                <IngredientGridList ingredients={cards} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <IngredientGridList ingredients={cards} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <IngredientGridList ingredients={cards} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <IngredientGridList ingredients={cards} />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <IngredientGridList ingredients={cards} />
            </TabPanel>
        </div>
    );
}

/*
<Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                            <IngredientCard name={card} description={card}/>
                        </Grid>
                    ))}
                </Grid>
 */
