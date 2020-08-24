import React from 'react';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";

import {createStyles, makeStyles} from "@material-ui/styles";


const useStyles = makeStyles(() =>
    createStyles({
        marginButton: {
            marginLeft: 5
        }
    }),
);

export type ServiceSimple = {
    _id: string,
    name: string,
    owner: string,
    state: string,
    dataClassification: string
}

export type ServiceListProps = {
    data: Array<ServiceSimple>,
    buttons: Array<{
        text: string,
        color: 'primary' | 'secondary',
        onClick: (id: string) => void
    }>
}

const ServiceList: React.FunctionComponent<ServiceListProps> = ({data, buttons}: ServiceListProps) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table aria-label="services">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Owner</TableCell>
                        <TableCell align='right'>State</TableCell>
                        <TableCell align='right'>Data classification</TableCell>
                        <TableCell align='right'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: ServiceSimple) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align='right'>{row.owner}</TableCell>
                            <TableCell align='right'>{row.state}</TableCell>
                            <TableCell align='right'>{row.dataClassification}</TableCell>
                            <TableCell align='right'>
                                {buttons.map((e, i) => {
                                    return(
                                        <Button
                                            key={i}
                                            variant='contained'
                                            color={e.color}
                                            className={classes.marginButton}
                                            onClick={() => e.onClick(row._id)}
                                        >{e.text}</Button>
                                    );
                                })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default ServiceList;
