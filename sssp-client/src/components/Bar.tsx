import React from 'react';
import clsx from 'clsx';
import { AppBar, Grid, IconButton, Theme, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import visualization from "../config/visualization";

const useStyles = makeStyles((theme: Theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: visualization.drawerWidth,
        width: `calc(100% - ${visualization.drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

type BarProps = {
    open: boolean,
    handleDrawerOpen: () => void,
    userId: string
}

/**
 * AppBar with username and drawer opener
 * @param BarProps 
 */
const Bar: React.FunctionComponent<BarProps> = ({ open, handleDrawerOpen, userId }: BarProps) => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                        <MenuIcon />
                    </IconButton>
                    <Grid justify="space-between" container >
                        <Grid item>
                            <Typography variant="h6" className={classes.title}>
                                Splunk Self Service Portal
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.title}>
                                Welcome, {userId}
                            </Typography>
                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>
        </div>

    );
}
export default Bar;