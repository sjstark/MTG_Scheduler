import { Box } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns'

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
      if (res.status === 200) {
        let project = res.data
        project.quoteIssued = format(new Date(project.quoteIssued), "yyyy-MM-dd")
        project.quoteValid = format(new Date(project.quoteValid), "yyyy-MM-dd")
        setProject(project)

      }
    })()
  }, [projectId])

  useEffect(() => {
    console.log(project)
  }, [project])

  return (
    <Box>
      <ProjectTitle project={project} />
      <ProjectSummary project={project} />
      <ProjectSchedule project={project} />
    </Box>
  )
}
