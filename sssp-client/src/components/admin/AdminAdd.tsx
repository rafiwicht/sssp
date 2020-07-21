import React, {useState} from "react";
import {BrowserRouterProps} from "react-router-dom";
import {ServiceInput, useCreateAdminMutation} from "../../generated/graphql";
import {Button, Divider, FormControl, Input, InputLabel, TextField, Typography} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(() =>
    createStyles({
        margin: {
            marginTop: 5,
            marginBottom: 5
        }
    }),
);

const AdminAdd: React.FC = () => {
    const [userId, setUserId] = useState<string>("");
    const classes = useStyles();

    const [createAdmin] = useCreateAdminMutation();

    const handleChange = (event: any) => {
        setUserId(event.target.value);
    };

    const handleSubmit = () => {
        createAdmin({
            variables: {
                userId: userId
            },

        }).then(() => {
            setUserId('')
        });
    }

    return (
        <div>
            <form autoComplete='off' onSubmit={() => handleSubmit()}>
                <TextField
                    id="userId"
                    label="UserID"
                    onChange={event => handleChange(event)}/>
            </form>
            <Button
                variant='contained'
                color='primary'
                className={classes.margin}
                onClick={() => handleSubmit()}
            >Add</Button>
        </div>

    );
}
export default AdminAdd;