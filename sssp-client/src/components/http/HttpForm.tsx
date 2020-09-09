import React, {useState} from 'react';
import {Button, TableCell, TableRow, TextField} from "@material-ui/core";
import {Http, HttpInput, MutationPutHttpArgs, usePutHttpMutation, GetHttpsDocument, useGetEnvironmentsLazyQuery, Environment} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";
import EnvironmentInput from '../helper/EnvironmentInput';


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

const httpForm: React.FunctionComponent<HttpFormProps> = ({serviceId, resetInput, httpMod}: HttpFormProps) => {
    const [state, setState] = useState<MutationPutHttpArgs>({
        httpId: httpMod?._id || '',
        httpInput: {
            serviceId: httpMod?.serviceId || serviceId,
            token: httpMod?.token || '',
            environmentIds: httpMod?.environmentIds || []
        }
    });
    const classes = useStyles();

    const [putHttp] = usePutHttpMutation({
        refetchQueries: [{query: GetHttpsDocument}]
    })

    const handleIdChange = (event: any) => {
        setState({
            ...state,
            httpId: event.target.value
        });
    };

    const handleChange = (prop: keyof HttpInput) => (event: any) => {
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
            httpInput: {
                ...state.httpInput, 
                [prop]: value
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
                    value={state.httpInput.token}
                    onChange={handleChange('token')}
                />
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
                    disabled={state.httpId === ''}
                >Submit</Button>
            </TableCell>
        </TableRow>
    );
}

export default httpForm;