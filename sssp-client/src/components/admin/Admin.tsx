import React from 'react';
import {Paper, Tab, Tabs} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Environment from "../environment/Environment";
import TabPanel from '../helper/TabPanel';
import Workflow from '../workflow/Workflow';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});
const Admin: React.FC = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Change requests" />
                    <Tab label="Environments" />
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                <Workflow />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Environment />
            </TabPanel>
        </div>

    )
}

export default Admin;