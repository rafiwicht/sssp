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


export type QueryAppArgs = {
  appId: Scalars['String'];
};


export type QueryHttpArgs = {
  httpId: Scalars['String'];
};


export type QueryIndexArgs = {
  indexId: Scalars['String'];
};


export type QueryServerArgs = {
  serverId: Scalars['String'];
};


export type QueryServiceArgs = {
  serviceId: Scalars['String'];
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
  putService: Service;
  deleteService: Service;
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


export type MutationPutServiceArgs = {
  serviceId: Scalars['String'];
  serviceInput: ServiceInput;
};


export type MutationDeleteServiceArgs = {
  serviceId: Scalars['String'];
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
  environmentIds: Array<Scalars['String']>;
};

export type App = {
  __typename?: 'App';
  _id: Scalars['String'];
  serviceId: Scalars['String'];
  url: Scalars['String'];
  version: Scalars['String'];
  environmentIds: Array<Scalars['String']>;
  state: State;
  changes?: Maybe<AppChanges>;
};

export type AppInput = {
  serviceId: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
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
  environmentIds?: Maybe<Array<Scalars['String']>>;
};

export type Http = {
  __typename?: 'Http';
  _id: Scalars['String'];
  serviceId: Scalars['String'];
  token: Scalars['String'];
  environmentIds?: Maybe<Array<Scalars['String']>>;
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