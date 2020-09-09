import React, {useState} from 'react';
import {Button, TableCell, TableRow, TextField} from "@material-ui/core";
import {Server, ServerInput, MutationPutServerArgs, usePutServerMutation, GetServersDocument} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";
import EnvironmentInput from '../helper/EnvironmentInput';
import AppsInput from './AppsInput';


type ServerFormProps = {
    serviceId: string,
    resetInput: () => void,
    serverMod?: Server
}

const useStyles = makeStyles(() =>
    createStyles({
        margin: {
            marginTop: 5,
            marginBottom: 5,
            marginRight: 5
        }
    }),
);

const ServerForm: React.FunctionComponent<ServerFormProps> = ({serviceId, resetInput, serverMod}: ServerFormProps) => {
    const [state, setState] = useState<MutationPutServerArgs>({
        serverId: serverMod?._id || '',
        serverInput: {
            serviceId: serverMod?.serviceId || serviceId,
            hosts: serverMod?.hosts || [],
            appIds: serverMod?.appIds || [],
            environmentIds: serverMod?.environmentIds || []
        }
    });
    const classes = useStyles();

    const [putServer] = usePutServerMutation({
        refetchQueries: [{query: GetServersDocument}]
    })

    const handleIdChange = (event: any) => {
        setState({
            ...state,
            serverId: event.target.value
        });
    };

    const handleChange = (prop: keyof ServerInput) => (event: any) => {
        // Value returns always string
        let value;
        if(event.target.type === 'checkbox') {
            value = Boolean(event.target.checked);
        }
        else {
            value = event.target.value;
        }
        setState({
            ...state,
            serverInput: {
                ...state.serverInput, 
                [prop]: value
            }
        });
    };

    const handleHostsChange = (event: any) => {
        console.log(event.target.value);
    };

    const handleSumbit = () => {
        reset();
        putServer({
            variables: state
        });
    };

    const reset = () => {
        resetInput();
        setState({
            serverId: '',
            serverInput: {
                serviceId: serviceId,
                hosts: [],
                appIds: [],
                environmentIds: []
            }
        });
    }

    return (
        <TableRow>
            <TableCell>
                <TextField
                    id='_id'
                    type='text'
                    required
                    value={state.serverId}
                    disabled={serverMod !== undefined}
                    onChange={handleIdChange}
                />
            </TableCell>
            <TableCell align='right'>{serverMod === undefined ? '' : serverMod.state}</TableCell>
            <TableCell>
                <TextField
                    id='hosts'
                    type='text'
                    required
                    multiline
                    onChange={handleHostsChange}
                />
            </TableCell>
            <AppsInput serviceId={serviceId} handleChange={handleChange} appIds={state.serverInput.appIds || []} />
            <EnvironmentInput handleChange={handleChange} environmentIds={state.serverInput.environmentIds || []} />
            <TableCell align='right'>
                <Button
                    variant='contained'
                    className={classes.margin}
                    onClick={() => reset()}
                >Cancel</Button>
                <Button
                    variant='contained'
                    color='primary'
                    className={classes.margin}
                    onClick={() => handleSumbit()}
                    disabled={state.serverId === ''}
                >Submit</Button>
            </TableCell>
        </TableRow>
    );
}

export default ServerForm;