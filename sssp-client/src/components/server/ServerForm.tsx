import React, {useState} from 'react';
import {Button, TableCell, TableRow, TextField} from "@material-ui/core";
import {Server, ServerInput, MutationPutServerArgs, usePutServerMutation, GetServersDocument} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";
import EnvironmentInput from '../helper/EnvironmentInput';
import AppsInput from '../helper/AppsInput';
import HostsInput from '../helper/HostsInput';

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

/**
 * Form used to create and edit server/deploymentserver inputs
 * @param ServerFormProps 
 */
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
        refetchQueries: [{query: GetServersDocument, variables: {serviceId: serviceId}}]
    })

    const handleIdChange = (event: any) => {
        setState({
            ...state,
            serverId: event.target.value
        });
    };

    const handleChange = (prop: keyof ServerInput) => (event: any) => {
        // Value returns always string
        setState({
            ...state,
            serverInput: {
                ...state.serverInput, 
                [prop]: event.target.value
            }
        });
    };

    const handleHostsChange = (hosts: Array<string>) => {
        setState({
            ...state,
            serverInput: {
                ...state.serverInput, 
                hosts: hosts
            }
        });
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
                    fullWidth
                    value={state.serverId}
                    disabled={serverMod !== undefined}
                    onChange={handleIdChange}
                />
            </TableCell>
            <TableCell align='right'>{serverMod === undefined ? '' : serverMod.state}</TableCell>
            <HostsInput hosts={state.serverInput.hosts || []} handleHostsChange={handleHostsChange} />
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