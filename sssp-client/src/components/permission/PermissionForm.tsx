import React, {useState} from 'react';
import {Button, FormControl, Input, InputLabel} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/styles";


type UserFormProps = {
    submitUser: (userId: string) => void
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

const UserForm: React.FunctionComponent<UserFormProps> = ({submitUser}: UserFormProps) => {
    const [userId, setUserId] = useState<string>('');
    const [hidden, setHidden] = useState<boolean>(true);
    const classes = useStyles();

    const handleOpen = () =>  {
        setHidden(false);
    }

    const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.target.value);
    };

    const reset = () => {
        setHidden(true);
        setUserId('');
    }

    const handleSubmit = () => {
        submitUser(userId);
        reset();
    }

    if(hidden) {
        return (
            <Button
                variant='contained'
                color='primary'
                onClick={() => handleOpen()}
            >Add permission</Button>
        );
    }

    return (
        <div>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor='name'>User ID</InputLabel>
                <Input
                    id='name'
                    type='text'
                    required
                    value={userId}
                    onChange={handleChange()}
                />
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
                disabled={userId === ''}
            >Submit</Button>
        </div>
    );
}

export default UserForm;