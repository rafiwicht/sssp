import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  indexes: Array<Idx>;
  index: Idx;
};


export type QueryIndexArgs = {
  idxId: Scalars['ID'];
};

export type Idx = {
  __typename?: 'Idx';
  _id: Scalars['ID'];
  name: Scalars['String'];
  service: Scalars['String'];
  frozenTimePeriodInSecs: Scalars['Int'];
  maxTotalDataSizeMB: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createIndex: Idx;
};


export type MutationCreateIndexArgs = {
  idxInput?: Maybe<IdxInput>;
};

export type IdxInput = {
  name: Scalars['String'];
  service: Scalars['String'];
  frozenTimePeriodInSecs: Scalars['Int'];
  maxTotalDataSizeMB: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  idxAdded?: Maybe<Idx>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}



