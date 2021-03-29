import { Box } from '@material-ui/core'
import React, { useState } from 'react'

import ProjectTitle from './ProjectTitle'
import ProjectSummary from './ProjectSummary'
import ProjectSchedule from './ProjectSchedule'

export default function ProjectDetails() {

  const [project, setProject] = useState({})

  return (
    <Box>
      <ProjectTitle project={project} />
      <ProjectSummary project={project} />
      <ProjectSchedule project={project} />
    </Box>
  )
}
