import { createStyles, Divider, FormControl, Input, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import React from 'react';
import { ServiceInput } from '../../generated/graphql';


const useStyles = makeStyles(() =>
    createStyles({
        marginFields: {
            marginTop: 5,
            marginBottom: 5
        }
    }),
);

type ServiceModBasicProps = {
    serviceInput: ServiceInput,
    handleChange: (prop: keyof ServiceInput) => (event: any) => void
}

const ServiceModStepBasic: React.FunctionComponent<ServiceModBasicProps> = ({serviceInput, handleChange} : ServiceModBasicProps) => {
    const classes = useStyles();
    
    return(
        <div>
            <Typography variant='h5'>Service options</Typography>
                <Divider />
                <FormControl fullWidth className={classes.marginFields} required>
                    <InputLabel htmlFor='name'>Name</InputLabel>
                    <Input
                        id='name'
                        type='text'
                        required
                        value={serviceInput.name}
                        onChange={handleChange('name')}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.marginFields} required>
                    <InputLabel htmlFor='owner'>Owner</InputLabel>
                    <Input
                        id='owner'
                        type='text'
                        required
                        value={serviceInput.owner}
                        onChange={handleChange('owner')}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.marginFields} required>
                    <InputLabel htmlFor='description'>Description</InputLabel>
                    <Input
                        id='description'
                        type='text'
                        required
                        value={serviceInput.description}
                        onChange={handleChange('description')}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.marginFields} required>
                    <InputLabel htmlFor='dataClassification'>Data classification</InputLabel>
                    <Select
                        id="dataClassification"
                        required
                        value={serviceInput.dataClassification}
                        onChange={handleChange('dataClassification')}
                    >
                        <MenuItem value='Standard'>Standard</MenuItem>
                        <MenuItem value='DSGVO'>DSGVO</MenuItem>
                        <MenuItem value='PCI'>PCI</MenuItem>
                    </Select>
                </FormControl>
        </div>
    );
}

export default ServiceModStepBasic