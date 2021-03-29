import { Box, Collapse, Paper, Typography, IconButton, Grid, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'



import OpenIcon from '@material-ui/icons/KeyboardArrowDown';
import CloseIcon from '@material-ui/icons/KeyboardArrowUp';

const loadingProject = {
  client: { name: "Loading" },
  contact: { email: "Loading" },
  quoteIssued: "Loading",
  quoteValid: "Loading",
  adminNotes: "Loading",
}

function Detail({ title, value, onChange }) {

  return (
    <Grid item xs={12} container spacing={1} justifyContent="flex-start">
      <Grid item xs={4} sm={5} md={6}>

        <Typography variant="h6" align="right">
          {`${title}:`}
        </Typography>
      </Grid>
      <Grid item xs={8} sm={7} md={6}>
        <TextField
          InputProps={{ disableUnderline: true }}
          value={value}
          onChange={({ value }) => onChange(value)}
        // width="50%"
        />
      </Grid>
    </Grid >
  )
}

function Notes({ title, value, onChange }) {
  return (
    <Grid item xs={12}>
      <Box display="flex">
        <Typography variant="h6">
          {`${title}:`}
        </Typography>
        <TextField
          InputProps={{ disableUnderline: true }}
          value={value}
          onChange={({ value }) => onChange(value)}
          // width="50%"
          multiline
          fullWidth
        />
      </Box >
    </Grid >
  )
}

export default function ProjectSummary({ project }) {

  const [open, setOpen] = useState(true)
  const [projectDetails, setProjectDetails] = useState(loadingProject)

  useEffect(() => {
    if (!project.title) {
      setProjectDetails(loadingProject)
    } else {
      setProjectDetails(project)
    }
  }, [project])

  const handleChange = (target) => {

  }

  return (
    <Box m={5} >
      <Paper>
        <Box p={2}>

          <Box display="flex" justifyContent="space-between" >
            <Typography variant="h4" color="initial" fontWeight="bold">
              Details
          </Typography>
            <IconButton color="default" onClick={() => setOpen(!open)}>
              {
                open
                  ?
                  (<CloseIcon />)
                  :
                  (<OpenIcon />)
              }
            </IconButton>
          </Box>
          <Collapse in={open}>
            <Grid container spacing={1}>
              <Grid container item sm={12} md={4} spacing={1}>
                <Detail title="Client" value={projectDetails.client ? projectDetails.client.name : "N/A"} onChange={handleChange} />
                <Detail title="Client Contact" value={projectDetails.contact ? projectDetails.contact.email : "N/A"} onChange={handleChange} />
                <Detail title="Quote Issued Date" value={projectDetails.quoteIssued} onChange={handleChange} />
                <Detail title="Quote Valid Date" value={projectDetails.quoteValid} onChange={handleChange} />
              </Grid>
              <Grid container item sm={12} md={8} spacing={1}>
                <Notes title="Admin Notes" value={projectDetails.adminNotes} onChange={handleChange} />
              </Grid>
            </Grid>
          </Collapse>
        </Box>
      </Paper>
    </Box>
  )
}
