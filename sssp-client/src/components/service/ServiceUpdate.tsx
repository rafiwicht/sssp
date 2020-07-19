import React, {useState} from "react";
import {RouteComponentProps, useParams, withRouter} from "react-router-dom";
import {Button, Divider, FormControl, Input, InputLabel, Typography} from "@material-ui/core";
import {
    GetServicesDocument,
    ServiceInput,
    useGetServiceQuery,
    useUpdateServiceMutation
} from "../../generated/graphql";
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


const ServiceUpdate: React.FunctionComponent<RouteComponentProps> = ({history}: RouteComponentProps) => {
    const { id } = useParams();
    const classes = useStyles();

    const [serviceInput, setServiceInput] = useState<ServiceInput>({
        name: '',
        owner: ''
    });

    const [updateService] = useUpdateServiceMutation({
        refetchQueries: [{query: GetServicesDocument}]
    });
    const {data, error, loading} = useGetServiceQuery({
        variables: {
            serviceId: id
        },
        onCompleted: serviceData => setServiceInput({
            name: serviceData.service.name,
            owner: serviceData.service.owner
        })
    });

    const handleChange = (prop: keyof ServiceInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setServiceInput({ ...serviceInput, [prop]: event.target.value });
    };

    const handleCancel = () => {
        history.push('/service')
    }

    const handleSubmit = () => {
        updateService({
            variables: {
                serviceId: id,
                serviceInput: serviceInput
            }
        }).then(() => {
                history.push('/service')
        });
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    return (
        <div>
            <Typography variant='h3'>Update Service</Typography>
            <form autoComplete='off' onSubmit={() => handleSubmit()}>
                <Typography variant='h5'>Service options</Typography>
                <Divider />
                <FormControl fullWidth className={classes.marginFields}>
                    <InputLabel htmlFor='name'>Name</InputLabel>
                    <Input
                        id='name'
                        type='text'
                        required
                        value={serviceInput.name }
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
export default withRouter(ServiceUpdate);