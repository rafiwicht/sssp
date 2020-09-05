import React, {ChangeEvent, useState} from 'react';
import {AppInput, IndexInput, ServiceInput} from "../../generated/graphql";
import {Button, Divider, LinearProgress, Typography} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/styles";
import { useHistory } from 'react-router-dom';
import ServiceModStepBasic from './ServiceModStepBasic';
import ServiceModStepIndexApp from './ServiceModStepIndexApp';
import ServiceModStepPermission from './ServiceModStepPermission';
import Progress from './Progress';


const useStyles = makeStyles(() =>
    createStyles({
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

export enum Step {
    BASIC,
    INDEX_APP,
    PERMISSION
}

const ServiceMod: React.FunctionComponent<ServiceModProps> = ({handleSubmit, serviceMod}: ServiceModProps) => {
    const [step, setStep] = useState<Step>(Step.BASIC);

    const [serviceInput, setServiceInput] = useState({
         name: serviceMod?.name || '',
         owner: serviceMod?.owner || '',
         description: serviceMod?.description || '',
         dataClassification: serviceMod?.dataClassification || '',
         indexes: serviceMod?.indexes || [],
         apps: serviceMod?.apps || [],
         read: serviceMod?.read || [],
         write: serviceMod?.write || []
    });

    const classes = useStyles();
    let history = useHistory();

    const handleChange = (prop: keyof ServiceInput) => (event: any) => {
        setServiceInput({ ...serviceInput, [prop]: event.target.value });
    };

    const handleCancel = () => {
        history.push('/service')
    }

    const handleAccessChange = (objId: string, accessType: boolean) => {
        let from, to;
        if(accessType) {
            from = serviceInput.read;
            to = serviceInput.write;
        }
        else {
            from = serviceInput.write;
            to = serviceInput.read;
        }
        const index = from.indexOf(objId);
        from.splice(index, 1);
        to.push(objId);
        if(accessType) {
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

    const handlePermissionAdd = (objId: string) => {
        if(!serviceInput.read.includes(objId) && !serviceInput.write.includes(objId)) {
            setServiceInput({...serviceInput, read: [...serviceInput.read, objId]});
        }
    };

    const handlePermissionDelete = (objId: string) => {
        if(serviceInput.read.includes(objId)) {
            const index = serviceInput.read.indexOf(objId);
            if (index > -1) {
                serviceInput.read.splice(index, 1);
            }
        }
        else if (serviceInput.write.includes(objId)) {
            const index = serviceInput.write.indexOf(objId);
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
            <Progress current={step}/>
            <form autoComplete='off' onSubmit={() => handleSubmit(serviceInput)}>
                {step === Step.BASIC && 
                    <ServiceModStepBasic 
                        handleChange={handleChange} 
                        serviceInput={serviceInput} />
                }
                {step === Step.INDEX_APP &&
                    <ServiceModStepIndexApp
                        serviceInput={serviceInput}
                        handleIndexAdd={handleIndexAdd} 
                        handleIndexDelete={handleIndexDelete}
                        handleAppAdd={handleAppAdd}
                        handleAppDelete={handleAppDelete} />
                }
                {step === Step.PERMISSION && 
                    <ServiceModStepPermission 
                        serviceInput={serviceInput}
                        handleAccessChange={handleAccessChange}
                        handlePermissionAdd={handlePermissionAdd}
                        handlePermissionDelete={handlePermissionDelete} />
                }
                <Divider /> 
            </form>
            <Divider />
            <Button
                variant='contained'
                className={classes.marginButton}
                onClick={() => handleCancel()}
            >Cancel</Button>
            <Button
                variant='contained'
                className={classes.marginButton}
                onClick={() => {
                    setStep(step - 1)
                }}
                disabled={step === Step.BASIC}
            >Back</Button>
            <Button
                variant='contained'
                className={classes.marginButton}
                onClick={() => {
                    setStep(step + 1)
                }}
                disabled={step === Step.PERMISSION || serviceInput.name === '' || serviceInput.owner === '' || serviceInput.description === '' || serviceInput.dataClassification === ''}
            >Next</Button>
            <Button
                variant='contained'
                color='primary'
                className={classes.marginButton}
                onClick={() => handleSubmit(serviceInput)}
                disabled={step !== Step.PERMISSION}
            >Submit</Button>
        </div>

    );
}

export default ServiceMod;