/**
 * File containing all service queries, mutations and subscriptions
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

//import mongoose from 'mongoose';
import {FutureService, Service, ServiceInterface, State} from '../../models/service';
import {ApolloError, ForbiddenError} from 'apollo-server';
//import GitConnectorInterface from "../../git-connector";
//import config from '../../config';
//import GithubConnector from "../../git-connector/github";
//import GitlabConnector from "../../git-connector/gitlab";
//
//
//let gitConnector: GitConnectorInterface;
//if(config.githubToken) {
//    gitConnector = new GithubConnector();
//}
//else {
//    gitConnector = new GitlabConnector();
//}

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
        console.log('--------------accept workflow---------------');
        if(!context.admin) return new ForbiddenError('Not allowed!');

        const futureService = await FutureService.findById(serviceId);
        if(!futureService) throw new ApolloError('Service not found', 'NOT_FOUND');

        if(futureService.state === State.IN_DELETION) {
            Service.findByIdAndDelete(serviceId);
        }
        else if(futureService.state === State.IN_CREATION) {
            const newService = new Service({
                ...futureService._doc,
                state: State.ACTIVE
            });
            newService.save();
        }
        else {

            Service.findByIdAndUpdate(serviceId, {
                ...futureService._doc,
                state: State.ACTIVE
            })
        }

        return FutureService.findByIdAndDelete(serviceId);
    },
    declineWorkflow: async (parent: any, {serviceId}: any, context: any) => {
        if(!context.admin) return new ForbiddenError('Not allowed!');

        const futureService = await FutureService.findById(serviceId);
        if(!futureService) throw new ApolloError('Service not found', 'NOT_FOUND');


        if(futureService.state !== State.IN_CREATION) {
            Service.findByIdAndUpdate(serviceId, {
                state: State.ACTIVE
            });
        }
        return FutureService.findByIdAndDelete(serviceId);
    }
};

export {WorkflowQueries, WorkflowMutations};