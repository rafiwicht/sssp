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

export enum Kind {
  Current = 'CURRENT',
  Future = 'FUTURE',
  Newest = 'NEWEST'
}

export type Query = {
  __typename?: 'Query';
  services: Array<Service>;
  service: Service;
  workflow: Workflow;
};


export type QueryServicesArgs = {
  kind?: Maybe<Kind>;
};


export type QueryServiceArgs = {
  serviceId: Scalars['ID'];
  kind?: Maybe<Kind>;
};


export type QueryWorkflowArgs = {
  serviceId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createService: Service;
  updateService: Service;
  deleteService: Service;
  acceptWorkflow: Service;
  declineWorkflow: Service;
};


export type MutationCreateServiceArgs = {
  serviceInput: ServiceInput;
};


export type MutationUpdateServiceArgs = {
  serviceId: Scalars['ID'];
  serviceInput: ServiceInput;
};


export type MutationDeleteServiceArgs = {
  serviceId: Scalars['ID'];
};


export type MutationAcceptWorkflowArgs = {
  serviceId: Scalars['ID'];
};


export type MutationDeclineWorkflowArgs = {
  serviceId: Scalars['ID'];
};

export enum State {
  InCreation = 'IN_CREATION',
  Active = 'ACTIVE',
  InDeletion = 'IN_DELETION',
  InModification = 'IN_MODIFICATION'
}

export type Workflow = {
  __typename?: 'Workflow';
  new: Service;
  current?: Maybe<Service>;
};

export type Service = {
  __typename?: 'Service';
  _id: Scalars['ID'];
  name: Scalars['String'];
  owner: Scalars['String'];
  description: Scalars['String'];
  dataClassification: Scalars['String'];
  read: Array<Scalars['String']>;
  write: Array<Scalars['String']>;
  indexes: Array<Index>;
  apps: Array<App>;
  state: State;
};

export type Index = {
  __typename?: 'Index';
  name: Scalars['String'];
  maxTotalDataSizeMB: Scalars['Int'];
  frozenTimePeriodInSecs: Scalars['Int'];
};

export enum AppType {
  Fa = 'FA',
  Ta = 'TA',
  Sa = 'SA',
  Ia = 'IA',
  Ui = 'UI'
}

export type App = {
  __typename?: 'App';
  name: Scalars['String'];
  type: AppType;
  url: Scalars['String'];
};

export type ServiceInput = {
  name: Scalars['String'];
  owner: Scalars['String'];
  description: Scalars['String'];
  dataClassification: Scalars['String'];
  read?: Maybe<Array<Scalars['String']>>;
  write: Array<Scalars['String']>;
  indexes?: Maybe<Array<IndexInput>>;
  apps?: Maybe<Array<AppInput>>;
};

export type IndexInput = {
  name: Scalars['String'];
  maxTotalDataSizeMB?: Maybe<Scalars['Int']>;
  frozenTimePeriodInSecs?: Maybe<Scalars['Int']>;
};

export type AppInput = {
  name: Scalars['String'];
  type: AppType;
};

export type GetServicesQueryVariables = Exact<{
  kind?: Maybe<Kind>;
}>;


export type GetServicesQuery = (
  { __typename?: 'Query' }
  & { services: Array<(
    { __typename?: 'Service' }
    & Pick<Service, '_id' | 'name' | 'owner' | 'dataClassification' | 'state'>
  )> }
);

export type GetServiceQueryVariables = Exact<{
  serviceId: Scalars['ID'];
  kind?: Maybe<Kind>;
}>;


export type GetServiceQuery = (
  { __typename?: 'Query' }
  & { service: (
    { __typename?: 'Service' }
    & Pick<Service, '_id' | 'name' | 'owner' | 'state' | 'dataClassification' | 'description' | 'read' | 'write'>
    & { indexes: Array<(
      { __typename?: 'Index' }
      & Pick<Index, 'name' | 'maxTotalDataSizeMB' | 'frozenTimePeriodInSecs'>
    )>, apps: Array<(
      { __typename?: 'App' }
      & Pick<App, 'name' | 'type' | 'url'>
    )> }
  ) }
);

export type CreateServiceMutationVariables = Exact<{
  serviceInput: ServiceInput;
}>;


export type CreateServiceMutation = (
  { __typename?: 'Mutation' }
  & { createService: (
    { __typename?: 'Service' }
    & Pick<Service, 'name'>
  ) }
);

export type UpdateServiceMutationVariables = Exact<{
  serviceId: Scalars['ID'];
  serviceInput: ServiceInput;
}>;


export type UpdateServiceMutation = (
  { __typename?: 'Mutation' }
  & { updateService: (
    { __typename?: 'Service' }
    & Pick<Service, 'name'>
  ) }
);

export type DeleteServiceMutationVariables = Exact<{
  serviceId: Scalars['ID'];
}>;


