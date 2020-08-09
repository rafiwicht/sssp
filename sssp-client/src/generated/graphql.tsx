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
  admins: Array<Scalars['String']>;
  admin: Scalars['Boolean'];
};


export type QueryServiceArgs = {
  serviceId: Scalars['ID'];
};


export type QueryAdminArgs = {
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createService: Service;
  updateService: Service;
  deleteService: Service;
  createAdmin: Scalars['String'];
  deleteAdmin: Scalars['String'];
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


export type MutationCreateAdminArgs = {
  userId: Scalars['String'];
};


export type MutationDeleteAdminArgs = {
  userId: Scalars['String'];
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
  sourcetypes: Array<Sourcetype>;
};

export type Index = {
  __typename?: 'Index';
  _id: Scalars['ID'];
  name: Scalars['String'];
  maxTotalDataSizeMB: Scalars['Int'];
  frozenTimePeriodInSecs: Scalars['Int'];
};

export type Sourcetype = {
  __typename?: 'Sourcetype';
  _id: Scalars['ID'];
  name: Scalars['String'];
};

export type ServiceInput = {
  name: Scalars['String'];
  owner: Scalars['String'];
  read: Array<Scalars['String']>;
  write: Array<Scalars['String']>;
  indexes: Array<IndexInput>;
  sourcetypes: Array<SourcetypeInput>;
};

export type IndexInput = {
  name: Scalars['String'];
  maxTotalDataSizeMB?: Maybe<Scalars['Int']>;
  frozenTimePeriodInSecs?: Maybe<Scalars['Int']>;
};

export type SourcetypeInput = {
  name: Scalars['String'];
};

export type GetAdminsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'admins'>
);

export type IsAdminQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type IsAdminQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'admin'>
);

export type CreateAdminMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type CreateAdminMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createAdmin'>
);

export type DeleteAdminMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type DeleteAdminMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAdmin'>
);

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
    )>, sourcetypes: Array<(
      { __typename?: 'Sourcetype' }
      & Pick<Sourcetype, '_id' | 'name'>
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


export const GetAdminsDocument = gql`
    query GetAdmins {
  admins
}
    `;
export type GetAdminsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAdminsQuery, GetAdminsQueryVariables>, 'query'>;

    export const GetAdminsComponent = (props: GetAdminsComponentProps) => (
      <ApolloReactComponents.Query<GetAdminsQuery, GetAdminsQueryVariables> query={GetAdminsDocument} {...props} />
    );
    
export type GetAdminsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetAdminsQuery, GetAdminsQueryVariables>
    } & TChildProps;
export function withGetAdmins<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAdminsQuery,
  GetAdminsQueryVariables,
  GetAdminsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetAdminsQuery, GetAdminsQueryVariables, GetAdminsProps<TChildProps, TDataName>>(GetAdminsDocument, {
      alias: 'getAdmins',
      ...operationOptions
    });
};

