/**
 *  Menue for react
 */
import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {IconButton, Theme} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
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
    handleDrawerClose: (value: boolean) => void
}

export const Menu: React.FunctionComponent<MenuProps> = ({open, handleDrawerClose}: MenuProps) => {
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
            }}
            open={open}
        >
        </Drawer>
    );
}