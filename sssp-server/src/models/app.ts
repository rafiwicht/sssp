import mongoose, { Schema, Document } from "mongoose";

export interface AppInterface extends Document {
    _id: string;
    serviceId: string;
    url: string;
    version: string;
    environmentIds: [string];
    changes?: {
        url: string;
        environmentIds: [string];
    };
}

const AppSchema: Schema = new Schema({
    _id: { type: String, required: true},
    serviceId: { type: String, required: true },
    url: { type: String, default: 'in creation' },
    version: { type: String, default: 'latest' },
    environmentIds : { type: [String], default: []},
    changes: {
        type: {
            url: { type: String, default: 'in creation' },
            version: { type: String, default: 'latest' },
            environmentIds : { type: [String], default: [] }
        }
    }
});


const App = mongoose.model<AppInterface>('App', AppSchema);

export default App;