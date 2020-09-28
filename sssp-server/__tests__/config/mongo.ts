import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import { typeDefs } from '../../src/graphql/schema';
import resolvers from '../../src/graphql/resolvers';

const mongoServer = new MongoMemoryServer();

export default mongoServer.getUri();

export const stopDb = async () => {
    await mongoServer.stop();
}

export const closeDb = async () => {
    await mongoose.disconnect()
}

export const connectDb = async () => {
    const url = await mongoServer.getUri();
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).catch(error => console.error(error));
}

const server: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        userId: "test1",
        admin: true,
        read: [],
        write: []
    }
});

export const testClient = createTestClient(server);