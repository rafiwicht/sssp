import WorkflowRow from './WorkflowRow';
import React, { useEffect } from 'react';
import {args} from './Workflow';
import { TableBody } from '@material-ui/core';
import { Resource } from '../../generated/graphql';

type WorkflowPartProps = {
    query: (baseOptions: any) => any,
    name: string,
    resource: Resource,
    refetchQueries: any
}

/**
 * The result of a query as table rows
 * @param WorkflowPartProps
 */
const WorkflowPart: React.FunctionComponent<WorkflowPartProps> = ({ query, name, resource, refetchQueries }: WorkflowPartProps) => {
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
                <WorkflowRow key={row._id} row={row} resource={resource} refetchQueries={refetchQueries} />
            ))}
        </TableBody>
    );
}

export default WorkflowPart;