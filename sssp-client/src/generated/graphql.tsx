import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  apps: Array<App>;
  app: App;
  environments: Array<Environment>;
  https: Array<Http>;
  http: Http;
  indexes: Array<Index>;
  index: Index;
  servers: Array<Server>;
  server: Server;
  services: Array<Service>;
  service: Service;
  syslogs: Array<Syslog>;
  syslog: Syslog;
};


export type QueryAppsArgs = {
  serviceId?: Maybe<Scalars['String']>;
};


export type QueryAppArgs = {
  appId: Scalars['String'];
};


export type QueryHttpsArgs = {
  serviceId?: Maybe<Scalars['String']>;
};


export type QueryHttpArgs = {
  httpId: Scalars['String'];
};


export type QueryIndexesArgs = {
  serviceId?: Maybe<Scalars['String']>;
};


export type QueryIndexArgs = {
  indexId: Scalars['String'];
};


export type QueryServersArgs = {
  serviceId?: Maybe<Scalars['String']>;
};


export type QueryServerArgs = {
  serverId: Scalars['String'];
};


export type QueryServiceArgs = {
  serviceId: Scalars['String'];
};


export type QuerySyslogsArgs = {
  serviceId?: Maybe<Scalars['String']>;
};


export type QuerySyslogArgs = {
  syslogId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  putApp: App;
  deleteApp: App;
  putEnvironment: Environment;
  deleteEnvironment: Environment;
  putHttp: Http;
  deleteHttp: Http;
  putIndex: Index;
  deleteIndex: Index;
  putServer: Server;
  deleteServer: Server;
  putService: Service;
  deleteService: Service;
  putSyslog: Syslog;
  deleteSyslog: Syslog;
};


export type MutationPutAppArgs = {
  appId: Scalars['String'];
  appInput: AppInput;
};


export type MutationDeleteAppArgs = {
  appId: Scalars['String'];
};


export type MutationPutEnvironmentArgs = {
  environmentId: Scalars['String'];
  environmentInput: EnvironmentInput;
};


export type MutationDeleteEnvironmentArgs = {
  environmentId: Scalars['String'];
};


export type MutationPutHttpArgs = {
  httpId: Scalars['String'];
  httpInput: HttpInput;
};


export type MutationDeleteHttpArgs = {
  httpId: Scalars['String'];
};


export type MutationPutIndexArgs = {
  indexId: Scalars['String'];
  indexInput: IndexInput;
};


export type MutationDeleteIndexArgs = {
  indexId: Scalars['String'];
};


export type MutationPutServerArgs = {
  serverId: Scalars['String'];
  serverInput: ServerInput;
};


export type MutationDeleteServerArgs = {
  serverId: Scalars['String'];
};


export type MutationPutServiceArgs = {
  serviceId: Scalars['String'];
  serviceInput: ServiceInput;
};


export type MutationDeleteServiceArgs = {
  serviceId: Scalars['String'];
};


export type MutationPutSyslogArgs = {
  syslogId: Scalars['String'];
  syslogInput: SyslogInput;
};


export type MutationDeleteSyslogArgs = {
  syslogId: Scalars['String'];
};

export enum State {
  InCreation = 'IN_CREATION',
  Active = 'ACTIVE',
  InDeletion = 'IN_DELETION',
  InModification = 'IN_MODIFICATION'
}

export type AppChanges = {
  __typename?: 'AppChanges';
  url: Scalars['String'];
  version: Scalars['String'];
  git: Scalars['Boolean'];
  environmentIds: Array<Scalars['String']>;
};

export type App = {
  __typename?: 'App';
  _id: Scalars['String'];
  serviceId: Scalars['String'];
  url: Scalars['String'];
  version: Scalars['String'];
  git: Scalars['Boolean'];
  environmentIds: Array<Scalars['String']>;
  state: State;
  changes?: Maybe<AppChanges>;
};

export type AppInput = {
  serviceId: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  git?: Maybe<Scalars['Boolean']>;
  environmentIds?: Maybe<Array<Scalars['String']>>;
};

export type Environment = {
  __typename?: 'Environment';
  _id: Scalars['String'];
  userAccess: Scalars['Boolean'];
};

export type EnvironmentInput = {
  userAccess?: Maybe<Scalars['Boolean']>;
};

export type HttpChanges = {
  __typename?: 'HttpChanges';
  token: Scalars['String'];
  environmentIds: Array<Scalars['String']>;
};

export type Http = {
  __typename?: 'Http';
  _id: Scalars['String'];
  serviceId: Scalars['String'];
  token: Scalars['String'];
  environmentIds: Array<Scalars['String']>;
  state: State;
  changes?: Maybe<HttpChanges>;
};

export type HttpInput = {
  serviceId: Scalars['String'];
  token: Scalars['String'];
  environmentIds?: Maybe<Array<Scalars['String']>>;
};

export type IndexChanges = {
  __typename?: 'IndexChanges';
  maxTotalDataSizeMB: Scalars['Int'];
  frozenTimePeriodInSecs: Scalars['Int'];
  environmentIds: Array<Scalars['String']>;
};

export type Index = {
  __typename?: 'Index';
  _id: Scalars['String'];
  serviceId: Scalars['String'];
  maxTotalDataSizeMB: Scalars['Int'];
  frozenTimePeriodInSecs: Scalars['Int'];
  environmentIds: Array<Scalars['String']>;
  state: State;
  changes?: Maybe<IndexChanges>;
};

export type IndexInput = {
  serviceId: Scalars['String'];
  maxTotalDataSizeMB?: Maybe<Scalars['Int']>;
  frozenTimePeriodInSecs?: Maybe<Scalars['Int']>;
  environmentIds?: Maybe<Array<Scalars['String']>>;
};

export type ServerChanges = {
  __typename?: 'ServerChanges';
  hosts: Array<Scalars['String']>;
  appIds: Array<Scalars['String']>;
  environmentIds: Array<Scalars['String']>;
};

export type Server = {
  __typename?: 'Server';
  _id: Scalars['String'];
  serviceId: Scalars['String'];
  hosts: Array<Scalars['String']>;
  appIds: Array<Scalars['String']>;
  environmentIds: Array<Scalars['String']>;
  state: State;
  changes?: Maybe<ServerChanges>;
};

export type ServerInput = {
  serviceId: Scalars['String'];
  hosts?: Maybe<Array<Scalars['String']>>;
  appIds?: Maybe<Array<Scalars['String']>>;
  environmentIds?: Maybe<Array<Scalars['String']>>;
};

export type ServiceChanges = {
  __typename?: 'ServiceChanges';
  owner: Scalars['String'];
  description: Scalars['String'];
  dataClassification: Scalars['String'];
};

export type Service = {
  __typename?: 'Service';
  _id: Scalars['String'];
  owner: Scalars['String'];
  description: Scalars['String'];
  dataClassification: Scalars['String'];
  state: State;
  changes?: Maybe<ServiceChanges>;
};

