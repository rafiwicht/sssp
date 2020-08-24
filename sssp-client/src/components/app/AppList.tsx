import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";

import {App, Index} from "../../generated/graphql";



type AppListProps = {
    data: Array<App>
}

const AppList: React.FunctionComponent<AppListProps> = ({data}: AppListProps) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="indexes">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Type</TableCell>
                        <TableCell align='right'>URL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: App) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align='right'>{row.type}</TableCell>
                            {row.url === 'in creation' &&
                                <TableCell align='right'>{row.url}</TableCell>
                            }
                            {row.url !== 'in creation' &&
                                <TableCell align='right'><a href={row.url}>{row.url}</a></TableCell>
                            }

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default AppList;
