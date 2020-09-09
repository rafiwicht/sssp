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
        document: GetChangedAppsDocument
    },
    {
        query: useGetChangedHttpsLazyQuery,
        name: 'https',
        resource: Resource.Http,
        document: GetChangedHttpsDocument
    },
    {
        query: useGetChangedIndexesLazyQuery,
        name: 'indexes',
        resource: Resource.Index,
        document: GetChangedIndexesDocument
    },
    {
        query: useGetChangedServersLazyQuery,
        name: 'servers',
        resource: Resource.Server,
        document: GetChangedServersDocument
    },
    {
        query: useGetChangedServicesLazyQuery,
        name: 'services',
        resource: Resource.Service,
        document: GetChangedServicesDocument
    },
    {
        query: useGetChangedSyslogsLazyQuery,
        name: 'syslogs',
        resource: Resource.Syslog,
        document: GetChangedSyslogsDocument
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
                {queries.map((query: any) => (
                    <WorkflowPart {...query} />
                ))}
            </Table>
        </TableContainer>
    );
}

export default Workflow;