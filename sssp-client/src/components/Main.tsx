import React, {useState} from 'react';
import {Route, BrowserRouter, Redirect, Switch} from "react-router-dom";
import {makeStyles, Theme} from "@material-ui/core/styles";
import 'fontsource-roboto';

import Bar from './Bar';
import Home from './Home';
import Menu from "./Menu";
import ServiceRouter from "./service/ServiceRouter";
import Admin from "./admin/Admin";
import {useKeycloak} from "@react-keycloak/web";
import useAdmin from "../hooks/useAdmin";

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
    const [keycloak] = useKeycloak();
    const admin = useAdmin();

    const classes = useStyles();

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    if(!keycloak.authenticated) {
        return (
            <div>You have to be logged in!</div>
        );
    }

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
                        <Route path='/home' >
                            <Home />
                        </Route>
                        <Route path='/service'>
                            <ServiceRouter />
                        </Route>
                        { admin &&
                            <Route path='/admin'>
                                <Admin />
                            </Route>
                        }
                        <Route path='/' exact>
                            <Redirect to={'/home'} />
                        </Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default Main;