export type ServiceInput = {
  owner: Scalars['String'];
  description: Scalars['String'];
  dataClassification: Scalars['String'];
};

export enum Protocol {
  Tcp = 'TCP',
  Udp = 'UDP'
}

export type SyslogChanges = {
  __typename?: 'SyslogChanges';
  index: Scalars['String'];
  sourcetype: Scalars['String'];
  port?: Maybe<Scalars['Int']>;
  protocol?: Maybe<Protocol>;
  hosts?: Maybe<Array<Scalars['String']>>;
  environmentIds?: Maybe<Array<Scalars['String']>>;
};

export type Syslog = {
  __typename?: 'Syslog';
  _id: Scalars['String'];
  serviceId: Scalars['String'];
  index: Scalars['String'];
  sourcetype: Scalars['String'];
  port: Scalars['Int'];
  protocol: Protocol;
  hosts: Array<Scalars['String']>;
  environmentIds: Array<Scalars['String']>;
  state: State;
  changes?: Maybe<SyslogChanges>;
};

export type SyslogInput = {
  serviceId: Scalars['String'];
  index: Scalars['String'];
  sourcetype: Scalars['String'];
  port?: Maybe<Scalars['Int']>;
  protocol?: Maybe<Protocol>;
  hosts?: Maybe<Array<Scalars['String']>>;
  environmentIds?: Maybe<Array<Scalars['String']>>;
};

export type GetAppsQueryVariables = Exact<{
  serviceId: Scalars['String'];
}>;


export type GetAppsQuery = (
  { __typename?: 'Query' }
  & { apps: Array<(
    { __typename?: 'App' }
    & Pick<App, '_id' | 'serviceId' | 'url' | 'version' | 'git' | 'environmentIds' | 'state'>
  )> }
);

export type PutAppMutationVariables = Exact<{
  appId: Scalars['String'];
  appInput: AppInput;
}>;


export type PutAppMutation = (
  { __typename?: 'Mutation' }
  & { putApp: (
    { __typename?: 'App' }
    & Pick<App, '_id'>
  ) }
);

export type DeleteAppMutationVariables = Exact<{
  appId: Scalars['String'];
}>;


export type DeleteAppMutation = (
  { __typename?: 'Mutation' }
  & { deleteApp: (
    { __typename?: 'App' }
    & Pick<App, '_id'>
  ) }
);

export type GetEnvironmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEnvironmentsQuery = (
  { __typename?: 'Query' }
  & { environments: Array<(
    { __typename?: 'Environment' }
    & Pick<Environment, '_id' | 'userAccess'>
  )> }
);

export type PutEnvironmentMutationVariables = Exact<{
  environmentId: Scalars['String'];
  environmentInput: EnvironmentInput;
}>;


export type PutEnvironmentMutation = (
  { __typename?: 'Mutation' }
  & { putEnvironment: (
    { __typename?: 'Environment' }
    & Pick<Environment, '_id'>
  ) }
);

export type DeleteEnvironmentMutationVariables = Exact<{
  environmentId: Scalars['String'];
}>;


export type DeleteEnvironmentMutation = (
  { __typename?: 'Mutation' }
  & { deleteEnvironment: (
    { __typename?: 'Environment' }
    & Pick<Environment, '_id'>
  ) }
);

export type GetHttpsQueryVariables = Exact<{
  serviceId: Scalars['String'];
}>;


export type GetHttpsQuery = (
  { __typename?: 'Query' }
  & { https: Array<(
    { __typename?: 'Http' }
    & Pick<Http, '_id' | 'serviceId' | 'token' | 'environmentIds' | 'state'>
  )> }
);

export type PutHttpMutationVariables = Exact<{
  httpId: Scalars['String'];
  httpInput: HttpInput;
}>;


export type PutHttpMutation = (
  { __typename?: 'Mutation' }
  & { putHttp: (
    { __typename?: 'Http' }
    & Pick<Http, '_id'>
  ) }
);

export type DeleteHttpMutationVariables = Exact<{
  httpId: Scalars['String'];
}>;


export type DeleteHttpMutation = (
  { __typename?: 'Mutation' }
  & { deleteHttp: (
    { __typename?: 'Http' }
    & Pick<Http, '_id'>
  ) }
);

export type GetIndexesQueryVariables = Exact<{
  serviceId: Scalars['String'];
}>;


export type GetIndexesQuery = (
  { __typename?: 'Query' }
  & { indexes: Array<(
    { __typename?: 'Index' }
    & Pick<Index, '_id' | 'serviceId' | 'maxTotalDataSizeMB' | 'frozenTimePeriodInSecs' | 'environmentIds' | 'state'>
  )> }
);

export type PutIndexMutationVariables = Exact<{
  indexId: Scalars['String'];
  indexInput: IndexInput;
}>;


export type PutIndexMutation = (
  { __typename?: 'Mutation' }
  & { putIndex: (
    { __typename?: 'Index' }
    & Pick<Index, '_id'>
  ) }
);

export type DeleteIndexMutationVariables = Exact<{
  indexId: Scalars['String'];
}>;


export type DeleteIndexMutation = (
  { __typename?: 'Mutation' }
  & { deleteIndex: (
    { __typename?: 'Index' }
    & Pick<Index, '_id'>
  ) }
);

export type GetServersQueryVariables = Exact<{
  serviceId: Scalars['String'];
}>;


export type GetServersQuery = (
  { __typename?: 'Query' }
  & { servers: Array<(
    { __typename?: 'Server' }
    & Pick<Server, '_id' | 'serviceId' | 'hosts' | 'appIds' | 'environmentIds' | 'state'>
  )> }
);

export type PutServerMutationVariables = Exact<{
  serverId: Scalars['String'];
  serverInput: ServerInput;
}>;


export type PutServerMutation = (
  { __typename?: 'Mutation' }
  & { putServer: (
    { __typename?: 'Server' }
    & Pick<Server, '_id'>
  ) }
);

export type DeleteServerMutationVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type DeleteServerMutation = (
  { __typename?: 'Mutation' }
  & { deleteServer: (
    { __typename?: 'Server' }
    & Pick<Server, '_id'>
  ) }
);

export type GetServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServicesQuery = (
  { __typename?: 'Query' }
  & { services: Array<(
    { __typename?: 'Service' }
    & Pick<Service, '_id' | 'owner' | 'dataClassification' | 'state'>
  )> }
);

export type GetServiceQueryVariables = Exact<{
  serviceId: Scalars['String'];
}>;


export type GetServiceQuery = (
  { __typename?: 'Query' }
  & { service: (
    { __typename?: 'Service' }
    & Pick<Service, '_id' | 'owner' | 'dataClassification' | 'description' | 'state'>
  ) }
);

export type PutServiceMutationVariables = Exact<{
  serviceId: Scalars['String'];
  serviceInput: ServiceInput;
}>;


export type PutServiceMutation = (
  { __typename?: 'Mutation' }
  & { putService: (
    { __typename?: 'Service' }
    & Pick<Service, '_id'>
  ) }
);

