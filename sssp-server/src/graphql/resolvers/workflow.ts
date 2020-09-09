import { ForbiddenError, ApolloError } from 'apollo-server';
import { State } from '../../models';
import Http from '../../models/http';
import Index from '../../models/idx';
import Server from '../../models/server';
import Service from '../../models/service';
import Syslog from '../../models/syslog';
import App from "../../models/app";

enum Resource {
    APP = 'APP',
    HTTP = 'HTTP',
    INDEX = 'INDEX',
    SERVER = 'SERVER',
    SERVICE = 'SERVICE',
    SYSLOG = 'SYSLOG'
}

const modelMapper = {
    APP: App,
    HTTP: Http,
    INDEX: Index,
    SERVER: Server,
    SERVICE: Service,
    SYSLOG: Syslog
}

type WorkflowProps = {
    id: string,
    resource: Resource
}

const WorkflowMutations = {
    acceptChange: async (parent: any, {id, resource}: any, context: any) => {
        if(!context.admin) return new ForbiddenError('Not allowed!');

        const model = modelMapper[resource];
    
        const element = await model.findById(id);
        if(!element) {
            return new ApolloError('Not found', 'NOT_FOUND');
        }
        else if(element._doc.state === State.IN_DELETION) {
            await model.findByIdAndDelete(id);
        }
        else {
            await model.findByIdAndUpdate(id, {
                $set: {
                    ...element.changes,
                    state: State.ACTIVE
                },
                $unset: {
                    changes: {}
                }
            },{
                new: true
            });
        }
        return id;
    
    },
    rejectChange: async (parent: any, {id, resource}: WorkflowProps, context: any) => {
        if(!context.admin) return new ForbiddenError('Not allowed!');

        const model = modelMapper[resource];
    
        const element = await model.findById(id);
        if(!element) {
            return new ApolloError('Not found', 'NOT_FOUND');
        }
        else {
            await model.findByIdAndUpdate(id, {
                $set: {
                    state: State.ACTIVE
                },
                $unset: {
                    changes: {}
                }
            },{
                new: true
            });
        }
        return id;
    }
};

export {WorkflowMutations};