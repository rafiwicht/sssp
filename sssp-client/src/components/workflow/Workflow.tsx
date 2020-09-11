import React from 'react';
import {
    GetChangedAppsDocument,
    GetChangedHttpsDocument,
    GetChangedIndexesDocument,
    GetChangedServersDocument,
    GetChangedServicesDocument,
    GetChangedSyslogsDocument,
    Resource,
    useGetChangedAppsLazyQuery,
    useGetChangedHttpsLazyQuery,
    useGetChangedIndexesLazyQuery,
    useGetChangedServersLazyQuery,
    useGetChangedServicesLazyQuery,
    useGetChangedSyslogsLazyQuery
} from '../../generated/graphql';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell } from '@material-ui/core';
import WorkflowPart from './WorkflowPart';

export const args = {
    variables: {
        onlyModifications: true
    }
};

const queries = [
    {
        query: useGetChangedAppsLazyQuery,
        name: 'apps',
        resource: Resource.App,
        refetchQueries: [
            {
                query: GetChangedAppsDocument, 
                variables: {
                    onlyModifications: true
                }
            }
        ]
    },
    {
        query: useGetChangedHttpsLazyQuery,
        name: 'https',
        resource: Resource.Http,
        refetchQueries: [
            {
                query: GetChangedHttpsDocument, 
                variables: {
                    onlyModifications: true
                }
            }
        ]
    },
    {
        query: useGetChangedIndexesLazyQuery,
        name: 'indexes',
        resource: Resource.Index,
        refetchQueries: [
            {
                query: GetChangedIndexesDocument, 
                variables: {
                    onlyModifications: true
                }
            }
        ]
    },
    {
        query: useGetChangedServersLazyQuery,
        name: 'servers',
        resource: Resource.Server,
        refetchQueries: [
            {
                query: GetChangedServersDocument, 
                variables: {
                    onlyModifications: true
                }
            }
        ]
    },
    {
        query: useGetChangedServicesLazyQuery,
        name: 'services',
        resource: Resource.Service,
        refetchQueries: [
            {
                query: GetChangedServicesDocument, 
                variables: {
                    onlyModifications: true
                }
            }
        ]
    },
    {
        query: useGetChangedSyslogsLazyQuery,
        name: 'syslogs',
        resource: Resource.Syslog,
        refetchQueries: [
            {
                query: GetChangedSyslogsDocument, 
                variables: {
                    onlyModifications: true
                }
            }
        ]
    }
];


const Workflow: React.FC = () => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Name</TableCell>
                        <TableCell align="right">State</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                {queries.map((query: any, index: number) => (
                    <WorkflowPart key={index} {...query} />
                ))}
            </Table>
        </TableContainer>
    );
}

export default Workflow;