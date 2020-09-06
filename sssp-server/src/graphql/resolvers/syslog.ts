import { ApolloError } from 'apollo-server';
import App from "../../models/service";

const AppQueries = {
    apps: async (parent: any, {}: any, context: any) => {
        let resultApps;

        if(context.admin) {
            resultApps = await App.find();
        }
        else {
            resultApps = await App.find({
                _id: { $in: context.services}
            });
        }

        return resultApps.map((app) => {
            return app._doc;
        });
    },
    app: async (parent: any, {appId}: any, context: any) => {
        const app = await App.findById(appId);

        if(app && context.services.includes(app.serviceId)) {
            return app._doc;
        }
        else return new ApolloError('Service not found', 'NOT_FOUND');
    }
};

const AppMutations = {

};

export {AppQueries, AppMutations};