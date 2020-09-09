import React, {useEffect, useState} from 'react';
import {Button, MenuItem, TableCell, TableRow, Select, TextField} from "@material-ui/core";
import {Index, IndexInput, MutationPutIndexArgs, usePutIndexMutation, GetIndexesDocument, useGetEnvironmentsLazyQuery, Environment} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";


type IndexFormProps = {
    serviceId: string,
    resetInput: () => void,
    indexMod?: Index
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

const IndexForm: React.FunctionComponent<IndexFormProps> = ({serviceId, resetInput, indexMod}: IndexFormProps) => {
    const [state, setState] = useState<MutationPutIndexArgs>({
        indexId: indexMod?._id || '',
        indexInput: {
            serviceId: indexMod?.serviceId || serviceId,
            maxTotalDataSizeMB: indexMod?.maxTotalDataSizeMB || 100000000,
            frozenTimePeriodInSecs: indexMod?.frozenTimePeriodInSecs || 7776000,
            environmentIds: indexMod?.environmentIds || []
        }
    });
    const classes = useStyles();

    const [putIndex] = usePutIndexMutation({
        refetchQueries: [{query: GetIndexesDocument}]
    })

    const [getEnvironments, {data}] = useGetEnvironmentsLazyQuery();

    useEffect(() => {
        getEnvironments();
    },[]);

    const handleIdChange = (event: any) => {
        setState({
            ...state,
            indexId: event.target.value
        });
    };

    const handleChange = (prop: keyof IndexInput) => (event: any) => {
        // Value returns always string
        let value;
        if(event.target.type === 'number') {
            value = Number(event.target.value);
        }
        else {
            value = event.target.value;
        }
        setState({
            ...state,
            indexInput: {
                ...state.indexInput, 
                [prop]: value
            }
        });
    };

    const handleSumbit = () => {
        reset();
        putIndex({
            variables: state
        });
    };

    const reset = () => {
        resetInput();
        setState({
            indexId: '',
            indexInput: {
                serviceId: serviceId,
                maxTotalDataSizeMB: 100000000,
                frozenTimePeriodInSecs: 7776000,
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
                    value={state.indexId}
                    disabled={indexMod !== undefined}
                    onChange={handleIdChange}
                />
            </TableCell>
            <TableCell align='right'>{indexMod === undefined ? '' : indexMod.state}</TableCell>
            <TableCell align='right'>
                <TextField
                    id='maxTotalDataSizeMB'
                    type='number'
                    required
                    value={state.indexInput.maxTotalDataSizeMB}
                    onChange={handleChange('maxTotalDataSizeMB')}
                />
            </TableCell>
            <TableCell align='right'>
                <TextField
                    id='frozenTimePeriodInSecs'
                    type='number'
                    required
                    value={state.indexInput.frozenTimePeriodInSecs}
                    onChange={handleChange('frozenTimePeriodInSecs')}
                />
            </TableCell>
            <TableCell align='right'>
                <TextField
                    id="environmentIds"
                    select
                    value={state.indexInput.environmentIds}
                    onChange={handleChange('environmentIds')}
                    SelectProps={{multiple: true}}
                    children={data?.environments.map((e: Environment, k: number) => (
                        <MenuItem key={k} value={e._id}>{e._id}</MenuItem>
                    ))}
                />
            </TableCell>
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
                    disabled={state.indexId === ''}
                >Submit</Button>
            </TableCell>
        </TableRow>
    );
}

export default IndexForm;