export type DeleteServiceMutationVariables = Exact<{
  serviceId: Scalars['String'];
}>;


export type DeleteServiceMutation = (
  { __typename?: 'Mutation' }
  & { deleteService: (
    { __typename?: 'Service' }
    & Pick<Service, '_id'>
  ) }
);

export type GetSyslogsQueryVariables = Exact<{
  serviceId: Scalars['String'];
}>;


export type GetSyslogsQuery = (
  { __typename?: 'Query' }
  & { syslogs: Array<(
    { __typename?: 'Syslog' }
    & Pick<Syslog, '_id' | 'serviceId' | 'index' | 'sourcetype' | 'port' | 'protocol' | 'hosts' | 'environmentIds' | 'state'>
  )> }
);

export type PutSyslogMutationVariables = Exact<{
  syslogId: Scalars['String'];
  syslogInput: SyslogInput;
}>;


export type PutSyslogMutation = (
  { __typename?: 'Mutation' }
  & { putSyslog: (
    { __typename?: 'Syslog' }
    & Pick<Syslog, '_id'>
  ) }
);

export type DeleteSyslogMutationVariables = Exact<{
  syslogId: Scalars['String'];
}>;


export type DeleteSyslogMutation = (
  { __typename?: 'Mutation' }
  & { deleteSyslog: (
    { __typename?: 'Syslog' }
    & Pick<Syslog, '_id'>
  ) }
);


export const GetAppsDocument = gql`
    query GetApps($serviceId: String!) {
  apps(serviceId: $serviceId) {
    _id
    serviceId
    url
    version
    git
    environmentIds
    state
  }
}
    `;
export type GetAppsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAppsQuery, GetAppsQueryVariables>, 'query'> & ({ variables: GetAppsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetAppsComponent = (props: GetAppsComponentProps) => (
      <ApolloReactComponents.Query<GetAppsQuery, GetAppsQueryVariables> query={GetAppsDocument} {...props} />
    );
    
export type GetAppsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetAppsQuery, GetAppsQueryVariables>
    } & TChildProps;
export function withGetApps<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAppsQuery,
  GetAppsQueryVariables,
  GetAppsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetAppsQuery, GetAppsQueryVariables, GetAppsProps<TChildProps, TDataName>>(GetAppsDocument, {
      alias: 'getApps',
      ...operationOptions
    });
};

/**
 * __useGetAppsQuery__
 *
 * To run a query within a React component, call `useGetAppsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppsQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetAppsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAppsQuery, GetAppsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAppsQuery, GetAppsQueryVariables>(GetAppsDocument, baseOptions);
      }
export function useGetAppsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAppsQuery, GetAppsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAppsQuery, GetAppsQueryVariables>(GetAppsDocument, baseOptions);
        }
export type GetAppsQueryHookResult = ReturnType<typeof useGetAppsQuery>;
export type GetAppsLazyQueryHookResult = ReturnType<typeof useGetAppsLazyQuery>;
export type GetAppsQueryResult = ApolloReactCommon.QueryResult<GetAppsQuery, GetAppsQueryVariables>;
export const PutAppDocument = gql`
    mutation PutApp($appId: String!, $appInput: AppInput!) {
  putApp(appId: $appId, appInput: $appInput) {
    _id
  }
}
    `;
export type PutAppMutationFn = ApolloReactCommon.MutationFunction<PutAppMutation, PutAppMutationVariables>;
export type PutAppComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<PutAppMutation, PutAppMutationVariables>, 'mutation'>;

    export const PutAppComponent = (props: PutAppComponentProps) => (
      <ApolloReactComponents.Mutation<PutAppMutation, PutAppMutationVariables> mutation={PutAppDocument} {...props} />
    );
    
export type PutAppProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<PutAppMutation, PutAppMutationVariables>
    } & TChildProps;
export function withPutApp<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PutAppMutation,
  PutAppMutationVariables,
  PutAppProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, PutAppMutation, PutAppMutationVariables, PutAppProps<TChildProps, TDataName>>(PutAppDocument, {
      alias: 'putApp',
      ...operationOptions
    });
};

/**
 * __usePutAppMutation__
 *
 * To run a mutation, you first call `usePutAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePutAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [putAppMutation, { data, loading, error }] = usePutAppMutation({
 *   variables: {
 *      appId: // value for 'appId'
 *      appInput: // value for 'appInput'
 *   },
 * });
 */
export function usePutAppMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PutAppMutation, PutAppMutationVariables>) {
        return ApolloReactHooks.useMutation<PutAppMutation, PutAppMutationVariables>(PutAppDocument, baseOptions);
      }
export type PutAppMutationHookResult = ReturnType<typeof usePutAppMutation>;
export type PutAppMutationResult = ApolloReactCommon.MutationResult<PutAppMutation>;
export type PutAppMutationOptions = ApolloReactCommon.BaseMutationOptions<PutAppMutation, PutAppMutationVariables>;
export const DeleteAppDocument = gql`
    mutation DeleteApp($appId: String!) {
  deleteApp(appId: $appId) {
    _id
  }
}
    `;
export type DeleteAppMutationFn = ApolloReactCommon.MutationFunction<DeleteAppMutation, DeleteAppMutationVariables>;
export type DeleteAppComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteAppMutation, DeleteAppMutationVariables>, 'mutation'>;

    export const DeleteAppComponent = (props: DeleteAppComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteAppMutation, DeleteAppMutationVariables> mutation={DeleteAppDocument} {...props} />
    );
    
export type DeleteAppProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteAppMutation, DeleteAppMutationVariables>
    } & TChildProps;
export function withDeleteApp<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteAppMutation,
  DeleteAppMutationVariables,
  DeleteAppProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteAppMutation, DeleteAppMutationVariables, DeleteAppProps<TChildProps, TDataName>>(DeleteAppDocument, {
      alias: 'deleteApp',
      ...operationOptions
    });
};

/**
 * __useDeleteAppMutation__
 *
 * To run a mutation, you first call `useDeleteAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAppMutation, { data, loading, error }] = useDeleteAppMutation({
 *   variables: {
 *      appId: // value for 'appId'
 *   },
 * });
 */
export function useDeleteAppMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteAppMutation, DeleteAppMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteAppMutation, DeleteAppMutationVariables>(DeleteAppDocument, baseOptions);
      }
export type DeleteAppMutationHookResult = ReturnType<typeof useDeleteAppMutation>;
export type DeleteAppMutationResult = ApolloReactCommon.MutationResult<DeleteAppMutation>;
export type DeleteAppMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteAppMutation, DeleteAppMutationVariables>;
export const GetEnvironmentsDocument = gql`
    query GetEnvironments {
  environments {
    _id
    userAccess
  }
}
    `;
export type GetEnvironmentsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetEnvironmentsQuery, GetEnvironmentsQueryVariables>, 'query'>;

    export const GetEnvironmentsComponent = (props: GetEnvironmentsComponentProps) => (
      <ApolloReactComponents.Query<GetEnvironmentsQuery, GetEnvironmentsQueryVariables> query={GetEnvironmentsDocument} {...props} />
    );
    
