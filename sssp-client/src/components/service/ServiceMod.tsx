import React, {ChangeEvent, useState} from 'react';
import {AppInput, AppType, IndexInput, ServiceInput} from "../../generated/graphql";
import {Button, Divider, FormControl, Input, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import IndexModList from "../index/IndexModList";
import IndexForm from "../index/IndexForm";
import UserModList from "../user/UserModList";
import UserForm from "../user/UserForm";
import {createStyles, makeStyles} from "@material-ui/styles";
import { useHistory } from 'react-router-dom';
import AppModList from "../app/AppModList";
import AppForm from "../app/AppForm";

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

type ServiceModProps = {
    handleSubmit: (serviceInput: ServiceInput) => void,
    serviceMod?: ServiceInput
}

const ServiceMod: React.FunctionComponent<ServiceModProps> = ({handleSubmit, serviceMod}: ServiceModProps) => {
     const [serviceInput, setServiceInput] = useState({
         name: serviceMod?.name || '',
         owner: serviceMod?.owner || '',
         description: serviceMod?.description || '',
         dataClassification: serviceMod?.dataClassification || '',
         indexes: serviceMod?.indexes || [],
         apps: serviceMod?.apps || [],
         read: serviceMod?.read || [],
         write: serviceMod?.read || [localStorage.getItem('userId') || '']
    });

    const classes = useStyles();
    let history = useHistory();

    const handleChange = (prop: keyof ServiceInput) => (event: any) => {
        setServiceInput({ ...serviceInput, [prop]: event.target.value });
    };

    const handleCancel = () => {
        history.push('/service')
    }

    const handleAccessChange = (userId: string, event: ChangeEvent<HTMLInputElement>) => {
        let from, to;
        if(event.target.checked) {
            from = serviceInput.read;
            to = serviceInput.write;
        }
        else {
            from = serviceInput.write;
            to = serviceInput.read;
        }
        const index = from.indexOf(userId);
        from.splice(index, 1);
        to.push(userId);
        if(event.target.checked) {
            setServiceInput({
                ...serviceInput,
                read: from,
                write: to
            });
        }
        else {
            setServiceInput({
                ...serviceInput,
                read: to,
                write: from
            });
        }
    }

    const handleUserAdd = (userId: string) => {
        if(!serviceInput.read.includes(userId) && !serviceInput.write.includes(userId)) {
            setServiceInput({...serviceInput, read: [...serviceInput.read, userId]});
        }
    };

    const handleUserDelete = (userId: string) => {
        if(serviceInput.read.includes(userId)) {
            const index = serviceInput.read.indexOf(userId);
            if (index > -1) {
                serviceInput.read.splice(index, 1);
            }
        }
        else if (serviceInput.write.includes(userId)) {
            const index = serviceInput.write.indexOf(userId);
            if (index > -1) {
                serviceInput.write.splice(index, 1);
            }
        }
        setServiceInput({...serviceInput});
    };


    const handleIndexDelete = (id: number) => {
        if(id < serviceInput.indexes.length) {
            serviceInput.indexes.splice(id, 1);
            setServiceInput({...serviceInput});
        }
    }

    const handleIndexAdd = (indexInput: IndexInput) => {
        if(serviceInput.indexes.findIndex((i: IndexInput) => i.name === indexInput.name) === -1) {
            setServiceInput({ ...serviceInput, indexes: [...serviceInput.indexes, indexInput] });
        }
    }

    const handleAppDelete = (id: number) => {
        if(id < serviceInput.apps.length) {
            serviceInput.apps.splice(id, 1);
            setServiceInput({...serviceInput});
        }
    }

    const handleAppAdd = (appInput: AppInput) => {
        if(serviceInput.apps.findIndex((i: AppInput) => i.name === appInput.name) === -1) {
            setServiceInput({ ...serviceInput, apps: [...serviceInput.apps, appInput] });
        }
    }

    return (
        <div>
            <Typography variant='h3'>Create Service</Typography>
            <form autoComplete='off' onSubmit={() => handleSubmit(serviceInput)}>
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
                <Typography variant='h5'>Indexes</Typography>
                <Divider />
                <IndexModList
                    handleDelete={handleIndexDelete}
                    data={serviceInput.indexes} />
                <IndexForm
                    submitIndex={handleIndexAdd}/>
                <Typography variant='h5'>Apps and addons</Typography>
                <Divider />
                <AppModList
                    data={serviceInput.apps}
                    handleDelete={handleAppDelete} />
                <AppForm
                    submitApp={handleAppAdd} />
                <Typography variant='h5'>Access options</Typography>
                <Divider />
                <UserModList
                    read={serviceInput.read}
                    write={serviceInput.write}
                    handleAccessChange={handleAccessChange}
                    handleUserDelete={handleUserDelete} />
                <UserForm
                    submitUser= {handleUserAdd} />
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
                onClick={() => handleSubmit(serviceInput)}
                disabled={serviceInput.name === '' || serviceInput.owner === '' || serviceInput.description === '' || serviceInput.dataClassification === ''}
            >Submit</Button>
        </div>

    );
}

export default ServiceMod;