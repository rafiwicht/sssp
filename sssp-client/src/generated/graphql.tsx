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
  services: Array<Service>;
  service: Service;
  environments: Array<Environment>;
};


export type QueryServiceArgs = {
  serviceId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createService: Service;
  updateService: Service;
  deleteService: Service;
  createEnvironment: Environment;
  updateEnvironment: Environment;
  deleteEnvironment: Environment;
};


export type MutationCreateServiceArgs = {
  serviceInput: ServiceInput;
};


export type MutationUpdateServiceArgs = {
  serviceInput: ServiceInput;
};


export type MutationDeleteServiceArgs = {
  serviceId: Scalars['String'];
};


export type MutationCreateEnvironmentArgs = {
  environmentInput: EnvironmentInput;
};


export type MutationUpdateEnvironmentArgs = {
  environmentInput: EnvironmentInput;
};


export type MutationDeleteEnvironmentArgs = {
  environmentId: Scalars['String'];
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
  _id: Scalars['String'];
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
  _id: Scalars['String'];
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
  _id: Scalars['String'];
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
  _id: Scalars['String'];
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
  _id: Scalars['String'];
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
  _id: Scalars['String'];
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
  _id: Scalars['String'];
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

export type CreateEnvironmentMutationVariables = Exact<{
  environmentInput: EnvironmentInput;
}>;


export type CreateEnvironmentMutation = (
  { __typename?: 'Mutation' }
  & { createEnvironment: (
    { __typename?: 'Environment' }
    & Pick<Environment, '_id'>
  ) }
);

export type UpdateEnvironmentMutationVariables = Exact<{
  environmentInput: EnvironmentInput;
}>;


export type UpdateEnvironmentMutation = (
  { __typename?: 'Mutation' }
  & { updateEnvironment: (
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

export type CreateServiceMutationVariables = Exact<{
  serviceInput: ServiceInput;
}>;


export type CreateServiceMutation = (
  { __typename?: 'Mutation' }
  & { createService: (
    { __typename?: 'Service' }
    & Pick<Service, '_id'>
  ) }
);

export type UpdateServiceMutationVariables = Exact<{
  serviceInput: ServiceInput;
}>;


export type UpdateServiceMutation = (
  { __typename?: 'Mutation' }
  & { updateService: (
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
export const CreateEnvironmentDocument = gql`
    mutation CreateEnvironment($environmentInput: EnvironmentInput!) {
  createEnvironment(environmentInput: $environmentInput) {
    _id
  }
}
    `;
export type CreateEnvironmentMutationFn = ApolloReactCommon.MutationFunction<CreateEnvironmentMutation, CreateEnvironmentMutationVariables>;
export type CreateEnvironmentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateEnvironmentMutation, CreateEnvironmentMutationVariables>, 'mutation'>;

    export const CreateEnvironmentComponent = (props: CreateEnvironmentComponentProps) => (
      <ApolloReactComponents.Mutation<CreateEnvironmentMutation, CreateEnvironmentMutationVariables> mutation={CreateEnvironmentDocument} {...props} />
    );
    
export type CreateEnvironmentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateEnvironmentMutation, CreateEnvironmentMutationVariables>
    } & TChildProps;
export function withCreateEnvironment<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateEnvironmentMutation,
  CreateEnvironmentMutationVariables,
  CreateEnvironmentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateEnvironmentMutation, CreateEnvironmentMutationVariables, CreateEnvironmentProps<TChildProps, TDataName>>(CreateEnvironmentDocument, {
      alias: 'createEnvironment',
      ...operationOptions
    });
};

/**
 * __useCreateEnvironmentMutation__
 *
 * To run a mutation, you first call `useCreateEnvironmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEnvironmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEnvironmentMutation, { data, loading, error }] = useCreateEnvironmentMutation({
 *   variables: {
 *      environmentInput: // value for 'environmentInput'
 *   },
 * });
 */
export function useCreateEnvironmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEnvironmentMutation, CreateEnvironmentMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateEnvironmentMutation, CreateEnvironmentMutationVariables>(CreateEnvironmentDocument, baseOptions);
      }
export type CreateEnvironmentMutationHookResult = ReturnType<typeof useCreateEnvironmentMutation>;
export type CreateEnvironmentMutationResult = ApolloReactCommon.MutationResult<CreateEnvironmentMutation>;
export type CreateEnvironmentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateEnvironmentMutation, CreateEnvironmentMutationVariables>;
export const UpdateEnvironmentDocument = gql`
    mutation UpdateEnvironment($environmentInput: EnvironmentInput!) {
  updateEnvironment(environmentInput: $environmentInput) {
    _id
  }
}
    `;
export type UpdateEnvironmentMutationFn = ApolloReactCommon.MutationFunction<UpdateEnvironmentMutation, UpdateEnvironmentMutationVariables>;
export type UpdateEnvironmentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateEnvironmentMutation, UpdateEnvironmentMutationVariables>, 'mutation'>;

    export const UpdateEnvironmentComponent = (props: UpdateEnvironmentComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateEnvironmentMutation, UpdateEnvironmentMutationVariables> mutation={UpdateEnvironmentDocument} {...props} />
    );
    
export type UpdateEnvironmentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateEnvironmentMutation, UpdateEnvironmentMutationVariables>
    } & TChildProps;
export function withUpdateEnvironment<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateEnvironmentMutation,
  UpdateEnvironmentMutationVariables,
  UpdateEnvironmentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateEnvironmentMutation, UpdateEnvironmentMutationVariables, UpdateEnvironmentProps<TChildProps, TDataName>>(UpdateEnvironmentDocument, {
      alias: 'updateEnvironment',
      ...operationOptions
    });
};

/**
 * __useUpdateEnvironmentMutation__
 *
 * To run a mutation, you first call `useUpdateEnvironmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEnvironmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEnvironmentMutation, { data, loading, error }] = useUpdateEnvironmentMutation({
 *   variables: {
 *      environmentInput: // value for 'environmentInput'
 *   },
 * });
 */
export function useUpdateEnvironmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateEnvironmentMutation, UpdateEnvironmentMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateEnvironmentMutation, UpdateEnvironmentMutationVariables>(UpdateEnvironmentDocument, baseOptions);
      }
export type UpdateEnvironmentMutationHookResult = ReturnType<typeof useUpdateEnvironmentMutation>;
export type UpdateEnvironmentMutationResult = ApolloReactCommon.MutationResult<UpdateEnvironmentMutation>;
export type UpdateEnvironmentMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateEnvironmentMutation, UpdateEnvironmentMutationVariables>;
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
export const CreateServiceDocument = gql`
    mutation CreateService($serviceInput: ServiceInput!) {
  createService(serviceInput: $serviceInput) {
    _id
  }
}
    `;
export type CreateServiceMutationFn = ApolloReactCommon.MutationFunction<CreateServiceMutation, CreateServiceMutationVariables>;
export type CreateServiceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateServiceMutation, CreateServiceMutationVariables>, 'mutation'>;

    export const CreateServiceComponent = (props: CreateServiceComponentProps) => (
      <ApolloReactComponents.Mutation<CreateServiceMutation, CreateServiceMutationVariables> mutation={CreateServiceDocument} {...props} />
    );
    
export type CreateServiceProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateServiceMutation, CreateServiceMutationVariables>
    } & TChildProps;
