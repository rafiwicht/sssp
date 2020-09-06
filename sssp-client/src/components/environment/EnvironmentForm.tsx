import React, {useState} from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, Input, InputLabel} from "@material-ui/core";
import {
    EnvironmentInput,
    GetEnvironmentsDocument,
    useCreateEnvironmentMutation
} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";


const useStyles = makeStyles(() =>
    createStyles({
        margin: {
            marginTop: 5,
            marginBottom: 5,
            marginRight: 5
        }
    }),
);

const EnvironmentForm: React.FC = () => {
    const [environmentInput, setEnvironmentInput] = useState<EnvironmentInput>({
        _id: '',
        userAccess: false
    });

    const [createEnvironment] = useCreateEnvironmentMutation({
        refetchQueries: [{query: GetEnvironmentsDocument}]
    });

    const [hidden, setHidden] = useState<boolean>(true);
    const classes = useStyles();

    const handleOpen = () =>  {
        setHidden(false);
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnvironmentInput({ ...environmentInput, _id: event.target.value });
    };

    const handleAccessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnvironmentInput({ ...environmentInput, userAccess: event.target.checked });
    };

    const reset = () => {
        setHidden(true);
        setEnvironmentInput({
            _id: '',
            userAccess: false
        });
    }

    const handleSubmit = () => {
        createEnvironment({variables: {
            environmentInput: environmentInput
        }}).then(() => {
            reset();
        });
    }

    if(hidden) {
        return (
            <Button
                variant='contained'
                color='primary'
                onClick={() => handleOpen()}
            >Add environment</Button>
        );
    }

    return (
        <div>
            <FormControl className={classes.margin} required>
                <InputLabel htmlFor='_id'>Name</InputLabel>
                <Input
                    id='_id'
                    type='text'
                    required
                    value={environmentInput._id}
                    onChange={handleNameChange}
                />
            </FormControl>
            <FormControl className={classes.margin} required>
                <FormControlLabel label={'Visible for users'} control={
                    <Checkbox
                        id='userAccess'
                        onChange={handleAccessChange}
                    />
                }/>

            </FormControl>

            <Button
                variant='contained'
                className={classes.margin}
                onClick={() => reset()}
            >Cancel</Button>
            <Button
                variant='contained'
                color='primary'
                className={classes.margin}
                onClick={() => handleSubmit()}
                disabled={environmentInput._id === ''}
            >Submit</Button>
        </div>
    );
}

export default EnvironmentForm;