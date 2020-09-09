import React, {useState} from 'react';
import {Button, MenuItem, TableCell, TableRow, TextField} from "@material-ui/core";
import {Syslog, SyslogInput, MutationPutSyslogArgs, usePutSyslogMutation, GetSyslogsDocument, Protocol} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";
import EnvironmentInput from '../helper/EnvironmentInput';
import HostsInput from '../helper/HostsInput';
import IndexInput from '../helper/IndexInput';


type SyslogFormProps = {
    serviceId: string,
    resetInput: () => void,
    syslogMod?: Syslog
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

const syslogForm: React.FunctionComponent<SyslogFormProps> = ({serviceId, resetInput, syslogMod}: SyslogFormProps) => {
    const [state, setState] = useState<MutationPutSyslogArgs>({
        syslogId: syslogMod?._id || '',
        syslogInput: {
            serviceId: syslogMod?.serviceId || serviceId,
            index: syslogMod?.index || '',
            sourcetype: syslogMod?.sourcetype || '',
            port: syslogMod?.port || 514,
            protocol: syslogMod?.protocol || Protocol.Udp,
            hosts: syslogMod?.hosts || [],
            environmentIds: syslogMod?.environmentIds || []
        }
    });
    const classes = useStyles();

    const [putsyslog] = usePutSyslogMutation({
        refetchQueries: [{query: GetSyslogsDocument, variables: {serviceId: serviceId}}]
    })

    const handleIdChange = (event: any) => {
        setState({
            ...state,
            syslogId: event.target.value
        });
    };

    const handleChange = (prop: keyof SyslogInput) => (event: any) => {
        let value;
        if(event.target.type === 'number') {
            value = Number(event.target.value);
        }
        else {
            value = event.target.value;
        }
        setState({
            ...state,
            syslogInput: {
                ...state.syslogInput, 
                [prop]: value
            }
        });
    };

    const handleHostsChange = (hosts: Array<string>) => {
        setState({
            ...state,
            syslogInput: {
                ...state.syslogInput, 
                hosts: hosts
            }
        });
    };

    const handleSumbit = () => {
        reset();
        putsyslog({
            variables: state
        });
    };

    const reset = () => {
        resetInput();
        setState({
            syslogId: '',
            syslogInput: {
                serviceId: serviceId,
                index: '',
                sourcetype: '',
                port: 514,
                protocol: Protocol.Udp,
                hosts: [],
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
                    value={state.syslogId}
                    disabled={syslogMod !== undefined}
                    onChange={handleIdChange}
                />
            </TableCell>
            <TableCell align='right'>{syslogMod === undefined ? '' : syslogMod.state}</TableCell>
            <IndexInput index={state.syslogInput.index} serviceId={serviceId} handleChange={handleChange}/>
            <TableCell align='right'>
                <TextField
                    id='sourcetype'
                    type='text'
                    required
                    fullWidth
                    value={state.syslogInput.sourcetype}
                    onChange={handleChange('sourcetype')}
                />
            </TableCell>
            <TableCell align='right'>
                <TextField
                    id='port'
                    type='number'
                    required
                    fullWidth
                    value={state.syslogInput.port}
                    onChange={handleChange('sourcetype')}
                />
            </TableCell>
            <TableCell align='right'>
                <TextField
                    id="protocol"
                    select
                    fullWidth
                    value={state.syslogInput.protocol}
                    onChange={handleChange('protocol')}
                >
                    <MenuItem value={Protocol.Udp}>UDP</MenuItem>
                    <MenuItem value={Protocol.Tcp}>TCP</MenuItem>
                </TextField>
            </TableCell>
            <HostsInput hosts={state.syslogInput.hosts || []} handleHostsChange={handleHostsChange} />
            <EnvironmentInput handleChange={handleChange} environmentIds={state.syslogInput.environmentIds || []} />
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
                    disabled={state.syslogId === '' || state.syslogInput.index === '' || state.syslogInput.sourcetype === ''}
                >Submit</Button>
            </TableCell>
        </TableRow>
    );
}

export default syslogForm;