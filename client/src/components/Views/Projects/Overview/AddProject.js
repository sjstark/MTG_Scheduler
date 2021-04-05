import React, { useState } from 'react'

import axios from 'axios'

import {
  Dialog,
  Container,
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton
} from '@material-ui/core'
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';

import AsyncSelect from 'react-select/async'
import CachedIcon from '@material-ui/icons/Cached';



export default function AddProject({ open, onClose }) {
  const [newProjectData, setNewProjectData] = useState({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    clientId: null
  })

  const handleSubmit = async () => {
    const res = await axios.post(`/api/projects`, newProjectData)

    if (res.status == 200) {
      onClose()
    } else {
      console.log(res)
    }

  }

  const loadClients = async (inputValue, callback) => {
    const res = await axios.get(`/api/clients?query=${inputValue}`)
    callback(res.data)
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
    >
      <Box m={5} >
        <Box mb={3}>
          <Typography variant="h4">
            Create A New Project
          </Typography>
        </Box>
        <Grid
          container
          // direction="column"
          // justify="flex-start"
          // alignItems="flex-start"
          spacing={3}
        >
          <Grid item xs={6}>

            <TextField
              variant="outlined"
              placeholder="Project Title"
              value={newProjectData.title}
              onChange={({ target }) => setNewProjectData({ ...newProjectData, title: target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <KeyboardDatePicker
              inputVariant="outlined"
              label="Start Date"
              format="MM/dd/yyyy"
              value={newProjectData.startDate}
              onChange={(value) => setNewProjectData({ ...newProjectData, startDate: value })}
            />
          </Grid>
          <Grid item xs={6}>

            <AsyncSelect
              defaultOptions
              cacheOptions
              loadOptions={loadClients}
              onChange={(target) => setNewProjectData({ ...newProjectData, clientId: parseInt(target.value) })}
            />

          </Grid>
          <Grid item xs={6}>
            <KeyboardDatePicker
              inputVariant="outlined"
              label="End Date"
              format="MM/dd/yyyy"
              value={newProjectData.endDate}
              onChange={(value) => setNewProjectData({ ...newProjectData, endDate: value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Box mt={3} display="flex" justifyContent="space-around">
              <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
              >
                Create
            </Button>
              <Button
                onClick={onClose}
                variant="contained"
              >
                Cancel
            </Button>
            </Box>

          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
