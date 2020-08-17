import React, {useEffect, useState} from 'react';
import {Route, BrowserRouter, Redirect, Switch} from "react-router-dom";
import {makeStyles, Theme} from "@material-ui/core/styles";
import 'fontsource-roboto';

import Bar from './Bar';
import Home from './Home';
import Menu from "./Menu";
import ServiceRouter from "./service/ServiceRouter";
import Admin from "./admin/Admin";
import {useKeycloak} from "@react-keycloak/web";
import {useIsAdminLazyQuery, useIsAdminQuery} from "../generated/graphql";
import {KeycloakTokenParsed} from "keycloak-js";

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
    const [open, setOpen] = useState(false);
    const [keycloak] = useKeycloak();

    const classes = useStyles();

    const [userId, setUserId] = useState<string>("");

    const [isAdmin, {data, loading, error}] = useIsAdminLazyQuery();

    useEffect(() => {
        if (keycloak.authenticated) {
            const parsed: TokenParsed = keycloak.tokenParsed as TokenParsed;
            setUserId(parsed.preferred_username);



            isAdmin({
                variables: {
                    userId: parsed.preferred_username
                }
            })
        }
    }, [keycloak.authenticated]);

    localStorage.setItem('userId', userId);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
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
                    admin={data.admin}
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
                        {data.admin &&
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