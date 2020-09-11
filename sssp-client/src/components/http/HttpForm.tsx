import React, {useState} from 'react';
import {Button, TableCell, TableRow, TextField} from "@material-ui/core";
import {Http, HttpInput, MutationPutHttpArgs, usePutHttpMutation, GetHttpsDocument} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";
import EnvironmentInput from '../helper/EnvironmentInput';
import { IconButton } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import RefreshIcon from '@material-ui/icons/Refresh';


type HttpFormProps = {
    serviceId: string,
    resetInput: () => void,
    httpMod?: Http
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
 * Form used to create and edit http inputs
 * @param HttpFormProps 
 */
const httpForm: React.FunctionComponent<HttpFormProps> = ({serviceId, resetInput, httpMod}: HttpFormProps) => {
    const [state, setState] = useState<MutationPutHttpArgs>({
        httpId: httpMod?._id || '',
        httpInput: {
            serviceId: serviceId,
            token: httpMod?.token || '',
            environmentIds: httpMod?.environmentIds || []
        }
    });
    const classes = useStyles();

    const [putHttp] = usePutHttpMutation({
        refetchQueries: [{query: GetHttpsDocument, variables: {serviceId: serviceId}}]
    })

    const handleIdChange = (event: any) => {
        setState({
            ...state,
            httpId: event.target.value
        });
    };

    const handleChange = (prop: keyof HttpInput) => (event: any) => {
        setState({
            ...state,
            httpInput: {
                ...state.httpInput, 
                [prop]: event.target.value
            }
        });
    };

    const handleSumbit = () => {
        reset();
        putHttp({
            variables: state
        });
    };

    const reset = () => {
        resetInput();
        setState({
            httpId: '',
            httpInput: {
                serviceId: serviceId,
                token: '',
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
                    value={state.httpId}
                    disabled={httpMod !== undefined}
                    onChange={handleIdChange}
                />
            </TableCell>
            <TableCell align='right'>{httpMod === undefined ? '' : httpMod.state}</TableCell>
            <TableCell align='right'>
                <TextField
                    id='token'
                    type='text'
                    required
                    style = {{width: 400}}
                    value={state.httpInput.token}
                    onChange={handleChange('token')}
                />
                <IconButton
                    color='primary'
                    // Creates a new UUIDv4 for the http input
                    onClick={() => setState({
                        ...state,
                        httpInput: {
                            ...state.httpInput, 
                            token: uuidv4()
                        }
                    })}
                >
                    <RefreshIcon />
                </IconButton>
            </TableCell>
            <EnvironmentInput handleChange={handleChange} environmentIds={state.httpInput.environmentIds || []} />
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
                    disabled={state.httpId === '' || state.httpInput.token === ''}
                >Submit</Button>
            </TableCell>
        </TableRow>
    );
}

export default httpForm;