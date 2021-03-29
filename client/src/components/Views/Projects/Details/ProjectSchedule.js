import React from 'react'

import { Box, Paper, TextField } from '@material-ui/core'

import ScheduleTable from './ScheduleTable'


export default function ProjectSchedule({ project }) {
  return (
    <Box m={5} >
      <Paper>
        <Box p={2}>
          <ScheduleTable projectId={project.id} schedule={project.schedule} />
        </Box>
      </Paper>
    </Box>
  )
}
