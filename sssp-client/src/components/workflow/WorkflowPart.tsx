import WorkflowRow from './WorkflowRow';
import React, { useEffect } from 'react';
import {args} from './Workflow';
import { TableBody } from '@material-ui/core';
import { Resource } from '../../generated/graphql';

type WorkflowPartProps = {
    query: (baseOptions: any) => any,
    name: string,
    resource: Resource,
    document: any
}

const WorkflowPart: React.FunctionComponent<WorkflowPartProps> = ({ query, name, resource }: WorkflowPartProps) => {
    console.log(args);
    const [getChanges, { data, loading, error }] = query(args);

    useEffect(() => {
        getChanges();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    return (
        <TableBody>
            {data[name].map((row: any) => (
                <WorkflowRow key={row._id} row={row} resource={resource} document={document} />
            ))}
        </TableBody>
    );
}

export default WorkflowPart;