import React, {useState} from 'react';
import {Button, FormControl, Input, InputLabel} from "@material-ui/core";
import {IndexInput} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";


type IndexFormProps = {
    submitIndex: (indexInput: IndexInput) => void
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

const IndexForm: React.FunctionComponent<IndexFormProps> = ({submitIndex}: IndexFormProps) => {
    const [indexInput, setIndexInput] = useState<IndexInput>({
        name: '',
        maxTotalDataSizeMB: 100000000,
        frozenTimePeriodInSecs: 7776000
    });
    const [hidden, setHidden] = useState<boolean>(true);
    const classes = useStyles();

    const handleOpen = () =>  {
        setHidden(false);
    }

    const handleChange = (prop: keyof IndexInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setIndexInput({ ...indexInput, [prop]: event.target.value });
    };

    const reset = () => {
        setHidden(true);
        setIndexInput({
            name: '',
            maxTotalDataSizeMB: 100000000,
            frozenTimePeriodInSecs: 7776000
        });
    }

    const handleSubmit = () => {
        submitIndex(indexInput);
        reset();
    }

    if(hidden) {
        return (
            <Button
                variant='contained'
                color='primary'
                onClick={() => handleOpen()}
            >Add index</Button>
        );
    }

    return (
        <div>
            <FormControl className={classes.margin} required>
                <InputLabel htmlFor='name'>Name</InputLabel>
                <Input
                    id='name'
                    type='text'
                    required
                    value={indexInput.name}
                    onChange={handleChange('name')}
                />
            </FormControl>
            <FormControl className={classes.margin} required>
                <InputLabel htmlFor='name'>maxTotalDataSizeMB</InputLabel>
                <Input
                    id='name'
                    type='number'
                    required
                    value={indexInput.maxTotalDataSizeMB}
                    onChange={handleChange('name')}
                />
            </FormControl>
            <FormControl className={classes.margin} required>
                <InputLabel htmlFor='name'>Name</InputLabel>
                <Input
                    id='frozenTimePeriodInSecs'
                    type='text'
                    required
                    value={indexInput.frozenTimePeriodInSecs}
                    onChange={handleChange('frozenTimePeriodInSecs')}
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
                disabled={indexInput.name === ''}
            >Submit</Button>
        </div>
    );
}

export default IndexForm;