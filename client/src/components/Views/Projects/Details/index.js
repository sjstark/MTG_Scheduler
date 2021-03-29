import { Box } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useParams } from 'react-router-dom'

import ProjectTitle from './ProjectTitle'
import ProjectSummary from './ProjectSummary'
import ProjectSchedule from './ProjectSchedule'



export default function ProjectDetails() {
  const { projectId } = useParams()

  const [project, setProject] = useState({})

  useEffect(() => {
    (async () => {
      setProject({})
      const res = await axios.get(`/api/projects/${projectId}`)
      console.log(res.data)
    })()
  }, [projectId])

  return (
    <Box>
      <ProjectTitle project={project} />
      <ProjectSummary project={project} />
      <ProjectSchedule project={project} />
    </Box>
  )
}