export function withCreateService<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateServiceMutation,
  CreateServiceMutationVariables,
  CreateServiceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateServiceMutation, CreateServiceMutationVariables, CreateServiceProps<TChildProps, TDataName>>(CreateServiceDocument, {
      alias: 'createService',
      ...operationOptions
    });
};

/**
 * __useCreateServiceMutation__
 *
 * To run a mutation, you first call `useCreateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceMutation, { data, loading, error }] = useCreateServiceMutation({
 *   variables: {
 *      serviceInput: // value for 'serviceInput'
 *   },
 * });
 */
export function useCreateServiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateServiceMutation, CreateServiceMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateServiceMutation, CreateServiceMutationVariables>(CreateServiceDocument, baseOptions);
      }
export type CreateServiceMutationHookResult = ReturnType<typeof useCreateServiceMutation>;
export type CreateServiceMutationResult = ApolloReactCommon.MutationResult<CreateServiceMutation>;
export type CreateServiceMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateServiceMutation, CreateServiceMutationVariables>;
export const UpdateServiceDocument = gql`
    mutation UpdateService($serviceInput: ServiceInput!) {
  updateService(serviceInput: $serviceInput) {
    _id
  }
}
    `;
export type UpdateServiceMutationFn = ApolloReactCommon.MutationFunction<UpdateServiceMutation, UpdateServiceMutationVariables>;
export type UpdateServiceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateServiceMutation, UpdateServiceMutationVariables>, 'mutation'>;

    export const UpdateServiceComponent = (props: UpdateServiceComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateServiceMutation, UpdateServiceMutationVariables> mutation={UpdateServiceDocument} {...props} />
    );
    
export type UpdateServiceProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateServiceMutation, UpdateServiceMutationVariables>
    } & TChildProps;
export function withUpdateService<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateServiceMutation,
  UpdateServiceMutationVariables,
  UpdateServiceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateServiceMutation, UpdateServiceMutationVariables, UpdateServiceProps<TChildProps, TDataName>>(UpdateServiceDocument, {
      alias: 'updateService',
      ...operationOptions
    });
};

/**
 * __useUpdateServiceMutation__
 *
 * To run a mutation, you first call `useUpdateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceMutation, { data, loading, error }] = useUpdateServiceMutation({
 *   variables: {
 *      serviceInput: // value for 'serviceInput'
 *   },
 * });
 */
export function useUpdateServiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateServiceMutation, UpdateServiceMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateServiceMutation, UpdateServiceMutationVariables>(UpdateServiceDocument, baseOptions);
      }
export type UpdateServiceMutationHookResult = ReturnType<typeof useUpdateServiceMutation>;
export type UpdateServiceMutationResult = ApolloReactCommon.MutationResult<UpdateServiceMutation>;
export type UpdateServiceMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateServiceMutation, UpdateServiceMutationVariables>;
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