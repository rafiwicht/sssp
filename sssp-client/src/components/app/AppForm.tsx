import React, {useState} from 'react';
import {Button, FormControl, Input, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import {AppInput, AppType} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";
import config from '../../config';


type AppFormProps = {
    submitApp: (appInput: AppInput) => void
}

const useStyles = makeStyles(() =>
    createStyles({
        margin: {
            marginTop: 5,
            marginBottom: 5,
            marginRight: 5
        },
        typo: {
            display: 'inline-block',
            margin: 5,
            marginTop: 27
        }
    }),
);

const AppForm: React.FunctionComponent<AppFormProps> = ({submitApp}: AppFormProps) => {
    const [appInput, setAppInput] = useState<AppInput>({
        name: '',
        type: AppType.Ta
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
            type: AppType.Ta
        });
    }

    const handleSubmit = () => {
        submitApp({
            name: `${appInput.type}-${config.firm}-${appInput.name}`,
            type: appInput.type
        });
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
            <Typography className={classes.typo} variant='body1'>{`${appInput.type}-${config.firm}-`}</Typography>
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
                <InputLabel htmlFor='type'>Type</InputLabel>
                <Select
                    id="type"
                    value={appInput.type}
                    onChange={handleChange('type')}
                >
                    <MenuItem value={AppType.Ta}>TA</MenuItem>
                    <MenuItem value={AppType.Fa}>FA</MenuItem>
                    <MenuItem value={AppType.Sa}>SA</MenuItem>
                    <MenuItem value={AppType.Ia}>IA</MenuItem>
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