export type GetEnvironmentsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetEnvironmentsQuery, GetEnvironmentsQueryVariables>
    } & TChildProps;
export function withGetEnvironments<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetEnvironmentsQuery,
  GetEnvironmentsQueryVariables,
  GetEnvironmentsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetEnvironmentsQuery, GetEnvironmentsQueryVariables, GetEnvironmentsProps<TChildProps, TDataName>>(GetEnvironmentsDocument, {
      alias: 'getEnvironments',
      ...operationOptions
    });
};

/**
 * __useGetEnvironmentsQuery__
 *
 * To run a query within a React component, call `useGetEnvironmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEnvironmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEnvironmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEnvironmentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetEnvironmentsQuery, GetEnvironmentsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetEnvironmentsQuery, GetEnvironmentsQueryVariables>(GetEnvironmentsDocument, baseOptions);
      }
export function useGetEnvironmentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEnvironmentsQuery, GetEnvironmentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetEnvironmentsQuery, GetEnvironmentsQueryVariables>(GetEnvironmentsDocument, baseOptions);
        }
export type GetEnvironmentsQueryHookResult = ReturnType<typeof useGetEnvironmentsQuery>;
export type GetEnvironmentsLazyQueryHookResult = ReturnType<typeof useGetEnvironmentsLazyQuery>;
export type GetEnvironmentsQueryResult = ApolloReactCommon.QueryResult<GetEnvironmentsQuery, GetEnvironmentsQueryVariables>;
export const PutEnvironmentDocument = gql`
    mutation PutEnvironment($environmentId: String!, $environmentInput: EnvironmentInput!) {
  putEnvironment(environmentId: $environmentId, environmentInput: $environmentInput) {
    _id
  }
}
    `;
export type PutEnvironmentMutationFn = ApolloReactCommon.MutationFunction<PutEnvironmentMutation, PutEnvironmentMutationVariables>;
export type PutEnvironmentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<PutEnvironmentMutation, PutEnvironmentMutationVariables>, 'mutation'>;

    export const PutEnvironmentComponent = (props: PutEnvironmentComponentProps) => (
      <ApolloReactComponents.Mutation<PutEnvironmentMutation, PutEnvironmentMutationVariables> mutation={PutEnvironmentDocument} {...props} />
    );
    
export type PutEnvironmentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<PutEnvironmentMutation, PutEnvironmentMutationVariables>
    } & TChildProps;
export function withPutEnvironment<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PutEnvironmentMutation,
  PutEnvironmentMutationVariables,
  PutEnvironmentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, PutEnvironmentMutation, PutEnvironmentMutationVariables, PutEnvironmentProps<TChildProps, TDataName>>(PutEnvironmentDocument, {
      alias: 'putEnvironment',
      ...operationOptions
    });
};

/**
 * __usePutEnvironmentMutation__
 *
 * To run a mutation, you first call `usePutEnvironmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePutEnvironmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [putEnvironmentMutation, { data, loading, error }] = usePutEnvironmentMutation({
 *   variables: {
 *      environmentId: // value for 'environmentId'
 *      environmentInput: // value for 'environmentInput'
 *   },
 * });
 */
export function usePutEnvironmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PutEnvironmentMutation, PutEnvironmentMutationVariables>) {
        return ApolloReactHooks.useMutation<PutEnvironmentMutation, PutEnvironmentMutationVariables>(PutEnvironmentDocument, baseOptions);
      }
export type PutEnvironmentMutationHookResult = ReturnType<typeof usePutEnvironmentMutation>;
export type PutEnvironmentMutationResult = ApolloReactCommon.MutationResult<PutEnvironmentMutation>;
export type PutEnvironmentMutationOptions = ApolloReactCommon.BaseMutationOptions<PutEnvironmentMutation, PutEnvironmentMutationVariables>;
export const DeleteEnvironmentDocument = gql`
    mutation DeleteEnvironment($environmentId: String!) {
  deleteEnvironment(environmentId: $environmentId) {
    _id
  }
}
    `;
export type DeleteEnvironmentMutationFn = ApolloReactCommon.MutationFunction<DeleteEnvironmentMutation, DeleteEnvironmentMutationVariables>;
export type DeleteEnvironmentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteEnvironmentMutation, DeleteEnvironmentMutationVariables>, 'mutation'>;

    export const DeleteEnvironmentComponent = (props: DeleteEnvironmentComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteEnvironmentMutation, DeleteEnvironmentMutationVariables> mutation={DeleteEnvironmentDocument} {...props} />
    );
    
export type DeleteEnvironmentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteEnvironmentMutation, DeleteEnvironmentMutationVariables>
    } & TChildProps;
export function withDeleteEnvironment<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteEnvironmentMutation,
  DeleteEnvironmentMutationVariables,
  DeleteEnvironmentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteEnvironmentMutation, DeleteEnvironmentMutationVariables, DeleteEnvironmentProps<TChildProps, TDataName>>(DeleteEnvironmentDocument, {
      alias: 'deleteEnvironment',
      ...operationOptions
    });
};

/**
 * __useDeleteEnvironmentMutation__
 *
 * To run a mutation, you first call `useDeleteEnvironmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEnvironmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEnvironmentMutation, { data, loading, error }] = useDeleteEnvironmentMutation({
 *   variables: {
 *      environmentId: // value for 'environmentId'
 *   },
 * });
 */
export function useDeleteEnvironmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteEnvironmentMutation, DeleteEnvironmentMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteEnvironmentMutation, DeleteEnvironmentMutationVariables>(DeleteEnvironmentDocument, baseOptions);
      }
export type DeleteEnvironmentMutationHookResult = ReturnType<typeof useDeleteEnvironmentMutation>;
export type DeleteEnvironmentMutationResult = ApolloReactCommon.MutationResult<DeleteEnvironmentMutation>;
export type DeleteEnvironmentMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteEnvironmentMutation, DeleteEnvironmentMutationVariables>;
export const GetHttpsDocument = gql`
    query GetHttps($serviceId: String!) {
  https(serviceId: $serviceId) {
    _id
    serviceId
    token
    environmentIds
    state
  }
}
    `;
export type GetHttpsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetHttpsQuery, GetHttpsQueryVariables>, 'query'> & ({ variables: GetHttpsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetHttpsComponent = (props: GetHttpsComponentProps) => (
      <ApolloReactComponents.Query<GetHttpsQuery, GetHttpsQueryVariables> query={GetHttpsDocument} {...props} />
    );
    
export type GetHttpsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetHttpsQuery, GetHttpsQueryVariables>
    } & TChildProps;
export function withGetHttps<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetHttpsQuery,
  GetHttpsQueryVariables,
  GetHttpsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetHttpsQuery, GetHttpsQueryVariables, GetHttpsProps<TChildProps, TDataName>>(GetHttpsDocument, {
      alias: 'getHttps',
      ...operationOptions
    });
};

