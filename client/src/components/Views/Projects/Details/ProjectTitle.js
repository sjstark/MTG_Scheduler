import { Box, Paper, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'


export default function ProjectTitle({ project }) {

  const [title, setTitle] = useState("A New Project")

  return (
    <Box m={5} >
      <Paper>
        <Box p={2}>
          <TextField
            InputProps={{ disableUnderline: true, classes: { input: { fontsize: 100 } } }}
            value={title}
            onChange={({ value }) => setTitle(value)}
            fullWidth
          />
        </Box>
      </Paper>
    </Box>
  )
}
