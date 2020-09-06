import React, {useState} from 'react';
import {MutationPutServiceArgs, Service, ServiceInput} from "../../generated/graphql";
import {Button, Divider, FormControl, InputLabel, Typography, Input, Select, MenuItem} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/styles";


const useStyles = makeStyles(() =>
    createStyles({
        marginButton: {
            marginTop: 5,
            marginBottom: 5,
            marginRight: 5
        },
        marginFields: {
            marginTop: 5,
            marginBottom: 5
        },
    }),
);

type ServiceModProps = {
    handleSubmit: (args: MutationPutServiceArgs) => void,
    handleCancel: () => void,
    serviceMod?: Service
}

export enum Step {
    BASIC,
    INDEX_APP,
    PERMISSION
}

const ServiceMod: React.FunctionComponent<ServiceModProps> = ({handleSubmit, handleCancel, serviceMod}: ServiceModProps) => {

    const [state, setState] = useState<MutationPutServiceArgs>({
        serviceId: serviceMod?._id || '',
        serviceInput: {
            owner: serviceMod?.owner || '',
            description: serviceMod?.description || '',
            dataClassification: serviceMod?.dataClassification || ''
        }
    });

    const classes = useStyles();

    const handleIdChange = (event: any) => {
        setState({
            ...state,
            serviceId: event.target.value
        });
    }

    const handleChange = (prop: keyof ServiceInput) => (event: any) => {
        setState({
            ...state,
            serviceInput: {
                ...state.serviceInput,
                [prop]: event.target.value
            }
        });
    };

    return (
        <div>
            <Typography variant='h5'>Service options</Typography>
            <form autoComplete='off' onSubmit={() => handleSubmit(state)}>
                <Divider />
                <FormControl fullWidth className={classes.marginFields} required>
                    <InputLabel htmlFor='_id'>Name</InputLabel>
                    <Input
                        id='_id'
                        type='text'
                        required
                        value={state.serviceId}
                        onChange={handleIdChange}
                        disabled={serviceMod !== undefined}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.marginFields} required>
                    <InputLabel htmlFor='owner'>Owner</InputLabel>
                    <Input
                        id='owner'
                        type='text'
                        required
                        value={state.serviceInput.owner}
                        onChange={handleChange('owner')}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.marginFields} required>
                    <InputLabel htmlFor='description'>Description</InputLabel>
                    <Input
                        id='description'
                        type='text'
                        required
                        value={state.serviceInput.description}
                        onChange={handleChange('description')}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.marginFields} required>
                    <InputLabel htmlFor='dataClassification'>Data classification</InputLabel>
                    <Select
                        id="dataClassification"
                        required
                        value={state.serviceInput.dataClassification}
                        onChange={handleChange('dataClassification')}
                    >
                        <MenuItem value='Standard'>Standard</MenuItem>
                        <MenuItem value='DSGVO'>DSGVO</MenuItem>
                        <MenuItem value='PCI'>PCI</MenuItem>
                    </Select>
                </FormControl>
                <Divider /> 
            </form>
            <Divider />
            <Button
                variant='contained'
                className={classes.marginButton}
                onClick={() => handleCancel()}
            >Cancel</Button>
            <Button
                variant='contained'
                color='primary'
                className={classes.marginButton}
                onClick={() => handleSubmit(state)}
                disabled={state.serviceId === ''
                    || state.serviceInput.owner === ''
                    || state.serviceInput.description === ''
                    || state.serviceInput.dataClassification === ''}
            >Submit</Button>
        </div>

    );
}

export default ServiceMod;