/**
 * __useGetHttpsQuery__
 *
 * To run a query within a React component, call `useGetHttpsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHttpsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHttpsQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetHttpsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetHttpsQuery, GetHttpsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetHttpsQuery, GetHttpsQueryVariables>(GetHttpsDocument, baseOptions);
      }
export function useGetHttpsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetHttpsQuery, GetHttpsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetHttpsQuery, GetHttpsQueryVariables>(GetHttpsDocument, baseOptions);
        }
export type GetHttpsQueryHookResult = ReturnType<typeof useGetHttpsQuery>;
export type GetHttpsLazyQueryHookResult = ReturnType<typeof useGetHttpsLazyQuery>;
export type GetHttpsQueryResult = ApolloReactCommon.QueryResult<GetHttpsQuery, GetHttpsQueryVariables>;
export const PutHttpDocument = gql`
    mutation PutHttp($httpId: String!, $httpInput: HttpInput!) {
  putHttp(httpId: $httpId, httpInput: $httpInput) {
    _id
  }
}
    `;
export type PutHttpMutationFn = ApolloReactCommon.MutationFunction<PutHttpMutation, PutHttpMutationVariables>;
export type PutHttpComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<PutHttpMutation, PutHttpMutationVariables>, 'mutation'>;

    export const PutHttpComponent = (props: PutHttpComponentProps) => (
      <ApolloReactComponents.Mutation<PutHttpMutation, PutHttpMutationVariables> mutation={PutHttpDocument} {...props} />
    );
    
export type PutHttpProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<PutHttpMutation, PutHttpMutationVariables>
    } & TChildProps;
export function withPutHttp<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PutHttpMutation,
  PutHttpMutationVariables,
  PutHttpProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, PutHttpMutation, PutHttpMutationVariables, PutHttpProps<TChildProps, TDataName>>(PutHttpDocument, {
      alias: 'putHttp',
      ...operationOptions
    });
};

/**
 * __usePutHttpMutation__
 *
 * To run a mutation, you first call `usePutHttpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePutHttpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [putHttpMutation, { data, loading, error }] = usePutHttpMutation({
 *   variables: {
 *      httpId: // value for 'httpId'
 *      httpInput: // value for 'httpInput'
 *   },
 * });
 */
export function usePutHttpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PutHttpMutation, PutHttpMutationVariables>) {
        return ApolloReactHooks.useMutation<PutHttpMutation, PutHttpMutationVariables>(PutHttpDocument, baseOptions);
      }
export type PutHttpMutationHookResult = ReturnType<typeof usePutHttpMutation>;
export type PutHttpMutationResult = ApolloReactCommon.MutationResult<PutHttpMutation>;
export type PutHttpMutationOptions = ApolloReactCommon.BaseMutationOptions<PutHttpMutation, PutHttpMutationVariables>;
export const DeleteHttpDocument = gql`
    mutation DeleteHttp($httpId: String!) {
  deleteHttp(httpId: $httpId) {
    _id
  }
}
    `;
export type DeleteHttpMutationFn = ApolloReactCommon.MutationFunction<DeleteHttpMutation, DeleteHttpMutationVariables>;
export type DeleteHttpComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteHttpMutation, DeleteHttpMutationVariables>, 'mutation'>;

    export const DeleteHttpComponent = (props: DeleteHttpComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteHttpMutation, DeleteHttpMutationVariables> mutation={DeleteHttpDocument} {...props} />
    );
    
export type DeleteHttpProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteHttpMutation, DeleteHttpMutationVariables>
    } & TChildProps;
export function withDeleteHttp<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteHttpMutation,
  DeleteHttpMutationVariables,
  DeleteHttpProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteHttpMutation, DeleteHttpMutationVariables, DeleteHttpProps<TChildProps, TDataName>>(DeleteHttpDocument, {
      alias: 'deleteHttp',
      ...operationOptions
    });
};

/**
 * __useDeleteHttpMutation__
 *
 * To run a mutation, you first call `useDeleteHttpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHttpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHttpMutation, { data, loading, error }] = useDeleteHttpMutation({
 *   variables: {
 *      httpId: // value for 'httpId'
 *   },
 * });
 */
export function useDeleteHttpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteHttpMutation, DeleteHttpMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteHttpMutation, DeleteHttpMutationVariables>(DeleteHttpDocument, baseOptions);
      }
export type DeleteHttpMutationHookResult = ReturnType<typeof useDeleteHttpMutation>;
export type DeleteHttpMutationResult = ApolloReactCommon.MutationResult<DeleteHttpMutation>;
export type DeleteHttpMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteHttpMutation, DeleteHttpMutationVariables>;
export const GetIndexesDocument = gql`
    query GetIndexes($serviceId: String!) {
  indexes(serviceId: $serviceId) {
    _id
    serviceId
    maxTotalDataSizeMB
    frozenTimePeriodInSecs
    environmentIds
    state
  }
}
    `;
export type GetIndexesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetIndexesQuery, GetIndexesQueryVariables>, 'query'> & ({ variables: GetIndexesQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetIndexesComponent = (props: GetIndexesComponentProps) => (
      <ApolloReactComponents.Query<GetIndexesQuery, GetIndexesQueryVariables> query={GetIndexesDocument} {...props} />
    );
    
export type GetIndexesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetIndexesQuery, GetIndexesQueryVariables>
    } & TChildProps;
export function withGetIndexes<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetIndexesQuery,
  GetIndexesQueryVariables,
  GetIndexesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetIndexesQuery, GetIndexesQueryVariables, GetIndexesProps<TChildProps, TDataName>>(GetIndexesDocument, {
      alias: 'getIndexes',
      ...operationOptions
    });
};

/**
 * __useGetIndexesQuery__
 *
 * To run a query within a React component, call `useGetIndexesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIndexesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIndexesQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetIndexesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetIndexesQuery, GetIndexesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetIndexesQuery, GetIndexesQueryVariables>(GetIndexesDocument, baseOptions);
      }
export function useGetIndexesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetIndexesQuery, GetIndexesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetIndexesQuery, GetIndexesQueryVariables>(GetIndexesDocument, baseOptions);
        }
export type GetIndexesQueryHookResult = ReturnType<typeof useGetIndexesQuery>;
export type GetIndexesLazyQueryHookResult = ReturnType<typeof useGetIndexesLazyQuery>;
export type GetIndexesQueryResult = ApolloReactCommon.QueryResult<GetIndexesQuery, GetIndexesQueryVariables>;
export const PutIndexDocument = gql`
    mutation PutIndex($indexId: String!, $indexInput: IndexInput!) {
  putIndex(indexId: $indexId, indexInput: $indexInput) {
    _id
  }
}
    `;
export type PutIndexMutationFn = ApolloReactCommon.MutationFunction<PutIndexMutation, PutIndexMutationVariables>;
export type PutIndexComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<PutIndexMutation, PutIndexMutationVariables>, 'mutation'>;

    export const PutIndexComponent = (props: PutIndexComponentProps) => (
      <ApolloReactComponents.Mutation<PutIndexMutation, PutIndexMutationVariables> mutation={PutIndexDocument} {...props} />
    );
    
export type PutIndexProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<PutIndexMutation, PutIndexMutationVariables>
    } & TChildProps;
export function withPutIndex<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PutIndexMutation,
  PutIndexMutationVariables,
  PutIndexProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, PutIndexMutation, PutIndexMutationVariables, PutIndexProps<TChildProps, TDataName>>(PutIndexDocument, {
      alias: 'putIndex',
      ...operationOptions
    });
};

/**
 * __usePutIndexMutation__
 *
 * To run a mutation, you first call `usePutIndexMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePutIndexMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [putIndexMutation, { data, loading, error }] = usePutIndexMutation({
 *   variables: {
 *      indexId: // value for 'indexId'
 *      indexInput: // value for 'indexInput'
 *   },
 * });
 */
