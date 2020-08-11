import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
    GetSourcetypeQuery,
    SourcetypeInput,
    useGetSourcetypeLazyQuery,
    useUpdateSourcetypeMutation
} from '../../generated/graphql';
import {Button, Paper, Tab, Tabs, Grid} from "@material-ui/core";
import TabPanel from "../helper/TabPanel";
import SourcetypeRaw from "./SourcetypeRaw";
import SourcetypeAssistance from "./SourcetypeAssistance";
import {createStyles, makeStyles} from "@material-ui/styles";


type SourcetypeHelperParams = {
    serviceId: string,
    sourcetypeId: string
}

const useStyles = makeStyles(() =>
    createStyles({
        marginButton: {
            margin: 5
        }
    }),
);

const SourcetypeHelper: React.FC = () => {
    const {serviceId, sourcetypeId}: SourcetypeHelperParams = useParams();
    let history = useHistory();
    const classes = useStyles();

    const [tab, setTab] = React.useState(0);
    const [sourcetypeInput, setSourcetypeInput] = useState<SourcetypeInput>({
        name: '',
        fields: []
    });

    const [updateSourcetype] = useUpdateSourcetypeMutation();

    const [getSourcetype, {data, error, loading}] = useGetSourcetypeLazyQuery({
        variables: {
            serviceId: serviceId,
            sourcetypeId: sourcetypeId
        },
        onCompleted: (data: GetSourcetypeQuery) => {
            setSourcetypeInput({
                name: data.sourcetype.name,
                fields: data.sourcetype.fields
            })
        }
    });


    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    };

    const handleCancel = () => {
        history.push(`/service/details/${serviceId}`);
    }

    const handleSubmit = () => {
        updateSourcetype({
            variables: {
                serviceId: serviceId,
                sourcetypeId: sourcetypeId,
                sourcetypeInput: sourcetypeInput
            }
        }).then(() => {
            history.push(`/service/details/${serviceId}`)
        });
    }

    useEffect(()=> {
        getSourcetype();
    },[])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    return (
        <div>
            <Paper square>
                <Grid container justify="space-between">
                    <Grid item >
                        <Tabs
                            value={tab}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleTabChange}
                        >
                            <Tab label="Assistance" />
                            <Tab label="Raw" />
                        </Tabs>
                    </Grid>
                    <Grid item >
                        <Button
                            variant='contained'
                            className={classes.marginButton}
                            onClick={() => handleCancel()}
                        >Cancel</Button>
                        <Button
                            variant='contained'
                            color='primary'
                            className={classes.marginButton}
                            onClick={() => handleSubmit()}
                        >Submit</Button>
                    </Grid>
                </Grid>
            </Paper>
            <form autoComplete='off' onSubmit={() => handleSubmit()}>
            <TabPanel index={0} tab={tab}>
                <SourcetypeAssistance sourcetypeInput={sourcetypeInput} />
            </TabPanel>
            <TabPanel index={1} tab={tab}>
                <SourcetypeRaw sourcetypeInput={sourcetypeInput} />
            </TabPanel>
            </form>
        </div>
    );
}

export default SourcetypeHelper;