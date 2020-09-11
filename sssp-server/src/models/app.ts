/**
 * Model for the apps and addons
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import mongoose, { Schema, Document } from "mongoose";
import { State } from '.';

export interface AppInterface extends Document {
    _id: string;
    serviceId: string;
    url: string;
    version: string;
    git: boolean;
    environmentIds: [string];
    state: State;
    changes?: {
        url: string;
        environmentIds: [string];
    };
}

const AppSchema: Schema = new Schema({
    _id: { type: String, required: true},
    serviceId: { type: String, required: true, index: true },
    url: { type: String, default: 'in creation' },
    version: { type: String, default: 'latest' },
    git: { type: Boolean, default: true },
    environmentIds : { type: [String], default: []},
    state: { type: State, default: State.IN_CREATION },
    changes: {
        type: {
            url: { type: String, default: 'in creation' },
            version: { type: String, default: 'latest' },
            git: { type: Boolean, default: true },
            environmentIds : { type: [String], default: [] }
        }
    }
});

const App = mongoose.model<AppInterface>('App', AppSchema);

export default App;