export function usePutIndexMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PutIndexMutation, PutIndexMutationVariables>) {
        return ApolloReactHooks.useMutation<PutIndexMutation, PutIndexMutationVariables>(PutIndexDocument, baseOptions);
      }
export type PutIndexMutationHookResult = ReturnType<typeof usePutIndexMutation>;
export type PutIndexMutationResult = ApolloReactCommon.MutationResult<PutIndexMutation>;
export type PutIndexMutationOptions = ApolloReactCommon.BaseMutationOptions<PutIndexMutation, PutIndexMutationVariables>;
export const DeleteIndexDocument = gql`
    mutation DeleteIndex($indexId: String!) {
  deleteIndex(indexId: $indexId) {
    _id
  }
}
    `;
export type DeleteIndexMutationFn = ApolloReactCommon.MutationFunction<DeleteIndexMutation, DeleteIndexMutationVariables>;
export type DeleteIndexComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteIndexMutation, DeleteIndexMutationVariables>, 'mutation'>;

    export const DeleteIndexComponent = (props: DeleteIndexComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteIndexMutation, DeleteIndexMutationVariables> mutation={DeleteIndexDocument} {...props} />
    );
    
export type DeleteIndexProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteIndexMutation, DeleteIndexMutationVariables>
    } & TChildProps;
export function withDeleteIndex<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteIndexMutation,
  DeleteIndexMutationVariables,
  DeleteIndexProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteIndexMutation, DeleteIndexMutationVariables, DeleteIndexProps<TChildProps, TDataName>>(DeleteIndexDocument, {
      alias: 'deleteIndex',
      ...operationOptions
    });
};

/**
 * __useDeleteIndexMutation__
 *
 * To run a mutation, you first call `useDeleteIndexMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteIndexMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteIndexMutation, { data, loading, error }] = useDeleteIndexMutation({
 *   variables: {
 *      indexId: // value for 'indexId'
 *   },
 * });
 */
export function useDeleteIndexMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteIndexMutation, DeleteIndexMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteIndexMutation, DeleteIndexMutationVariables>(DeleteIndexDocument, baseOptions);
      }
export type DeleteIndexMutationHookResult = ReturnType<typeof useDeleteIndexMutation>;
export type DeleteIndexMutationResult = ApolloReactCommon.MutationResult<DeleteIndexMutation>;
export type DeleteIndexMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteIndexMutation, DeleteIndexMutationVariables>;
export const GetServersDocument = gql`
    query GetServers($serviceId: String!) {
  servers(serviceId: $serviceId) {
    _id
    serviceId
    hosts
    appIds
    environmentIds
    state
  }
}
    `;
export type GetServersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetServersQuery, GetServersQueryVariables>, 'query'> & ({ variables: GetServersQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetServersComponent = (props: GetServersComponentProps) => (
      <ApolloReactComponents.Query<GetServersQuery, GetServersQueryVariables> query={GetServersDocument} {...props} />
    );
    
export type GetServersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetServersQuery, GetServersQueryVariables>
    } & TChildProps;
export function withGetServers<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetServersQuery,
  GetServersQueryVariables,
  GetServersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetServersQuery, GetServersQueryVariables, GetServersProps<TChildProps, TDataName>>(GetServersDocument, {
      alias: 'getServers',
      ...operationOptions
    });
};

/**
 * __useGetServersQuery__
 *
 * To run a query within a React component, call `useGetServersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServersQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetServersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetServersQuery, GetServersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetServersQuery, GetServersQueryVariables>(GetServersDocument, baseOptions);
      }
export function useGetServersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetServersQuery, GetServersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetServersQuery, GetServersQueryVariables>(GetServersDocument, baseOptions);
        }
export type GetServersQueryHookResult = ReturnType<typeof useGetServersQuery>;
export type GetServersLazyQueryHookResult = ReturnType<typeof useGetServersLazyQuery>;
export type GetServersQueryResult = ApolloReactCommon.QueryResult<GetServersQuery, GetServersQueryVariables>;
export const PutServerDocument = gql`
    mutation PutServer($serverId: String!, $serverInput: ServerInput!) {
  putServer(serverId: $serverId, serverInput: $serverInput) {
    _id
  }
}
    `;
export type PutServerMutationFn = ApolloReactCommon.MutationFunction<PutServerMutation, PutServerMutationVariables>;
export type PutServerComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<PutServerMutation, PutServerMutationVariables>, 'mutation'>;

    export const PutServerComponent = (props: PutServerComponentProps) => (
      <ApolloReactComponents.Mutation<PutServerMutation, PutServerMutationVariables> mutation={PutServerDocument} {...props} />
    );
    
export type PutServerProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<PutServerMutation, PutServerMutationVariables>
    } & TChildProps;
export function withPutServer<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PutServerMutation,
  PutServerMutationVariables,
  PutServerProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, PutServerMutation, PutServerMutationVariables, PutServerProps<TChildProps, TDataName>>(PutServerDocument, {
      alias: 'putServer',
      ...operationOptions
    });
};

/**
 * __usePutServerMutation__
 *
 * To run a mutation, you first call `usePutServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePutServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [putServerMutation, { data, loading, error }] = usePutServerMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *      serverInput: // value for 'serverInput'
 *   },
 * });
 */
export function usePutServerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PutServerMutation, PutServerMutationVariables>) {
        return ApolloReactHooks.useMutation<PutServerMutation, PutServerMutationVariables>(PutServerDocument, baseOptions);
      }
export type PutServerMutationHookResult = ReturnType<typeof usePutServerMutation>;
export type PutServerMutationResult = ApolloReactCommon.MutationResult<PutServerMutation>;
export type PutServerMutationOptions = ApolloReactCommon.BaseMutationOptions<PutServerMutation, PutServerMutationVariables>;
export const DeleteServerDocument = gql`
    mutation DeleteServer($serverId: String!) {
  deleteServer(serverId: $serverId) {
    _id
  }
}
    `;
