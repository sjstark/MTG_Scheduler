import { Box, Paper, Typography, Grid, Button } from '@material-ui/core'
import React from 'react'
import { format } from 'date-fns'

const formatTitle = (date) => {
  let datetime = new Date(date + "-10")
  // console.log({ date, datetime })
  return format(datetime, "MMMM - yyyy")
  // return date
}

const formatDate = (date) => {
  let newDate = date.split('-')
  return `${newDate[1]}/${newDate[2]}`
}

const setProjectView = (projectId) => {
  console.log(projectId)
}

export default function ProjectMonth({ month, projects }) {

  return projects.length > 0
    ?
    (<Box m={5}>
      <Paper>
        <Box p={3}>

          <Typography variant="h4">
            {formatTitle(month)}
          </Typography>
          <Box mt={3}>

            <Grid container spacing={2}>
              {projects.map((project) => (
                <Grid key={project.id} item xs={12}>
                  <Button onClick={() => setProjectView(project.id)} fullWidth>
                    <Box fontWeight="bold" width="100%">

                      <Grid container alignContent="space-between" onClick={() => setProjectView(project.id)}>
                        <Grid item xs={4}>{`${formatDate(project.dates.start)} - ${formatDate(project.dates.end)}`}</Grid>
                        <Grid item xs={4}>{project.title}</Grid>
                        <Grid item xs={4}>{project.client ? project.client.name : "none"}</Grid>
                      </Grid>
                    </Box>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box >)
    :
    (<></>)
}
