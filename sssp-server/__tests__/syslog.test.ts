import { gql } from 'apollo-server-express';
import { testClient, connectDb, closeDb, stopDb } from './config/mongo';
import {beforeAll, afterAll, describe, it, expect} from'@jest/globals';
import { State } from '../src/models';
import { Protocol } from '../src/models/syslog';

const { query, mutate } = testClient;

beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await closeDb();
  await stopDb();
});

describe("Syslog resolvers", () => {

  const syslogId = 'testId';

  const syslogInput = {
    serviceId: 'test-service',
    index: 'test-index',
    sourcetype: 'test-sourcetype',
    port: 514,
    protocol: Protocol.UDP,
    hosts: ['test-host'],
    environmentIds: ['Prod']
  }

  const syslog = {
    _id: syslogId,
    ...syslogInput,
    state: State.IN_CREATION,
    changes: null
  }

  it("Put syslog", async () => {
    const PUT_SYSLOG = gql`
      mutation PutSyslog( $syslogId: String!, $syslogInput: SyslogInput!) {
        putSyslog(syslogId: $syslogId, syslogInput: $syslogInput) {
          _id
          serviceId
          index
          sourcetype
          port
          protocol
          hosts
          environmentIds
          state
          changes {
            index
            sourcetype
            port
            protocol
            hosts
            environmentIds
          }
        }
      }
    `

    const { data, errors } = await mutate({
      mutation: PUT_SYSLOG,
      variables: {
        syslogId: syslogId,
        syslogInput: syslogInput
      }
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      putSyslog: {
        ...syslog
      }
    });

  });

  it("Get syslogs", async () => {
    const GET_SYSLOGS = gql`
      query GetSyslogs {
        syslogs {
          _id
          serviceId
          index
          sourcetype
          port
          protocol
          hosts
          environmentIds
          state
          changes {
            index
            sourcetype
            port
            protocol
            hosts
            environmentIds
          }
        }
      }
    `

    const { data, errors } = await query({
      query: GET_SYSLOGS
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      syslogs: [{
        ...syslog
      }]
    });
  });

  it("Delete syslog", async () => {
    const DELETE_SYSLOG = gql`
      mutation DeleteSyslog( $syslogId: String!) {
        deleteSyslog(syslogId: $syslogId) {
          _id
          serviceId
          index
          sourcetype
          port
          protocol
          hosts
          environmentIds
          state
          changes {
            index
            sourcetype
            port
            protocol
            hosts
            environmentIds
          }
        }
      }
    `

    const { data, errors } = await mutate({
      mutation: DELETE_SYSLOG,
      variables: {
        syslogId: syslogId
      }
    });

    if(errors) {
      console.log(errors);
    }

    expect(data).toEqual({
      deleteSyslog: {
        ...syslog,
        state: State.IN_DELETION
      }
    });

  });

});
