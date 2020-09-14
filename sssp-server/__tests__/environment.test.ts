import { gql } from 'apollo-server-express';
import { testClient, connectDb, closeDb, stopDb } from './config/mongo';
import {beforeAll, afterAll, describe, it, expect} from'@jest/globals';

const { query, mutate } = testClient;

beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await closeDb();
  await stopDb();
});

describe("Environment resolvers", () => {

  const environmentId = 'testId';

  const environmentInput = {
    userAccess: true
  }

  const environment = {
    _id: environmentId,
    ...environmentInput
  }

  it("Put environment", async () => {
    const PUT_ENVIRONMENT = gql`
      mutation PutEnvironment( $environmentId: String!, $environmentInput: EnvironmentInput!) {
        putEnvironment(environmentId: $environmentId, environmentInput: $environmentInput) {
          _id
          userAccess
        }
      }
    `

    const { data, errors } = await mutate({
      mutation: PUT_ENVIRONMENT,
      variables: {
        environmentId: environmentId,
        environmentInput: environmentInput
      }
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      putEnvironment: {
        ...environment
      }
    });

  });

  it("Get environments", async () => {
    const GET_ENVIRONMENTS = gql`
      query GetEnvironments {
        environments {
          _id
          userAccess
        }
      }
    `

    const { data, errors } = await query({
      query: GET_ENVIRONMENTS
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      environments: [{
        ...environment
      }]
    });
  });

  it("Delete environment", async () => {
    const DELETE_ENVIRONMENT = gql`
      mutation DeleteEnvironment( $environmentId: String!) {
        deleteEnvironment(environmentId: $environmentId) {
          _id
          userAccess
        }
      }
    `

    const { data, errors } = await mutate({
      mutation: DELETE_ENVIRONMENT,
      variables: {
        environmentId: environmentId
      }
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      deleteEnvironment: {
        ...environment
      }
    });

  });

});
