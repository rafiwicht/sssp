/**
 *  Bar for react
 */
import React, {useState} from 'react';
import clsx from 'clsx';
import {AppBar, Button, IconButton, Theme, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';

import {Menu} from './Menu';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
}));

export const Bar: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const classes = useStyles();
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Splunk Self Service Portal
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
            <Menu
                open={open}
                handleDrawerClose={handleDrawerClose}/>
        </AppBar>
    );
}