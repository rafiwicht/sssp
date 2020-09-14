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

describe("Http resolvers", () => {

  const httpId = 'testId';

  const httpInput = {
    serviceId: 'test-service',
    token: '873ebf91-4d79-472f-b646-a7fc2f920fc4',
    environmentIds: ['Prod']
  }

  const http = {
    _id: httpId,
    ...httpInput,
    state: State.IN_CREATION,
    changes: null
  }

  it("Put http", async () => {
    const PUT_HTTP = gql`
      mutation PutHttp( $httpId: String!, $httpInput: HttpInput!) {
        putHttp(httpId: $httpId, httpInput: $httpInput) {
          _id
          serviceId
          token
          environmentIds
          state
          changes {
            token
            environmentIds
          }
        }
      }
    `

    const { data, errors } = await mutate({
      mutation: PUT_HTTP,
      variables: {
        httpId: httpId,
        httpInput: httpInput
      }
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      putHttp: {
        ...http
      }
    });

  });

  it("Get https", async () => {
    const GET_HTTPS = gql`
      query GetHtpps {
        https {
          _id
          serviceId
          token
          environmentIds
          state
          changes {
            token
            environmentIds
          }
        }
      }
    `

    const { data, errors } = await query({
      query: GET_HTTPS
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      https: [{
        ...http
      }]
    });
  });

  it("Delete http", async () => {
    const DELETE_HTTP = gql`
      mutation DeleteHttp( $httpId: String!) {
        deleteHttp(httpId: $httpId) {
          _id
          serviceId
          token
          environmentIds
          state
          changes {
            token
            environmentIds
          }
        }
      }
    `

    const { data, errors } = await mutate({
      mutation: DELETE_HTTP,
      variables: {
        httpId: httpId
      }
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      deleteHttp: {
        ...http,
        state: State.IN_DELETION
      }
    });

  });

});
