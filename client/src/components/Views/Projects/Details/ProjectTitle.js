import { Box, Paper, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { mergeClasses } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'

const styles = theme => ({
  input: {
    fontSize: "2.125rem",
    fontWeight: "bold"
  },
})

// const BigTextField = withStyles(styles)(TextField)


const ProjectTitle = withStyles(styles)(({ project, classes }) => {

  const [title, setTitle] = useState("Loading...")

  useEffect(() => {
    if (!project.title) {
      setTitle("Loading...")
    } else {
      setTitle(project.title)
    }
  }, [project])

  return (
    <Box m={5} >
      <Paper>
        <Box p={2}>
          <TextField
            InputProps={{ disableUnderline: true, className: classes.input }}
            value={title}
            onChange={({ value }) => setTitle(value)}
            fullWidth
          />
        </Box>
      </Paper>
    </Box>
  )
})

export default ProjectTitle
