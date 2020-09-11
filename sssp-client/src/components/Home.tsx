/**
 *  Home screen of the frontend
 */
import { Typography, Grid, Paper, Link, Divider, Button, Box } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() =>({
    paper: {
        padding: 10,
        height: 150
    },
    box: {
        height: 80
    }
}));

const Home: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div>
            <Typography variant='h5'>Splunk Self Service Portal</Typography>
            <Grid container  spacing={2}>
                <Grid item md={4}>
                    <Paper className={classes.paper}>
                    <Typography variant='h6'>Introduction</Typography>
                    <Divider />
                    <Typography>This is the Splunk Self Service Portal. It is an open source software. You can find more information on&nbsp;
                        <Link href='https://github.com/rafiwicht/sssp' color='primary'>
                            Github 
                        </Link>
                        &nbsp;or in the official&nbsp;
                        <Link href='https://rafiwicht.github.io/sssp/' color='primary'>
                            documentation 
                        </Link>
                        &nbsp;.
                    </Typography>
                    </Paper>
                </Grid>
                <Grid item md={4}>
                    <Paper className={classes.paper}>
                    <Typography variant='h6'>Service</Typography>
                    <Divider />
                    <Typography>To manage your service go to the service page.</Typography>
                    <Box className={classes.box} display='flex' justifyContent='flex-end' alignItems='flex-end' >
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => history.push('/service')}
                    >Service</Button>

                    </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;