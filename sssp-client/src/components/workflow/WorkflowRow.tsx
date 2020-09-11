import { makeStyles, TableRow, TableCell, IconButton, Collapse, Box, Typography, Table, TableHead, TableBody, Button } from '@material-ui/core';
import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Resource, State, useAcceptChangeMutation, useRejectChangeMutation, GetChangedServicesDocument} from '../../generated/graphql';

const useStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    marginButton: {
        marginLeft: 5
    }
});



type WorkflowRowProps = {
    row: any,
    resource: Resource,
    refetchQueries: any
}

const WorkflowRow: React.FunctionComponent<WorkflowRowProps> = ({ row, resource, refetchQueries }: WorkflowRowProps) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const [acceptChange] = useAcceptChangeMutation({
        refetchQueries: refetchQueries
    });

    const [rejectChange] = useRejectChangeMutation({
        refetchQueries: refetchQueries
    });

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row._id}</TableCell>
                <TableCell align="right">{row.state}</TableCell>
                <TableCell align="right">{row.__typename}</TableCell>
                <TableCell align='right'>
                    <Button
                        variant='contained'
                        color='secondary'
                        className={classes.marginButton}
                        onClick={() => rejectChange({
                            variables: {
                                id: row._id,
                                resource: resource
                            }
                        })}
                    >Reject</Button>
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.marginButton}
                        onClick={() => acceptChange({
                            variables: {
                                id: row._id,
                                resource: resource
                            }
                        })}
                    >Accept</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Changes
                            </Typography>
                            {row.state === State.InModification &&
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Name of variable
                                            </TableCell>
                                            <TableCell>
                                                Changed from
                                            </TableCell>
                                            <TableCell>
                                                To
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.keys(row.changes).map((e, i) => (
                                            <TableRow key={i}>
                                                <TableCell>
                                                    {e}
                                                </TableCell>
                                                <TableCell>
                                                    {(typeof row[e] === "object") ? row[e].join(', ') : row[e]} &rarr; {(typeof row[e] === "object") ? row.changes[e].join(', ') : row.changes[e]}
                                                </TableCell>
                                                <TableCell>
                                                    
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            }
                            {row.state !== State.InModification &&
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Name of the variable
                                            </TableCell>
                                            <TableCell>
                                                Value of the variable
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.keys(row).map((e, i) => {
                                            if(!['__typename','_id', 'state', 'changes'].includes(e)) {
                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell> 
                                                            {e}
                                                        </TableCell>
                                                        <TableCell>
                                                            {(typeof row[e] === "object") ? row[e].join(', ') : row[e]}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            }
                                        })}
                                    </TableBody>
                                </Table>
                            }
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default WorkflowRow;