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

describe("App resolvers", () => {

  
  const appId = 'testId';

  const appInput = {
    serviceId: 'test-service',
    url: 'https://splunkbase.splunk.com/app/1111/',
    version: 'latest',
    git: false,
    environmentIds: ['prod']
  }

  const app = {
    _id: appId,
    ...appInput,
    state: State.IN_CREATION,
    changes: null
  }

  it("Put app", async () => {
    const PUT_APP = gql`
      mutation PutApp( $appId: String!, $appInput: AppInput!) {
        putApp(appId: $appId, appInput: $appInput) {
          _id
          serviceId
          url
          version
          git
          environmentIds
          state
          changes {
            url
            version
            git
            environmentIds
          }
        }
      }
    `

    const { data, errors } = await mutate({
      mutation: PUT_APP,
      variables: {
        appId: appId,
        appInput: appInput
      }
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      putApp: {
        ...app
      }
    });

  });

  it("Get apps", async () => {
    const GET_APPS = gql`
      query GetApps {
        apps {
          _id
          serviceId
          url
          version
          git
          environmentIds
          state
          changes {
            url
            version
            git
            environmentIds
          }
        }
      }
    `

    const { data, errors } = await query({
      query: GET_APPS
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      apps: [{
        ...app
      }]
    });
  });

  it("Delete app", async () => {
    const DELETE_APP = gql`
      mutation DeleteApp( $appId: String!) {
        deleteApp(appId: $appId) {
          _id
          serviceId
          url
          version
          git
          environmentIds
          state
          changes {
            url
            version
            git
            environmentIds
          }
        }
      }
    `

    const { data, errors } = await mutate({
      mutation: DELETE_APP,
      variables: {
        appId: appId
      }
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      deleteApp: {
        ...app,
        state: State.IN_DELETION
      }
    });

  });

});
