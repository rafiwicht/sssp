import React, {useState} from 'react';
import {Button, FormControl, Input, InputLabel} from "@material-ui/core";
import {IndexInput, SourcetypeInput} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";


type SourcetypeFormProps = {
    submitSourcetype: (sourcetypeInput: SourcetypeInput) => void
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

const SourcetypeForm: React.FunctionComponent<SourcetypeFormProps> = ({submitSourcetype}: SourcetypeFormProps) => {
    const [sourcetypeInput, setSourcetypeInput] = useState<SourcetypeInput>({
        name: ''
    });
    const [hidden, setHidden] = useState<boolean>(true);
    const classes = useStyles();

    const handleOpen = () =>  {
        setHidden(false);
    }

    const handleChange = (prop: keyof IndexInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setSourcetypeInput({ ...sourcetypeInput, [prop]: event.target.value });
    };

    const reset = () => {
        setHidden(true);
        setSourcetypeInput({
            name: ''
        });
    }

    const handleSubmit = () => {
        submitSourcetype(sourcetypeInput);
        reset();
    }

    if(hidden) {
        return (
            <Button
                variant='contained'
                color='primary'
                onClick={() => handleOpen()}
            >Add sourcetype</Button>
        );
    }

    return (
        <div>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor='name'>Name</InputLabel>
                <Input
                    id='name'
                    type='text'
                    required
                    value={sourcetypeInput.name}
                    onChange={handleChange('name')}
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
            >Submit</Button>
        </div>
    );
}

export default SourcetypeForm;