export type DeleteServiceMutation = (
  { __typename?: 'Mutation' }
  & { deleteService: (
    { __typename?: 'Service' }
    & Pick<Service, 'name'>
  ) }
);

export type GetWorkflowQueryVariables = Exact<{
  serviceId: Scalars['ID'];
}>;


export type GetWorkflowQuery = (
  { __typename?: 'Query' }
  & { workflow: (
    { __typename?: 'Workflow' }
    & { current?: Maybe<(
      { __typename?: 'Service' }
      & Pick<Service, '_id' | 'name' | 'owner' | 'state' | 'dataClassification' | 'description' | 'read' | 'write'>
      & { indexes: Array<(
        { __typename?: 'Index' }
        & Pick<Index, 'name' | 'maxTotalDataSizeMB' | 'frozenTimePeriodInSecs'>
      )>, apps: Array<(
        { __typename?: 'App' }
        & Pick<App, 'name' | 'type' | 'url'>
      )> }
    )>, new: (
      { __typename?: 'Service' }
      & Pick<Service, '_id' | 'name' | 'owner' | 'state' | 'dataClassification' | 'description' | 'read' | 'write'>
      & { indexes: Array<(
        { __typename?: 'Index' }
        & Pick<Index, 'name' | 'maxTotalDataSizeMB' | 'frozenTimePeriodInSecs'>
      )>, apps: Array<(
        { __typename?: 'App' }
        & Pick<App, 'name' | 'type' | 'url'>
      )> }
    ) }
  ) }
);

export type AcceptWorkflowMutationVariables = Exact<{
  serviceId: Scalars['ID'];
}>;


export type AcceptWorkflowMutation = (
  { __typename?: 'Mutation' }
  & { acceptWorkflow: (
    { __typename?: 'Service' }
    & Pick<Service, 'name'>
  ) }
);

export type DeclineWorkflowMutationVariables = Exact<{
  serviceId: Scalars['ID'];
}>;


export type DeclineWorkflowMutation = (
  { __typename?: 'Mutation' }
  & { declineWorkflow: (
    { __typename?: 'Service' }
    & Pick<Service, 'name'>
  ) }
);


export const GetServicesDocument = gql`
    query GetServices($kind: Kind) {
  services(kind: $kind) {
    _id
    name
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
 *      kind: // value for 'kind'
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
    query GetService($serviceId: ID!, $kind: Kind) {
  service(serviceId: $serviceId, kind: $kind) {
    _id
    name
    owner
    state
    dataClassification
    description
    indexes {
      name
      maxTotalDataSizeMB
      frozenTimePeriodInSecs
    }
    apps {
      name
      type
      url
    }
    read
    write
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
 *      kind: // value for 'kind'
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
    name
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
    mutation UpdateService($serviceId: ID!, $serviceInput: ServiceInput!) {
  updateService(serviceId: $serviceId, serviceInput: $serviceInput) {
    name
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
 *      serviceId: // value for 'serviceId'
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
    mutation DeleteService($serviceId: ID!) {
  deleteService(serviceId: $serviceId) {
    name
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
export const GetWorkflowDocument = gql`
    query GetWorkflow($serviceId: ID!) {
  workflow(serviceId: $serviceId) {
    current {
      _id
      name
      owner
      state
      dataClassification
      description
      indexes {
        name
        maxTotalDataSizeMB
        frozenTimePeriodInSecs
      }
      apps {
        name
        type
        url
      }
      read
      write
    }
    new {
      _id
      name
      owner
      state
      dataClassification
      description
      indexes {
        name
        maxTotalDataSizeMB
        frozenTimePeriodInSecs
      }
      apps {
        name
        type
        url
      }
      read
      write
    }
  }
}
    `;
export type GetWorkflowComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetWorkflowQuery, GetWorkflowQueryVariables>, 'query'> & ({ variables: GetWorkflowQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetWorkflowComponent = (props: GetWorkflowComponentProps) => (
      <ApolloReactComponents.Query<GetWorkflowQuery, GetWorkflowQueryVariables> query={GetWorkflowDocument} {...props} />
    );
    
export type GetWorkflowProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetWorkflowQuery, GetWorkflowQueryVariables>
    } & TChildProps;
export function withGetWorkflow<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetWorkflowQuery,
  GetWorkflowQueryVariables,
  GetWorkflowProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetWorkflowQuery, GetWorkflowQueryVariables, GetWorkflowProps<TChildProps, TDataName>>(GetWorkflowDocument, {
      alias: 'getWorkflow',
      ...operationOptions
    });
};

/**
 * __useGetWorkflowQuery__
 *
 * To run a query within a React component, call `useGetWorkflowQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkflowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkflowQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetWorkflowQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetWorkflowQuery, GetWorkflowQueryVariables>) {
        return ApolloReactHooks.useQuery<GetWorkflowQuery, GetWorkflowQueryVariables>(GetWorkflowDocument, baseOptions);
      }