export type DeleteServerMutationFn = ApolloReactCommon.MutationFunction<DeleteServerMutation, DeleteServerMutationVariables>;
export type DeleteServerComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteServerMutation, DeleteServerMutationVariables>, 'mutation'>;

    export const DeleteServerComponent = (props: DeleteServerComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteServerMutation, DeleteServerMutationVariables> mutation={DeleteServerDocument} {...props} />
    );
    
export type DeleteServerProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteServerMutation, DeleteServerMutationVariables>
    } & TChildProps;
export function withDeleteServer<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteServerMutation,
  DeleteServerMutationVariables,
  DeleteServerProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteServerMutation, DeleteServerMutationVariables, DeleteServerProps<TChildProps, TDataName>>(DeleteServerDocument, {
      alias: 'deleteServer',
      ...operationOptions
    });
};

/**
 * __useDeleteServerMutation__
 *
 * To run a mutation, you first call `useDeleteServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServerMutation, { data, loading, error }] = useDeleteServerMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useDeleteServerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteServerMutation, DeleteServerMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteServerMutation, DeleteServerMutationVariables>(DeleteServerDocument, baseOptions);
      }
export type DeleteServerMutationHookResult = ReturnType<typeof useDeleteServerMutation>;
export type DeleteServerMutationResult = ApolloReactCommon.MutationResult<DeleteServerMutation>;
export type DeleteServerMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteServerMutation, DeleteServerMutationVariables>;
export const GetServicesDocument = gql`
    query GetServices {
  services {
    _id
    owner
    dataClassification
    state
  }
}
    `;
export type GetServicesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetServicesQuery, GetServicesQueryVariables>, 'query'>;

    export const GetServicesComponent = (props: GetServicesComponentProps) => (
      <ApolloReactComponents.Query<GetServicesQuery, GetServicesQueryVariables> query={GetServicesDocument} {...props} />
    );
    
export type GetServicesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetServicesQuery, GetServicesQueryVariables>
    } & TChildProps;
export function withGetServices<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetServicesQuery,
  GetServicesQueryVariables,
  GetServicesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetServicesQuery, GetServicesQueryVariables, GetServicesProps<TChildProps, TDataName>>(GetServicesDocument, {
      alias: 'getServices',
      ...operationOptions
    });
};

/**
 * __useGetServicesQuery__
 *
 * To run a query within a React component, call `useGetServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetServicesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, baseOptions);
      }
export function useGetServicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, baseOptions);
        }
export type GetServicesQueryHookResult = ReturnType<typeof useGetServicesQuery>;
export type GetServicesLazyQueryHookResult = ReturnType<typeof useGetServicesLazyQuery>;
export type GetServicesQueryResult = ApolloReactCommon.QueryResult<GetServicesQuery, GetServicesQueryVariables>;
export const GetServiceDocument = gql`
    query GetService($serviceId: String!) {
  service(serviceId: $serviceId) {
    _id
    owner
    dataClassification
    description
    state
  }
}
    `;
export type GetServiceComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetServiceQuery, GetServiceQueryVariables>, 'query'> & ({ variables: GetServiceQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetServiceComponent = (props: GetServiceComponentProps) => (
      <ApolloReactComponents.Query<GetServiceQuery, GetServiceQueryVariables> query={GetServiceDocument} {...props} />
    );
    
export type GetServiceProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetServiceQuery, GetServiceQueryVariables>
    } & TChildProps;
export function withGetService<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetServiceQuery,
  GetServiceQueryVariables,
  GetServiceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetServiceQuery, GetServiceQueryVariables, GetServiceProps<TChildProps, TDataName>>(GetServiceDocument, {
      alias: 'getService',
      ...operationOptions
    });
};

/**
 * __useGetServiceQuery__
 *
 * To run a query within a React component, call `useGetServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetServiceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetServiceQuery, GetServiceQueryVariables>) {
        return ApolloReactHooks.useQuery<GetServiceQuery, GetServiceQueryVariables>(GetServiceDocument, baseOptions);
      }
export function useGetServiceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetServiceQuery, GetServiceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetServiceQuery, GetServiceQueryVariables>(GetServiceDocument, baseOptions);
        }
export type GetServiceQueryHookResult = ReturnType<typeof useGetServiceQuery>;
export type GetServiceLazyQueryHookResult = ReturnType<typeof useGetServiceLazyQuery>;
export type GetServiceQueryResult = ApolloReactCommon.QueryResult<GetServiceQuery, GetServiceQueryVariables>;
export const PutServiceDocument = gql`
    mutation PutService($serviceId: String!, $serviceInput: ServiceInput!) {
  putService(serviceId: $serviceId, serviceInput: $serviceInput) {
    _id
  }
}
    `;
export type PutServiceMutationFn = ApolloReactCommon.MutationFunction<PutServiceMutation, PutServiceMutationVariables>;
export type PutServiceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<PutServiceMutation, PutServiceMutationVariables>, 'mutation'>;

    export const PutServiceComponent = (props: PutServiceComponentProps) => (
      <ApolloReactComponents.Mutation<PutServiceMutation, PutServiceMutationVariables> mutation={PutServiceDocument} {...props} />
    );
    
export type PutServiceProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<PutServiceMutation, PutServiceMutationVariables>
    } & TChildProps;
export function withPutService<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PutServiceMutation,
  PutServiceMutationVariables,
  PutServiceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, PutServiceMutation, PutServiceMutationVariables, PutServiceProps<TChildProps, TDataName>>(PutServiceDocument, {
      alias: 'putService',
      ...operationOptions
    });
};

/**
 * __usePutServiceMutation__
 *
 * To run a mutation, you first call `usePutServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePutServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [putServiceMutation, { data, loading, error }] = usePutServiceMutation({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *      serviceInput: // value for 'serviceInput'
 *   },
 * });
 */
export function usePutServiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PutServiceMutation, PutServiceMutationVariables>) {
        return ApolloReactHooks.useMutation<PutServiceMutation, PutServiceMutationVariables>(PutServiceDocument, baseOptions);
      }
export type PutServiceMutationHookResult = ReturnType<typeof usePutServiceMutation>;
export type PutServiceMutationResult = ApolloReactCommon.MutationResult<PutServiceMutation>;
export type PutServiceMutationOptions = ApolloReactCommon.BaseMutationOptions<PutServiceMutation, PutServiceMutationVariables>;
export const DeleteServiceDocument = gql`
    mutation DeleteService($serviceId: String!) {
  deleteService(serviceId: $serviceId) {
    _id
  }
}
    `;
export type DeleteServiceMutationFn = ApolloReactCommon.MutationFunction<DeleteServiceMutation, DeleteServiceMutationVariables>;
export type DeleteServiceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteServiceMutation, DeleteServiceMutationVariables>, 'mutation'>;

    export const DeleteServiceComponent = (props: DeleteServiceComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteServiceMutation, DeleteServiceMutationVariables> mutation={DeleteServiceDocument} {...props} />
    );
    
export type DeleteServiceProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteServiceMutation, DeleteServiceMutationVariables>
    } & TChildProps;
