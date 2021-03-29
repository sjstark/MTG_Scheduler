import { Box, Paper, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React, { useEffect, useRef, useState } from 'react'

// import EditIcon from '@material-ui/icons/Edit';
// import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
  input: {
    fontSize: "2.125rem",
    fontWeight: "bold",
    "& .Mui-disabled": {
      color: "black"
    }
  },
})

// const BigTextField = withStyles(styles)(TextField)


const ProjectTitle = withStyles(styles)(({ project, classes }) => {

  const [title, setTitle] = useState("Loading...")
  // const [editing, setEditing] = useState(false)

  const InputRef = useRef()

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
        <Box p={2} display="flex">
          <TextField
            InputProps={{ disableUnderline: true, className: classes.input }}
            value={title}
            onChange={({ value }) => setTitle(value)}
            fullWidth
            inputRef={InputRef}
          />
        </Box>
      </Paper>
    </Box>
  )
})

export default ProjectTitle
