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

describe("Index resolvers", () => {

  const indexId = 'testId';

  const indexInput = {
    serviceId: 'test-service',
    maxTotalDataSizeMB: 7000000,
    frozenTimePeriodInSecs: 7000000,
    environmentIds: ['Prod']
  }

  const index = {
    _id: indexId,
    ...indexInput,
    state: State.IN_CREATION,
    changes: null
  }

  it("Put index", async () => {
    const PUT_INDEX = gql`
      mutation PutIndex( $indexId: String!, $indexInput: IndexInput!) {
        putIndex(indexId: $indexId, indexInput: $indexInput) {
          _id
          serviceId
          maxTotalDataSizeMB
          frozenTimePeriodInSecs
          environmentIds
          state
          changes {
            maxTotalDataSizeMB
            frozenTimePeriodInSecs
            environmentIds
          }
        }
      }
    `

    const { data, errors } = await mutate({
      mutation: PUT_INDEX,
      variables: {
        indexId: indexId,
        indexInput: indexInput
      }
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      putIndex: {
        ...index
      }
    });

  });

  it("Get indexes", async () => {
    const GET_INDEXES = gql`
      query GetIndexes {
        indexes {
          _id
          serviceId
          maxTotalDataSizeMB
          frozenTimePeriodInSecs
          environmentIds
          state
          changes {
            maxTotalDataSizeMB
            frozenTimePeriodInSecs
            environmentIds
          }
        }
      }
    `

    const { data, errors } = await query({
      query: GET_INDEXES
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      indexes: [{
        ...index
      }]
    });
  });

  it("Delete index", async () => {
    const DELETE_INDEX = gql`
      mutation DeleteIndex( $indexId: String!) {
        deleteIndex(indexId: $indexId) {
          _id
          serviceId
          maxTotalDataSizeMB
          frozenTimePeriodInSecs
          environmentIds
          state
          changes {
            maxTotalDataSizeMB
            frozenTimePeriodInSecs
            environmentIds
          }
        }
      }
    `

    const { data, errors } = await mutate({
      mutation: DELETE_INDEX,
      variables: {
        indexId: indexId
      }
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      deleteIndex: {
        ...index,
        state: State.IN_DELETION
      }
    });

  });

});
