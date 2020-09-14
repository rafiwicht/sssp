import { gql } from 'apollo-server-express';
import { testClient, connectDb, closeDb, stopDb } from './config/mongo';
import {beforeAll, afterAll, describe, it, expect} from'@jest/globals';
import { State } from '../src/models';

const { query, mutate } = testClient;

beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await closeDb();
  await stopDb();
});

describe("Service resolvers", () => {

  const serverId = 'testId';

  const serverInput = {
    serviceId: 'test-service',
    hosts: ['test01'],
    appIds: ['test-app'],
    environmentIds: ['Prod']
  }

  const server = {
    _id: serverId,
    ...serverInput,
    state: State.IN_CREATION,
    changes: null
  }

  it("Put server", async () => {
    const PUT_SERVER = gql`
      mutation PutServer( $serverId: String!, $serverInput: ServerInput!) {
        putServer(serverId: $serverId, serverInput: $serverInput) {
          _id
          serviceId
          hosts
          appIds
          environmentIds
          state
          changes {
            hosts
            appIds
            environmentIds
          }
        }
      }
    `

    const { data, errors } = await mutate({
      mutation: PUT_SERVER,
      variables: {
        serverId: serverId,
        serverInput: serverInput
      }
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      putServer: {
        ...server
      }
    });

  });

  it("Get servers", async () => {
    const GET_SERVERS = gql`
      query GetServers {
        servers {
          _id
          serviceId
          hosts
          appIds
          environmentIds
          state
          changes {
            hosts
            appIds
            environmentIds
          }
        }
      }
    `

    const { data, errors } = await query({
      query: GET_SERVERS
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      servers: [{
        ...server
      }]
    });
  });

  it("Delete server", async () => {
    const DELETE_SERVER = gql`
      mutation DeleteServer( $serverId: String!) {
        deleteServer(serverId: $serverId) {
          _id
          serviceId
          hosts
          appIds
          environmentIds
          state
          changes {
            hosts
            appIds
            environmentIds
          }
        }
      }
    `

    const { data, errors } = await mutate({
      mutation: DELETE_SERVER,
      variables: {
        serverId: serverId
      }
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      deleteServer: {
        ...server,
        state: State.IN_DELETION
      }
    });

  });

});
