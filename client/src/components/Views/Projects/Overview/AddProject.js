import React, { useState } from 'react'

import axios from 'axios'

import {
  Dialog,
  Container,
  Box,
  Button,
  Input,
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
  const [formData, setFormData] = useState({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    clientId: ""
  })

  const handleSubmit = () => {
    console.log(formData)
  }

  const loadClients = async () => {

  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
    >
      <Box m={5}>
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
          <Grid item xs={12}>

            <Input
              type="text"
              placeholder="Project Title"
              value={formData.title}
              onChange={({ target }) => setFormData({ ...formData, title: target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <KeyboardDatePicker
              label="Start Date"
              format="MM/dd/yyyy"
              value={formData.startDate}
              onChange={(value) => setFormData({ ...formData, startDate: value })}
            />
          </Grid>
          <Grid item xs={12}>
            <KeyboardDatePicker
              label="End Date"
              format="MM/dd/yyyy"
              value={formData.endDate}
              onChange={(value) => setFormData({ ...formData, endDate: value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Box width="100%">

                <AsyncSelect
                  cacheOptions
                  loadOptions={loadClients}
                  onInputChange={(value) => setFormData({ ...formData, clientId: value })}
                />
              </Box>

              <IconButton>
                <CachedIcon />
              </IconButton>
            </Box>

          </Grid>
          <Grid item xs={12}>
            <Box>
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
