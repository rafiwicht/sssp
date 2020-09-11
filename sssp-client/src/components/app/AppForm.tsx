import React, {useState} from 'react';
import {Button, TableCell, TableRow, TextField, Checkbox, MenuItem} from "@material-ui/core";
import {App, AppInput, MutationPutAppArgs, usePutAppMutation, GetAppsDocument} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";
import EnvironmentInput from '../helper/EnvironmentInput';
import config from '../../config';


type AppFormProps = {
    serviceId: string,
    resetInput: () => void,
    appMod?: App
}

const useStyles = makeStyles(() =>
    createStyles({
        margin: {
            marginTop: 5,
            marginBottom: 5,
            marginRight: 5
        },
        marginLeft: {
            marginLeft: 5
        }
    }),
);

const AppForm: React.FunctionComponent<AppFormProps> = ({serviceId, resetInput, appMod}: AppFormProps) => {
    const [appType, setAppType] = useState<string>('TA');
    const [state, setState] = useState<MutationPutAppArgs>({
        appId: appMod?._id || '',
        appInput: {
            serviceId: appMod?.serviceId || serviceId,
            version: appMod?.version || 'latest',
            url: appMod?.url || 'in creation',
            git: (appMod?.git === undefined || appMod?.git === null) ? true : appMod?.git,
            environmentIds: appMod?.environmentIds || []
        }
    });
    const classes = useStyles();

    const [putApp] = usePutAppMutation({
        refetchQueries: [{query: GetAppsDocument, variables: {serviceId: serviceId}}]
    })

    const handleIdChange = (event: any) => {
        setState({
            ...state,
            appId: event.target.value
        });
    };

    const handleChange = (prop: keyof AppInput) => (event: any) => {
        // Value returns always string
        let value;
        if(event.target.type === 'checkbox') {
            value = Boolean(event.target.checked);
        }
        else {
            value = event.target.value;
        }

        const appInput = {
            ...state.appInput, 
            [prop]: value
        };
        console.log()
        if(prop === 'git' && value) {
            appInput.url = 'in creation';
        }

        setState({
            ...state,
            appInput: appInput
        });
    };

    const handleSumbit = () => {
        reset();
        putApp({
            variables: {
                ...state,
                appId: state.appInput.git ? `${appType}-${config.firm}-${state.appId}` : state.appId
            }
        });
    };

    const reset = () => {
        resetInput();
        setState({
            appId: '',
            appInput: {
                serviceId: serviceId,
                version: 'latest',
                url: 'in creation',
                git: true,
                environmentIds: []
            }
        });
    }

    return (
        <TableRow>
            <TableCell>
                {state.appInput.git === true && `${appType}-${config.firm}-`}
                <TextField
                    id='_id'
                    type='text'
                    required
                    value={state.appId}
                    disabled={appMod !== undefined}
                    onChange={handleIdChange}
                />
                {state.appInput.git === true && 
                    <TextField
                        id="appType"
                        select
                        className={classes.marginLeft}
                        value={appType}
                        onChange={(event) => {
                            setAppType(event.target.value);
                          }}
                    >
                        <MenuItem value='TA'>TA</MenuItem>
                        <MenuItem value='UI'>UI</MenuItem>
                        <MenuItem value='FA'>FA</MenuItem>
                        <MenuItem value='SA'>SA</MenuItem>
                    </TextField>
                }
            </TableCell>
            <TableCell align='right'>{appMod === undefined ? '' : appMod.state}</TableCell>
            <TableCell align='right'>
                <TextField
                    id='url'
                    type='text'
                    required
                    fullWidth
                    value={state.appInput.url}
                    disabled={state.appInput.git || false}
                    onChange={handleChange('url')}
                />
            </TableCell>
            <TableCell align='right'>
                <TextField
                    id='version'
                    type='text'
                    required
                    fullWidth
                    value={state.appInput.version}
                    onChange={handleChange('version')}
                />
            </TableCell>
            <TableCell align='right'>
                <Checkbox
                    id='git'
                    required
                    checked={(state.appInput.git === undefined || state.appInput.git === null) ? true : state.appInput.git }
                    onChange={handleChange('git')}
                />
            </TableCell>
            <EnvironmentInput handleChange={handleChange} environmentIds={state.appInput.environmentIds || []} />
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
                    disabled={state.appId === '' || state.appInput.version === ''}
                >Submit</Button>
            </TableCell>
        </TableRow>
    );
}

export default AppForm;