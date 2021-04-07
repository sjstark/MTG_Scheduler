import React, { useEffect, useState } from 'react'

import { Box, Paper, Typography } from '@material-ui/core'

import ScheduleTable from './ScheduleTable'
import ScheduleEditing from './ScheduleTable/ScheduleEditing'


export default function ProjectSchedule({ project, setProject }) {
  const [schedule, setSchedule] = useState(project.schedule)

  useEffect(() => {
    setSchedule(project.schedule)
  }, [project])

  return (
    <Box m={5} >
      <Paper>
        <Box p={2} >
          <Typography variant="h4" color="initial" fontWeight="bold">
            Schedule
          </Typography>
          <div style={{ overflowX: 'auto' }}>
            <ScheduleTable projectId={project.id} schedule={schedule} departments={project.departments} />
          </div>
          <ScheduleEditing project={project} schedule={schedule} setSchedule={setSchedule} setProject={setProject} />
        </Box>
      </Paper>
    </Box>
  )
}
