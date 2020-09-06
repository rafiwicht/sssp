import React from 'react';
import {Paper, Tab, Tabs} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Environment from "../environment/Environment";


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
                    <Tab label="Environments" />
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                <Environment />
            </TabPanel>
        </div>

    )
}

type TabPanelProps = {
    children?: React.ReactNode,
    index: any,
    value: any,
}

const TabPanel = ({children, index, value}: TabPanelProps) => {

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

export default Admin;