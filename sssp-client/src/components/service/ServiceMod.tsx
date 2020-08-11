import React, {ChangeEvent, useState} from 'react';
import {IndexInput, ServiceInput, SourcetypeInput} from "../../generated/graphql";
import {Button, Divider, FormControl, Input, InputLabel, Typography} from "@material-ui/core";
import IndexModList from "../index/IndexModList";
import IndexForm from "../index/IndexForm";
import UserModList from "../user/UserModList";
import UserForm from "../user/UserForm";
import {createStyles, makeStyles} from "@material-ui/styles";
import { useHistory } from 'react-router-dom';
import SourcetypeModList from "../sourcetype/SourcetypeModList";
import SourcetypeForm from "../sourcetype/SourcetypeForm";

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
        indexes: serviceMod?.indexes || [],
        sourcetypes: serviceMod?.sourcetypes || [],
        read: serviceMod?.read || [],
        write: serviceMod?.read || [localStorage.getItem('userId') || '']
    });

    const classes = useStyles();
    let history = useHistory();

    const handleChange = (prop: keyof ServiceInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSourcetypeDelete = (id: number) => {
        if(id < serviceInput.sourcetypes.length) {
            serviceInput.sourcetypes.splice(id, 1);
            setServiceInput({...serviceInput});
        }
    }

    const handleSourcetypeAdd = (sourcetypeInput: SourcetypeInput) => {
        if(serviceInput.sourcetypes.findIndex((i: SourcetypeInput) => i.name === sourcetypeInput.name) === -1) {
            setServiceInput({ ...serviceInput, sourcetypes: [...serviceInput.sourcetypes, sourcetypeInput] });
        }
    }

    return (
        <div>
            <Typography variant='h3'>Create Service</Typography>
            <form autoComplete='off' onSubmit={() => handleSubmit(serviceInput)}>
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
                <Typography variant='h5'>Indexes</Typography>
                <Divider />
                <IndexModList
                    handleDelete={handleIndexDelete}
                    data={serviceInput.indexes} />
                <IndexForm
                    submitIndex={handleIndexAdd}/>
                <Typography variant='h5'>Sourcetypes</Typography>
                <Divider />
                <SourcetypeModList
                    data={serviceInput.sourcetypes}
                    handleDelete={handleSourcetypeDelete} />
                    <SourcetypeForm
                        submitSourcetype={handleSourcetypeAdd} />
                <Typography variant='h5'>Access options</Typography>
                <Divider />
                <UserModList
                    read={serviceInput.read}
                    write={serviceInput.write}
                    handleAccessChange={handleAccessChange} />
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
            >Submit</Button>
        </div>

    );
}

export default ServiceMod;