export function withDeleteService<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteServiceMutation,
  DeleteServiceMutationVariables,
  DeleteServiceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteServiceMutation, DeleteServiceMutationVariables, DeleteServiceProps<TChildProps, TDataName>>(DeleteServiceDocument, {
      alias: 'deleteService',
      ...operationOptions
    });
};

/**
 * __useDeleteServiceMutation__
 *
 * To run a mutation, you first call `useDeleteServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServiceMutation, { data, loading, error }] = useDeleteServiceMutation({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useDeleteServiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteServiceMutation, DeleteServiceMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteServiceMutation, DeleteServiceMutationVariables>(DeleteServiceDocument, baseOptions);
      }
export type DeleteServiceMutationHookResult = ReturnType<typeof useDeleteServiceMutation>;
export type DeleteServiceMutationResult = ApolloReactCommon.MutationResult<DeleteServiceMutation>;
export type DeleteServiceMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteServiceMutation, DeleteServiceMutationVariables>;
export const GetSyslogsDocument = gql`
    query GetSyslogs($serviceId: String!) {
  syslogs(serviceId: $serviceId) {
    _id
    serviceId
    index
    sourcetype
    port
    protocol
    hosts
    environmentIds
    state
  }
}
    `;
export type GetSyslogsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetSyslogsQuery, GetSyslogsQueryVariables>, 'query'> & ({ variables: GetSyslogsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetSyslogsComponent = (props: GetSyslogsComponentProps) => (
      <ApolloReactComponents.Query<GetSyslogsQuery, GetSyslogsQueryVariables> query={GetSyslogsDocument} {...props} />
    );
    
export type GetSyslogsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetSyslogsQuery, GetSyslogsQueryVariables>
    } & TChildProps;
export function withGetSyslogs<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetSyslogsQuery,
  GetSyslogsQueryVariables,
  GetSyslogsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetSyslogsQuery, GetSyslogsQueryVariables, GetSyslogsProps<TChildProps, TDataName>>(GetSyslogsDocument, {
      alias: 'getSyslogs',
      ...operationOptions
    });
};

/**
 * __useGetSyslogsQuery__
 *
 * To run a query within a React component, call `useGetSyslogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSyslogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSyslogsQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetSyslogsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSyslogsQuery, GetSyslogsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetSyslogsQuery, GetSyslogsQueryVariables>(GetSyslogsDocument, baseOptions);
      }
export function useGetSyslogsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSyslogsQuery, GetSyslogsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetSyslogsQuery, GetSyslogsQueryVariables>(GetSyslogsDocument, baseOptions);
        }
export type GetSyslogsQueryHookResult = ReturnType<typeof useGetSyslogsQuery>;
export type GetSyslogsLazyQueryHookResult = ReturnType<typeof useGetSyslogsLazyQuery>;
export type GetSyslogsQueryResult = ApolloReactCommon.QueryResult<GetSyslogsQuery, GetSyslogsQueryVariables>;
export const PutSyslogDocument = gql`
    mutation PutSyslog($syslogId: String!, $syslogInput: SyslogInput!) {
  putSyslog(syslogId: $syslogId, syslogInput: $syslogInput) {
    _id
  }
}
    `;
export type PutSyslogMutationFn = ApolloReactCommon.MutationFunction<PutSyslogMutation, PutSyslogMutationVariables>;
export type PutSyslogComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<PutSyslogMutation, PutSyslogMutationVariables>, 'mutation'>;

    export const PutSyslogComponent = (props: PutSyslogComponentProps) => (
      <ApolloReactComponents.Mutation<PutSyslogMutation, PutSyslogMutationVariables> mutation={PutSyslogDocument} {...props} />
    );
    
export type PutSyslogProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<PutSyslogMutation, PutSyslogMutationVariables>
    } & TChildProps;
export function withPutSyslog<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PutSyslogMutation,
  PutSyslogMutationVariables,
  PutSyslogProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, PutSyslogMutation, PutSyslogMutationVariables, PutSyslogProps<TChildProps, TDataName>>(PutSyslogDocument, {
      alias: 'putSyslog',
      ...operationOptions
    });
};

/**
 * __usePutSyslogMutation__
 *
 * To run a mutation, you first call `usePutSyslogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePutSyslogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [putSyslogMutation, { data, loading, error }] = usePutSyslogMutation({
 *   variables: {
 *      syslogId: // value for 'syslogId'
 *      syslogInput: // value for 'syslogInput'
 *   },
 * });
 */
export function usePutSyslogMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PutSyslogMutation, PutSyslogMutationVariables>) {
        return ApolloReactHooks.useMutation<PutSyslogMutation, PutSyslogMutationVariables>(PutSyslogDocument, baseOptions);
      }
export type PutSyslogMutationHookResult = ReturnType<typeof usePutSyslogMutation>;
export type PutSyslogMutationResult = ApolloReactCommon.MutationResult<PutSyslogMutation>;
export type PutSyslogMutationOptions = ApolloReactCommon.BaseMutationOptions<PutSyslogMutation, PutSyslogMutationVariables>;
export const DeleteSyslogDocument = gql`
    mutation DeleteSyslog($syslogId: String!) {
  deleteSyslog(syslogId: $syslogId) {
    _id
  }
}
    `;
export type DeleteSyslogMutationFn = ApolloReactCommon.MutationFunction<DeleteSyslogMutation, DeleteSyslogMutationVariables>;
export type DeleteSyslogComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteSyslogMutation, DeleteSyslogMutationVariables>, 'mutation'>;

    export const DeleteSyslogComponent = (props: DeleteSyslogComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteSyslogMutation, DeleteSyslogMutationVariables> mutation={DeleteSyslogDocument} {...props} />
    );
    
export type DeleteSyslogProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteSyslogMutation, DeleteSyslogMutationVariables>
    } & TChildProps;
export function withDeleteSyslog<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteSyslogMutation,
  DeleteSyslogMutationVariables,
  DeleteSyslogProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteSyslogMutation, DeleteSyslogMutationVariables, DeleteSyslogProps<TChildProps, TDataName>>(DeleteSyslogDocument, {
      alias: 'deleteSyslog',
      ...operationOptions
    });
};

/**
 * __useDeleteSyslogMutation__
 *
 * To run a mutation, you first call `useDeleteSyslogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSyslogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSyslogMutation, { data, loading, error }] = useDeleteSyslogMutation({
 *   variables: {
 *      syslogId: // value for 'syslogId'
 *   },
 * });
 */
export function useDeleteSyslogMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteSyslogMutation, DeleteSyslogMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteSyslogMutation, DeleteSyslogMutationVariables>(DeleteSyslogDocument, baseOptions);
      }
export type DeleteSyslogMutationHookResult = ReturnType<typeof useDeleteSyslogMutation>;
export type DeleteSyslogMutationResult = ApolloReactCommon.MutationResult<DeleteSyslogMutation>;
export type DeleteSyslogMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteSyslogMutation, DeleteSyslogMutationVariables>;