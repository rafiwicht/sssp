import { ApolloError, ForbiddenError } from 'apollo-server';
import Environment from '../../models/environment';

const EnvironmentQueries = {
    environments: async () => {
        const environments = await Environment.find();
       
        return environments.map((environment) => {
            return environment._doc;
        });
    }
};

const EnvironmentMutations = {
    createEnvironment: async (parent: any, {environmentInput}: any, context: any) => {
        if(!context.admin) return new ForbiddenError('Not allowed!');

        const environment = await Environment.findById(environmentInput._id);

        if (environment) {
            return new ApolloError('Environment already exists');
        } 
        else {
            const environmentNew = new Environment({
                ...environmentInput,
            });
            return environmentNew.save();
        }
    },
    updateEnvironment: async (parent: any, {environmentInput}: any, context: any) => {
        if(!context.admin) return new ForbiddenError('Not allowed!');

        return await Environment.findByIdAndUpdate(environmentInput._id, {
            ...environmentInput
        }, {
            new: true
        });
    },
    deleteEnvironment: async (parent: any, {environmentId}: any, context: any) => {
        if(!context.admin) return new ForbiddenError('Not allowed!');

        return await Environment.findByIdAndDelete(environmentId);
    }
};

export {EnvironmentQueries, EnvironmentMutations};

