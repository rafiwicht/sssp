import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { Step } from './ServiceMod';

type ProgressProps = {
    current: Step
}

const boxes = [
    'Basic',
    'Indexes and apps',
    'Permissions'
]

const Progress: React.FunctionComponent<ProgressProps> = ({current}: ProgressProps) => {
    return (
        <Grid container>
            {boxes.map((e, i) => {
                return (
                    <Grid item md={4} key={i}>
                        <Box
                            border={1}
                            padding={1}
                            bgcolor={i === current ? 'primary.main' : 'primary.light'}
                            color='primary.contrastText'
                        >
                            {e}
                        </Box>
                    </Grid>
                );
            })}
        </Grid>
    )
}

export default Progress;