import React, {useState} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Button, Divider, FormControl, Input, InputLabel, Typography} from "@material-ui/core";
import {GetServicesDocument, ServiceInput, useCreateServiceMutation} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(() =>
    createStyles({
        marginFields: {
            marginTop: 5,
            marginBottom: 5
        },
        marginButton: {
            marginTop: 5,
            marginBottom: 5,
            marginRight: 5
        }
    }),
);


const ServiceCreate: React.FunctionComponent<RouteComponentProps> = ({history}: RouteComponentProps) => {
    const [serviceInput, setServiceInput] = useState<ServiceInput>({
        name: '',
        owner: ''
    });
    const classes = useStyles();
    const [createService] = useCreateServiceMutation({
        refetchQueries: [{query: GetServicesDocument}]
    });

    const handleChange = (prop: keyof ServiceInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setServiceInput({ ...serviceInput, [prop]: event.target.value });
    };

    const handleCancel = () => {
        history.push('/service')
    }

    const handleSubmit = () => {
        createService({
            variables: {
                serviceInput: serviceInput
            },

        }).then(() => {
                history.push('/service')
        });
    }

    return (
        <div>
            <Typography variant='h3'>Create Service</Typography>
            <form autoComplete='off' onSubmit={() => handleSubmit()}>
                <Typography variant='h5'>Service options</Typography>
                <Divider />
                <FormControl fullWidth className={classes.marginFields}>
                    <InputLabel htmlFor='name'>Name</InputLabel>
                    <Input
                        id='name'
                        type='text'
                        required
                        value={serviceInput.name}
                        onChange={handleChange('name')}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.marginFields}>
                    <InputLabel htmlFor='owner'>Owner</InputLabel>
                    <Input
                        id='owner'
                        type='text'
                        required
                        value={serviceInput.owner}
                        onChange={handleChange('owner')}
                    />
                </FormControl>
                <Typography variant='h5'>Index options</Typography>
                <Divider />
                t.b.d.
                <Typography variant='h5'>Access options</Typography>
                <Divider />
                t.b.d.
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
                onClick={() => handleSubmit()}
            >Submit</Button>
        </div>

    );
}
export default withRouter(ServiceCreate);