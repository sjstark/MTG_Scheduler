import { Box, Collapse, Paper, Typography, IconButton, Grid, TextField } from '@material-ui/core'
import React, { useState } from 'react'



import OpenIcon from '@material-ui/icons/KeyboardArrowDown';
import CloseIcon from '@material-ui/icons/KeyboardArrowUp';

function Detail({ title, value, onChange }) {

  return (
    <Grid item xs={12} container spacing={1}>
      <Grid item xs={4}>

        <Typography variant="h6" width="50%" align="right">
          {`${title}:`}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          InputProps={{ disableUnderline: true }}
          value={value}
          onChange={({ value }) => onChange(value)}
          width="50%"
        />
      </Grid>
    </Grid >
  )
}

function Notes({ title, value, onChange }) {
  return (
    <Grid item xs={12}>
      <Box display="flex">
        <Typography variant="h6" width="50%">
          {`${title}:`}
        </Typography>
        <TextField
          InputProps={{ disableUnderline: true }}
          value={value}
          onChange={({ value }) => onChange(value)}
          width="50%"
          multiline
        />
      </Box >
    </Grid >
  )
}

export default function ProjectSummary({ project }) {

  const [open, setOpen] = useState(true)
  const [test1, setTest1] = useState("default1")
  const [test2, setTest2] = useState("default2")
  const [test3, setTest3] = useState("default3")
  const [test4, setTest4] = useState("default4")
  const [test5, setTest5] = useState(`Quisque fermentum quam ut leo lobortis vestibulum. Duis pulvinar dolor vitae rhoncus rhoncus. Cras volutpat metus enim, non venenatis urna placerat vitae. Curabitur ac urna eget mi iaculis malesuada nec eu orci. Nullam rutrum dictum condimentum. Ut eget neque facilisis, rhoncus sapien nec, varius leo. Nam in lacinia urna. Quisque condimentum leo nec ligula laoreet, nec mollis quam convallis. Aliquam condimentum varius turpis, sed elementum ligula consequat sed. Donec malesuada et erat eu suscipit. Aliquam tincidunt sagittis elit eu viverra. Vestibulum ullamcorper lectus at ipsum tincidunt, non laoreet massa vulputate. Nulla venenatis justo elementum ultricies pharetra. Morbi faucibus blandit nisi, ac venenatis dolor. Suspendisse turpis est, sagittis in sapien id, tincidunt euismod quam. Duis pellentesque pulvinar rutrum.`)

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
              <Grid container item xs={6} spacing={1}>
                <Detail title="Client" value={test1} onChange={setTest1} />
                <Detail title="Client Contact" value={test2} onChange={setTest2} />
                <Detail title="Quote Issued Date" value={test3} onChange={setTest3} />
                <Detail title="Quote Valid Date" value={test4} onChange={setTest4} />
              </Grid>
              <Grid container item xs={6} spacing={1}>
                <Notes title="Admin Notes" value={test5} onChange={setTest5} />
              </Grid>
            </Grid>
          </Collapse>
        </Box>
      </Paper>
    </Box>
  )
}
