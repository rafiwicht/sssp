import React, {useState} from 'react';
import {Button, FormControl, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import {AppInput, AppType, IndexInput} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";


type AppFormProps = {
    submitApp: (appInput: AppInput) => void
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

const AppForm: React.FunctionComponent<AppFormProps> = ({submitApp}: AppFormProps) => {
    const [appInput, setAppInput] = useState<AppInput>({
        name: '',
        type: AppType.Xa
    });
    const [hidden, setHidden] = useState<boolean>(true);
    const classes = useStyles();

    const handleOpen = () =>  {
        setHidden(false);
    }

    const handleChange = (prop: keyof AppInput) => (event: any) => {
        setAppInput({ ...appInput, [prop]: event.target.value });
    };

    const reset = () => {
        setHidden(true);
        setAppInput({
            name: '',
            type: AppType.Xa
        });
    }

    const handleSubmit = () => {
        submitApp(appInput);
        reset();
    }

    if(hidden) {
        return (
            <Button
                variant='contained'
                color='primary'
                onClick={() => handleOpen()}
            >Add app/addons</Button>
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
                    value={appInput.name}
                    onChange={handleChange('name')}
                />
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor='name'>Type</InputLabel>
                <Select
                    id="type"
                    value={appInput.type}
                    onChange={handleChange('type')}
                >
                    <MenuItem value={AppType.Xa}>XA</MenuItem>
                    <MenuItem value={AppType.Ui}>UI</MenuItem>
                </Select>
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

export default AppForm;