import React, {useEffect, useState} from 'react';
import {Button, FormControl, Input, InputLabel, MenuItem, TableCell, TableRow, Select} from "@material-ui/core";
import {Index, IndexInput, MutationPutIndexArgs, usePutIndexMutation, GetIndexesDocument, useGetEnvironmentsLazyQuery, Environment} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";


type IndexFormProps = {
    serviceId: string,
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

const IndexForm: React.FunctionComponent<IndexFormProps> = ({serviceId, indexMod}: IndexFormProps) => {
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
    });

    const handleIdChange = (event: any) => {
        setState({
            ...state,
            indexId: event.target.value
        });
    };

    const handleChange = (prop: keyof IndexInput) => (event: any) => {
        setState({
            ...state,
            indexInput: {
                ...state.indexInput, 
                [prop]: event.target.value
            }
        });
    };

    const handleSumbit = () => {
        putIndex({
            variables: state
        });
    };

    const reset = () => {
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
                <FormControl className={classes.margin} required>
                    <InputLabel htmlFor='_id'>Name</InputLabel>
                    <Input
                        id='_id'
                        type='text'
                        required
                        value={state.indexId}
                        disabled={state.indexId === undefined}
                        onChange={handleIdChange}
                    />
                </FormControl>
            </TableCell>
            <TableCell align='right'>{indexMod === undefined ? '' : indexMod.state}</TableCell>
            <TableCell align='right'>
                <FormControl className={classes.margin} required>
                    <InputLabel htmlFor='maxTotalDataSizeMB'>maxTotalDataSizeMB</InputLabel>
                    <Input
                        id='maxTotalDataSizeMB'
                        type='number'
                        required
                        value={state.indexInput.maxTotalDataSizeMB}
                        onChange={handleChange('maxTotalDataSizeMB')}
                    />
                </FormControl>
            </TableCell>
            <TableCell align='right'>
                <FormControl className={classes.margin} required>
                    <InputLabel htmlFor='name'>Name</InputLabel>
                    <Input
                        id='frozenTimePeriodInSecs'
                        type='number'
                        required
                        value={state.indexInput.frozenTimePeriodInSecs}
                        onChange={handleChange('frozenTimePeriodInSecs')}
                    />
                </FormControl>
            </TableCell>
            <TableCell align='right'>
                <FormControl className={classes.margin} required>
                    <InputLabel htmlFor='environmentIds'>Data classification</InputLabel>
                    <Select
                        id="environmentIds"
                        multiple={true}
                        value={state.indexInput.environmentIds}
                        onChange={handleChange('environmentIds')}
                    >
                        { data?.environments.map((e: Environment) => (
                            <MenuItem value={e._id}>{e._id}</MenuItem>
                        ))}
                    </Select>
                </FormControl>    
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