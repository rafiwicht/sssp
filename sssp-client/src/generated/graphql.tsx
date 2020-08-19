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
};


export type QueryServiceArgs = {
  serviceId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createService: Service;
  updateService: Service;
  deleteService: Service;
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

export type Service = {
  __typename?: 'Service';
  _id: Scalars['ID'];
  name: Scalars['String'];
  owner: Scalars['String'];
  state: Scalars['String'];
  read: Array<Scalars['String']>;
  write: Array<Scalars['String']>;
  indexes: Array<Index>;
  apps: Array<App>;
};

export type Index = {
  __typename?: 'Index';
  _id: Scalars['ID'];
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
  _id: Scalars['ID'];
  name: Scalars['String'];
  type: AppType;
  url: Scalars['String'];
};

export type KeyValue = {
  __typename?: 'KeyValue';
  _id: Scalars['ID'];
  key: Scalars['String'];
  value: Scalars['String'];
};

export type ServiceInput = {
  name: Scalars['String'];
  owner: Scalars['String'];
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

export type GetServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServicesQuery = (
  { __typename?: 'Query' }
  & { services: Array<(
    { __typename?: 'Service' }
    & Pick<Service, '_id' | 'name' | 'owner' | 'state'>
  )> }
);

export type GetServiceQueryVariables = Exact<{
  serviceId: Scalars['ID'];
}>;


export type GetServiceQuery = (
  { __typename?: 'Query' }
  & { service: (
    { __typename?: 'Service' }
    & Pick<Service, '_id' | 'name' | 'owner' | 'state' | 'read' | 'write'>
    & { indexes: Array<(
      { __typename?: 'Index' }
      & Pick<Index, '_id' | 'name' | 'maxTotalDataSizeMB' | 'frozenTimePeriodInSecs'>
    )>, apps: Array<(
      { __typename?: 'App' }
      & Pick<App, '_id' | 'name' | 'type' | 'url'>
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


export const GetServicesDocument = gql`
    query GetServices {
  services {
    _id
    name
    owner
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
    query GetService($serviceId: ID!) {
  service(serviceId: $serviceId) {
    _id
    name
    owner
    state
    indexes {
      _id
      name
      maxTotalDataSizeMB
      frozenTimePeriodInSecs
    }
    apps {
      _id
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