export function useGetWorkflowLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetWorkflowQuery, GetWorkflowQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetWorkflowQuery, GetWorkflowQueryVariables>(GetWorkflowDocument, baseOptions);
        }
export type GetWorkflowQueryHookResult = ReturnType<typeof useGetWorkflowQuery>;
export type GetWorkflowLazyQueryHookResult = ReturnType<typeof useGetWorkflowLazyQuery>;
export type GetWorkflowQueryResult = ApolloReactCommon.QueryResult<GetWorkflowQuery, GetWorkflowQueryVariables>;
export const AcceptWorkflowDocument = gql`
    mutation AcceptWorkflow($serviceId: ID!) {
  acceptWorkflow(serviceId: $serviceId) {
    name
  }
}
    `;
export type AcceptWorkflowMutationFn = ApolloReactCommon.MutationFunction<AcceptWorkflowMutation, AcceptWorkflowMutationVariables>;
export type AcceptWorkflowComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AcceptWorkflowMutation, AcceptWorkflowMutationVariables>, 'mutation'>;

    export const AcceptWorkflowComponent = (props: AcceptWorkflowComponentProps) => (
      <ApolloReactComponents.Mutation<AcceptWorkflowMutation, AcceptWorkflowMutationVariables> mutation={AcceptWorkflowDocument} {...props} />
    );
    
export type AcceptWorkflowProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<AcceptWorkflowMutation, AcceptWorkflowMutationVariables>
    } & TChildProps;
export function withAcceptWorkflow<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AcceptWorkflowMutation,
  AcceptWorkflowMutationVariables,
  AcceptWorkflowProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, AcceptWorkflowMutation, AcceptWorkflowMutationVariables, AcceptWorkflowProps<TChildProps, TDataName>>(AcceptWorkflowDocument, {
      alias: 'acceptWorkflow',
      ...operationOptions
    });
};

/**
 * __useAcceptWorkflowMutation__
 *
 * To run a mutation, you first call `useAcceptWorkflowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptWorkflowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptWorkflowMutation, { data, loading, error }] = useAcceptWorkflowMutation({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useAcceptWorkflowMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AcceptWorkflowMutation, AcceptWorkflowMutationVariables>) {
        return ApolloReactHooks.useMutation<AcceptWorkflowMutation, AcceptWorkflowMutationVariables>(AcceptWorkflowDocument, baseOptions);
      }
export type AcceptWorkflowMutationHookResult = ReturnType<typeof useAcceptWorkflowMutation>;
export type AcceptWorkflowMutationResult = ApolloReactCommon.MutationResult<AcceptWorkflowMutation>;
export type AcceptWorkflowMutationOptions = ApolloReactCommon.BaseMutationOptions<AcceptWorkflowMutation, AcceptWorkflowMutationVariables>;
export const DeclineWorkflowDocument = gql`
    mutation DeclineWorkflow($serviceId: ID!) {
  declineWorkflow(serviceId: $serviceId) {
    name
  }
}
    `;
export type DeclineWorkflowMutationFn = ApolloReactCommon.MutationFunction<DeclineWorkflowMutation, DeclineWorkflowMutationVariables>;
export type DeclineWorkflowComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeclineWorkflowMutation, DeclineWorkflowMutationVariables>, 'mutation'>;

    export const DeclineWorkflowComponent = (props: DeclineWorkflowComponentProps) => (
      <ApolloReactComponents.Mutation<DeclineWorkflowMutation, DeclineWorkflowMutationVariables> mutation={DeclineWorkflowDocument} {...props} />
    );
    
export type DeclineWorkflowProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeclineWorkflowMutation, DeclineWorkflowMutationVariables>
    } & TChildProps;
export function withDeclineWorkflow<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeclineWorkflowMutation,
  DeclineWorkflowMutationVariables,
  DeclineWorkflowProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeclineWorkflowMutation, DeclineWorkflowMutationVariables, DeclineWorkflowProps<TChildProps, TDataName>>(DeclineWorkflowDocument, {
      alias: 'declineWorkflow',
      ...operationOptions
    });
};

/**
 * __useDeclineWorkflowMutation__
 *
 * To run a mutation, you first call `useDeclineWorkflowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineWorkflowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineWorkflowMutation, { data, loading, error }] = useDeclineWorkflowMutation({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useDeclineWorkflowMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeclineWorkflowMutation, DeclineWorkflowMutationVariables>) {
        return ApolloReactHooks.useMutation<DeclineWorkflowMutation, DeclineWorkflowMutationVariables>(DeclineWorkflowDocument, baseOptions);
      }
export type DeclineWorkflowMutationHookResult = ReturnType<typeof useDeclineWorkflowMutation>;
export type DeclineWorkflowMutationResult = ApolloReactCommon.MutationResult<DeclineWorkflowMutation>;
export type DeclineWorkflowMutationOptions = ApolloReactCommon.BaseMutationOptions<DeclineWorkflowMutation, DeclineWorkflowMutationVariables>;