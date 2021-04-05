import React from 'react'
import { Grid, Box, Typography, IconButton } from '@material-ui/core'

import EditIcon from '@material-ui/icons/Edit';

export default function DepartmentDetails({ position }) {
  return (
    <Box>
      <Box m={2}>
        <Typography variant="h5">
          {position.title}
        </Typography>
      </Box>
      <Box m={2}>
        <Grid container>
          <Grid item xs={1}>
            <IconButton size="small">
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item sm={12} md={5}>
            <Box display="flex" alignContent="center" justifyContent="space-between" width="100%" px={1}>
              <Typography>
                Base Rate
              </Typography>
              <Box bgcolor="black" width="8%" height="1px" my="auto" />
              <Typography>
                {position.rate}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md={3}>
            <Box display="flex" alignContent="center" justifyContent="space-between" width="100%" px={1} color="gray">
              <Typography>
                OT
              </Typography>
              <Box bgcolor="gray" width="8%" height="1px" my="auto" />
              <Typography>
                {position.OTRate}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md={3}>
            <Box display="flex" alignContent="center" justifyContent="space-between" width="100%" px={1} color="gray">
              <Typography>
                DT
              </Typography>
              <Box bgcolor="gray" width="8%" height="1px" my="auto" />
              <Typography>
                {position.DTRate}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
