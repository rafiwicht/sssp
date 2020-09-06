/**
 *  Menue for react
 */
import React from 'react';
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles";
import {IconButton, Theme, Drawer, Divider} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import MenuListItem from "./MenuListItem";
import visualization from "../config/visualization";


const useStyles = makeStyles((theme: Theme) => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: visualization.drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    }
}));

type MenuProps = {
    open: boolean,
    handleDrawerClose: () => void
}


const test = [
    {
        text: 'Home',
        subpage: '/home',
        adminOnly: false,
        icon: (<HomeIcon />)
    },
    {
        text: 'Service',
        subpage: '/service',
        adminOnly: false,
        icon: (<RoomServiceIcon />)
    },
    {
        text: 'Admin',
        subpage: '/admin',
        adminOnly: true,
        icon: (<SupervisorAccountIcon />)
    }]

const Menu: React.FunctionComponent<MenuProps> = ({open, handleDrawerClose}: MenuProps) => {
    const classes = useStyles();

    const admin: boolean = JSON.parse(localStorage.getItem('isAdmin') || '');

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
            }}
            open={open}>
            <div className={classes.toolbarIcon}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerClose}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            {test.map((value, index) => {
                if(admin || !value.adminOnly) {
                    return (<MenuListItem {...value} key={index}/>);
                }

            })}
        </Drawer>
    );
}

export default Menu;