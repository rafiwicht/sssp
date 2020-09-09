import React, {useState} from 'react';
import {Button, TableCell, TableRow, TextField, Checkbox} from "@material-ui/core";
import {App, AppInput, MutationPutAppArgs, usePutAppMutation, GetAppsDocument} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";
import EnvironmentInput from '../helper/EnvironmentInput';


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
        }
    }),
);

const AppForm: React.FunctionComponent<AppFormProps> = ({serviceId, resetInput, appMod}: AppFormProps) => {
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
            console.log(event.target.checked);
        }
        else {
            value = event.target.value;
        }
        setState({
            ...state,
            appInput: {
                ...state.appInput, 
                [prop]: value
            }
        });
    };

    const handleSumbit = () => {
        reset();
        putApp({
            variables: state
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
                <TextField
                    id='_id'
                    type='text'
                    required
                    fullWidth
                    value={state.appId}
                    disabled={appMod !== undefined}
                    onChange={handleIdChange}
                />
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