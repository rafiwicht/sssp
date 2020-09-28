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

  const serviceId = 'testId';

  const serviceInput = {
    owner: 'me',
    description: 'test service',
    dataClassification: 'Test'
  }

  const service = {
    _id: serviceId,
    ...serviceInput,
    state: State.IN_CREATION,
    changes: null
  }

  it("Put service", async () => {
    const PUT_SERVICE = gql`
      mutation PutService( $serviceId: String!, $serviceInput: ServiceInput!) {
        putService(serviceId: $serviceId, serviceInput: $serviceInput) {
          _id
          owner
          description
          dataClassification
          state
          changes {
            owner
            description
            dataClassification
          }
        }
      }
    `

    const { data, errors } = await mutate({
      mutation: PUT_SERVICE,
      variables: {
        serviceId: serviceId,
        serviceInput: serviceInput
      }
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      putService: {
        ...service
      }
    });

  });

  it("Get services", async () => {
    const GET_SERVICES = gql`
      query GetServices {
        services {
          _id
          owner
          description
          dataClassification
          state
          changes {
            owner
            description
            dataClassification
          }
        }
      }
    `

    const { data, errors } = await query({
      query: GET_SERVICES
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      services: [{
        ...service
      }]
    });
  });

  it("Delete service", async () => {
    const DELETE_SERVICE = gql`
      mutation DeleteService( $serviceId: String!) {
        deleteService(serviceId: $serviceId) {
          _id
          owner
          description
          dataClassification
          state
          changes {
            owner
            description
            dataClassification
          }
        }
      }
    `

    const { data, errors } = await mutate({
      mutation: DELETE_SERVICE,
      variables: {
        serviceId: serviceId
      }
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      deleteService: {
        ...service,
        state: State.IN_DELETION
      }
    });

  });

});
