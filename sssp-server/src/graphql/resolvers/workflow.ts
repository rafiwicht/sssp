/**
 * File containing all service queries, mutations and subscriptions
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import mongoose from 'mongoose';
import {Service, ServiceInterface, State} from '../../models/service';
import {Kind, transformService} from './merge';
import {ApolloError, ForbiddenError} from 'apollo-server';
import GitConnectorInterface from "../../git-connector";
import config from '../../config';
import GithubConnector from "../../git-connector/github";
import GitlabConnector from "../../git-connector/gitlab";


let gitConnector: GitConnectorInterface;
if(config.githubToken) {
    gitConnector = new GithubConnector();
}
else {
    gitConnector = new GitlabConnector();
}

const WorkflowQueries = {
    workflows: async (parent: any, {}: any, context: any) => {
        if(!context.admin) return new ForbiddenError('Not allowed!');
        const services = await Service.find({
            state: [State.IN_CREATION, State.IN_MODIFICATION, State.IN_DELETION]
        });
        return services.map((service: ServiceInterface) => {
            if(service.state === State.IN_MODIFICATION) {
                return {
                    current: transformService(service, Kind.CURRENT),
                    new: transformService(service, Kind.FUTURE)
                };
            }
            else if(service.state === State.IN_CREATION) {
                return {
                    new: transformService(service)
                }
            }
            else {
                return {
                    current: transformService(service)
                }
            }
        });
    },
    workflow: async (parent: any, {serviceId}: any, context: any) => {
        if(!context.admin) return new ForbiddenError('Not allowed!');

        const service = await Service.findById(serviceId);
        console.log(service);
        console.log(!service);
        if(!service) throw new ApolloError('Service not found', 'NOT_FOUND');

        if(service.state === State.IN_MODIFICATION) {
            return {
                current: transformService(service, Kind.CURRENT),
                new: transformService(service, Kind.FUTURE)
            };
        }
        else if(service.state === State.IN_CREATION) {
            return {
                new: transformService(service)
            }
        }
        else {
            return {
                current: transformService(service)
            }
        }
    }
};

const WorkflowMutations = {
    acceptWorkflow: async (parent: any, {serviceId}: any, context: any) => {
        if(!context.admin) return new ForbiddenError('Not allowed!');

        const service = await Service.findById(serviceId);
        if(!service) throw new ApolloError('Service not found', 'NOT_FOUND');

        if(service.state === State.IN_MODIFICATION) {
            const updatedService = await Service.findByIdAndUpdate(serviceId, {
                ...service.futureService,
                state: State.ACTIVE,
                futureService: null
            });
            // Create and delete repos
            const currentApps = service.apps.map(e => {
                return e.name
            });
            const newApps = service.futureService.apps.map(e => {
                return e.name
            });

            // Delete apps
            const appsInDeletion = currentApps.filter(e => !newApps.includes(e));

            updatedService.apps.forEach((e: ServiceInterface) => {
                gitConnector.createRepo(e.name, updatedService.read, updatedService.write, updatedService.type);
            })

            appsInDeletion.forEach((e: string) => {
                gitConnector.deleteRepo(e);
            })

            return transformService(updatedService);
        }
        else if(service.state === State.IN_CREATION) {
            const updatedService = await Service.findByIdAndUpdate(serviceId, {
                state: State.ACTIVE,
                futureService: null,
                apps: service.apps.map(e => {
                    return {
                        ...e,
                        _id: new mongoose.Types.ObjectId(),
                        url: gitConnector.createRepo(service.name, service.read, service.write, service.type)
                    };
                })
            });
            return transformService(updatedService);
        }
        else {
            const deletedService = await Service.findByIdAndDelete(serviceId);
            deletedService.apps.forEach((e: ServiceInterface) => {
                gitConnector.deleteRepo(e.name);
            })
            return transformService(deletedService);
        }
    },
    declineWorkflow: async (parent: any, {serviceId}: any, context: any) => {
        if(!context.admin) return new ForbiddenError('Not allowed!');

        const service = await Service.findById(serviceId);
        if(!service) throw new ApolloError('Service not found', 'NOT_FOUND');

        if(service.state === State.IN_CREATION) {
            const deletedService = await Service.findByIdAndDelete(serviceId);
            return transformService(deletedService);
        }
        else {
            const updatedService = await Service.findByIdAndUpdate(serviceId, {
                state: State.ACTIVE,
                futureService: null
            });
            return transformService(updatedService);
        }
    }
};

export {WorkflowQueries, WorkflowMutations};