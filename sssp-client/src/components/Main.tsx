import React, {useEffect, useState} from 'react';
import {Route, BrowserRouter, Redirect, Switch} from "react-router-dom";
import {makeStyles, Theme} from "@material-ui/core/styles";
import 'fontsource-roboto';

import Bar from './Bar';
import Home from './Home';
import Menu from "./Menu";
import ServiceRouter from "./service/ServiceRouter";
import {useKeycloak} from "@react-keycloak/web";
import {KeycloakTokenParsed} from "keycloak-js";
import config from '../config';
import Admin from "./admin/Admin";

type TokenParsed = KeycloakTokenParsed & {
    preferred_username: string
}

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
    const [keycloak] = useKeycloak();
    const classes = useStyles();

    const [open, setOpen] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    if (keycloak.authenticated) {
        const parsed: TokenParsed = keycloak.tokenParsed as TokenParsed;
        if(parsed.preferred_username !== userId) setUserId(parsed.preferred_username);
        if(parsed.realm_access?.roles.includes(config.adminRole) !== isAdmin) setIsAdmin(parsed.realm_access?.roles.includes(config.adminRole) || false);
    }

    localStorage.setItem('userId', userId);
    localStorage.setItem('isAdmin', JSON.stringify(userId));

    if(userId === '') {
        return (
            <div>You have to be logged in!</div>
        );
    }

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
                    userId={userId}
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
                        { isAdmin &&
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