/**
 * __useGetAdminsQuery__
 *
 * To run a query within a React component, call `useGetAdminsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdminsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdminsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdminsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAdminsQuery, GetAdminsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAdminsQuery, GetAdminsQueryVariables>(GetAdminsDocument, baseOptions);
      }
export function useGetAdminsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAdminsQuery, GetAdminsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAdminsQuery, GetAdminsQueryVariables>(GetAdminsDocument, baseOptions);
        }
export type GetAdminsQueryHookResult = ReturnType<typeof useGetAdminsQuery>;
export type GetAdminsLazyQueryHookResult = ReturnType<typeof useGetAdminsLazyQuery>;
export type GetAdminsQueryResult = ApolloReactCommon.QueryResult<GetAdminsQuery, GetAdminsQueryVariables>;
export const IsAdminDocument = gql`
    query IsAdmin($userId: String!) {
  admin(userId: $userId)
}
    `;
export type IsAdminComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<IsAdminQuery, IsAdminQueryVariables>, 'query'> & ({ variables: IsAdminQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const IsAdminComponent = (props: IsAdminComponentProps) => (
      <ApolloReactComponents.Query<IsAdminQuery, IsAdminQueryVariables> query={IsAdminDocument} {...props} />
    );
    
export type IsAdminProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<IsAdminQuery, IsAdminQueryVariables>
    } & TChildProps;
export function withIsAdmin<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  IsAdminQuery,
  IsAdminQueryVariables,
  IsAdminProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, IsAdminQuery, IsAdminQueryVariables, IsAdminProps<TChildProps, TDataName>>(IsAdminDocument, {
      alias: 'isAdmin',
      ...operationOptions
    });
};

/**
 * __useIsAdminQuery__
 *
 * To run a query within a React component, call `useIsAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsAdminQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useIsAdminQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IsAdminQuery, IsAdminQueryVariables>) {
        return ApolloReactHooks.useQuery<IsAdminQuery, IsAdminQueryVariables>(IsAdminDocument, baseOptions);
      }
export function useIsAdminLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsAdminQuery, IsAdminQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IsAdminQuery, IsAdminQueryVariables>(IsAdminDocument, baseOptions);
        }
export type IsAdminQueryHookResult = ReturnType<typeof useIsAdminQuery>;
export type IsAdminLazyQueryHookResult = ReturnType<typeof useIsAdminLazyQuery>;
export type IsAdminQueryResult = ApolloReactCommon.QueryResult<IsAdminQuery, IsAdminQueryVariables>;
export const CreateAdminDocument = gql`
    mutation CreateAdmin($userId: String!) {
  createAdmin(userId: $userId)
}
    `;
export type CreateAdminMutationFn = ApolloReactCommon.MutationFunction<CreateAdminMutation, CreateAdminMutationVariables>;
export type CreateAdminComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateAdminMutation, CreateAdminMutationVariables>, 'mutation'>;

    export const CreateAdminComponent = (props: CreateAdminComponentProps) => (
      <ApolloReactComponents.Mutation<CreateAdminMutation, CreateAdminMutationVariables> mutation={CreateAdminDocument} {...props} />
    );
    
export type CreateAdminProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateAdminMutation, CreateAdminMutationVariables>
    } & TChildProps;
export function withCreateAdmin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateAdminMutation,
  CreateAdminMutationVariables,
  CreateAdminProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateAdminMutation, CreateAdminMutationVariables, CreateAdminProps<TChildProps, TDataName>>(CreateAdminDocument, {
      alias: 'createAdmin',
      ...operationOptions
    });
};

/**
 * __useCreateAdminMutation__
 *
 * To run a mutation, you first call `useCreateAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdminMutation, { data, loading, error }] = useCreateAdminMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateAdminMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAdminMutation, CreateAdminMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateAdminMutation, CreateAdminMutationVariables>(CreateAdminDocument, baseOptions);
      }
export type CreateAdminMutationHookResult = ReturnType<typeof useCreateAdminMutation>;
export type CreateAdminMutationResult = ApolloReactCommon.MutationResult<CreateAdminMutation>;
export type CreateAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAdminMutation, CreateAdminMutationVariables>;
export const DeleteAdminDocument = gql`
    mutation DeleteAdmin($userId: String!) {
  deleteAdmin(userId: $userId)
}
    `;
export type DeleteAdminMutationFn = ApolloReactCommon.MutationFunction<DeleteAdminMutation, DeleteAdminMutationVariables>;
export type DeleteAdminComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteAdminMutation, DeleteAdminMutationVariables>, 'mutation'>;

    export const DeleteAdminComponent = (props: DeleteAdminComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteAdminMutation, DeleteAdminMutationVariables> mutation={DeleteAdminDocument} {...props} />
    );
    
export type DeleteAdminProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteAdminMutation, DeleteAdminMutationVariables>
    } & TChildProps;
export function withDeleteAdmin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteAdminMutation,
  DeleteAdminMutationVariables,
  DeleteAdminProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteAdminMutation, DeleteAdminMutationVariables, DeleteAdminProps<TChildProps, TDataName>>(DeleteAdminDocument, {
      alias: 'deleteAdmin',
      ...operationOptions
    });
};

/**
 * __useDeleteAdminMutation__
 *
 * To run a mutation, you first call `useDeleteAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdminMutation, { data, loading, error }] = useDeleteAdminMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteAdminMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteAdminMutation, DeleteAdminMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteAdminMutation, DeleteAdminMutationVariables>(DeleteAdminDocument, baseOptions);
      }
export type DeleteAdminMutationHookResult = ReturnType<typeof useDeleteAdminMutation>;
export type DeleteAdminMutationResult = ApolloReactCommon.MutationResult<DeleteAdminMutation>;
export type DeleteAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteAdminMutation, DeleteAdminMutationVariables>;
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
    sourcetypes {
      _id
      name
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