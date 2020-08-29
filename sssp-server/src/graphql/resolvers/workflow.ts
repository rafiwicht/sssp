/**
 * File containing all workflow queries, mutations and subscriptions
 * This resolvers are only accessible by admins
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import mongoose from 'mongoose';
import {FutureService, RevisionService, Service, ServiceInterface, State} from '../../models/service';
import {ApolloError, ForbiddenError} from 'apollo-server';
import GitConnectorInterface from "../../git-connector";
import config from '../../config';
import GithubConnector from "../../git-connector/github";
import GitlabConnector from "../../git-connector/gitlab";


// Connector to the git backend
let gitConnector: GitConnectorInterface;
if(config.githubToken) {
    gitConnector = new GithubConnector();
}
else {
    gitConnector = new GitlabConnector();
}

type WorkflowResult = {
    new: ServiceInterface,
    current?: ServiceInterface
}

const WorkflowQueries = {
    workflow: async (parent: any, {serviceId}: any, context: any) => {
        if(!context.admin) return new ForbiddenError('Not allowed!');

        const futureService = await FutureService.findById(serviceId);
        if(!futureService) throw new ApolloError('Service not found', 'NOT_FOUND');

        let result: WorkflowResult = {
            new: futureService
        };
        if(futureService.state !== State.IN_CREATION) {
            result.current = await Service.findById(serviceId);
        }
        return result;
    }
};

const WorkflowMutations = {
    acceptWorkflow: async (parent: any, {serviceId}: any, context: any) => {
        if(!context.admin) return new ForbiddenError('Not allowed!');

        const futureService = await FutureService.findById(serviceId);
        if(!futureService) throw new ApolloError('Service not found', 'NOT_FOUND');

        if(futureService.state === State.IN_CREATION) {
            const newService = new Service({
                ...futureService._doc,
                apps: futureService.apps.map(e => {
                    // Create git repositories
                    return {
                        name: e.name,
                        type: e.type,
                        url: gitConnector.createRepo(e.name, futureService.read, futureService.write, e.type)
                    };
                }),
                state: State.ACTIVE
            });
            newService.save();
        }
        else{
            const service = await Service.findById(serviceId);
            // Add current state to revision
            const newRevisionService = new RevisionService({
                ...service._doc,
                _id: new mongoose.Types.ObjectId(),
                state: State.ARCHIVED
            })
            newRevisionService.save();

            if(futureService.state === State.IN_DELETION) {
                await Service.findByIdAndDelete(serviceId);

                // Delete git repositories
                futureService.apps.forEach(e => {
                    gitConnector.deleteRepo(e.name);
                });
            }
            else {
                // Get git repositories difference
                const newApps = futureService.apps.map(e => {return e.name;});
                const currentApps = service.apps.map(e => {return e.name;});
                const appsToDelete = currentApps.filter(e => !newApps.includes(e));

                // Delete git repositories
                appsToDelete.apps.forEach(e => {
                    gitConnector.deleteRepo(e.name);
                });

                await Service.findByIdAndUpdate(serviceId, {
                    ...futureService._doc,
                    state: State.ACTIVE,
                    revision: futureService.revision + 1,
                    apps: futureService.apps.map(e => {
                        if(e.url !== 'in creation') {
                            return e;
                        }
                        else {
                            return {
                                name: e.name,
                                type: e.type,
                                url: gitConnector.createRepo(e.name, futureService.read, futureService.write, e.type)
                            };
                        }
                    })
                });


            }
        }

        return await FutureService.findByIdAndDelete(serviceId);
    },
    declineWorkflow: async (parent: any, {serviceId}: any, context: any) => {
        if(!context.admin) return new ForbiddenError('Not allowed!');

        const futureService = await FutureService.findById(serviceId);
        if(!futureService) throw new ApolloError('Service not found', 'NOT_FOUND');

        if(futureService.state !== State.IN_CREATION) {
            await Service.findByIdAndUpdate(serviceId, {
                state: State.ACTIVE
            });
        }
        return await FutureService.findByIdAndDelete(serviceId);
    }
};

export {WorkflowQueries, WorkflowMutations};