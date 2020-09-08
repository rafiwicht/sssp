import { ForbiddenError } from 'apollo-server';
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
    putEnvironment: async (parent: any,  {environmentId, environmentInput}: any, context: any) => {
        if(!context.admin) return new ForbiddenError('Not allowed!');

        const environment = await Environment.findById(environmentId);

        if (environment) {
            return await Environment.findByIdAndUpdate(environmentId, {
                ...environmentInput
            }, {
                new: true
            });
        } 
        else {
            const environmentNew = new Environment({
                ...environmentInput,
                _id: environmentId
            });
            return environmentNew.save();
        }
    },
    deleteEnvironment: async (parent: any, {environmentId}: any, context: any) => {
        if(!context.admin) return new ForbiddenError('Not allowed!');

        return await Environment.findByIdAndDelete(environmentId);
    }
};

export {EnvironmentQueries, EnvironmentMutations};

