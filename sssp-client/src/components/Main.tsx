import React, {useState} from 'react';
import {Route, BrowserRouter, Redirect, Switch} from "react-router-dom";

import Bar from './Bar';
import Home from './Home';
import Menu from "./Menu";
import {makeStyles, Theme} from "@material-ui/core/styles";
import Service from "./service/Service";

import 'fontsource-roboto';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        padding: 10
    }
}));


const Main: React.FC = () => {
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (

        <BrowserRouter>
            <div className={classes.root}>
                <Bar
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                />
                <Menu
                    open={open}
                    handleDrawerClose={handleDrawerClose}/>
                <div className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Switch>
                        <Route
                            path='/home'
                            component={Home} />
                        <Route
                            path='/service'
                            component={Service} />
                        <Route
                            path='/'
                            exact>
                            <Redirect to={'/home'} />
                        </Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default Main;