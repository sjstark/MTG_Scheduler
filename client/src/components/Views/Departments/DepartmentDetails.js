import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Grid, Box, Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Fab, TextField } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CurrencyTextField from '@unicef/material-ui-currency-textfield/dist/CurrencyTextField';

import DeleteConfirm from './DeleteConfirm'


function EditPositionDialog({ open, onClose, position: initialPosition, updateDepartments, updatePosition }) {
  const formatPosition = (position) => {
    position.rate = parseFloat(position.rate.slice(1))
    return position
  }

  const [position, setPosition] = useState(formatPosition({ ...initialPosition }))
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setPosition(formatPosition({ ...initialPosition }))
  }, [initialPosition])

  const handleSubmit = async () => {
    try {
      const res = await axios.put(`/api/departments/positions/${position.id}`, position)

      onClose()
      updateDepartments()
      updatePosition(res.data)
    } catch (e) {
      if (e.response) {
        setErrors(e.response.data.errors)
      }
      console.log(e)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{`Edit ${initialPosition.title}`}</DialogTitle>
      <DialogContent>
        <Grid container direction='column' spacing={5}>
          <Grid item>
            <TextField
              autoFocus
              label="Position Title"
              value={position.title}
              onChange={({ target }) => setPosition({ ...position, title: target.value })}
              error={errors.title}
            />
          </Grid>
          <Grid item>
            <CurrencyTextField
              label="Position Base Rate"
              value={position.rate}
              onChange={(e, value) => setPosition({ ...position, rate: value })}
              error={errors.rate}
              currencySymbol="$"
              outputFormat="string"
              decimalCharacter="."
              digitGroupSeparator=","
            />
          </Grid>
        </Grid>
        {errors &&
          Object.values(errors).map(((error, idx) => (
            <Alert key={`error-${idx}`} severity="error">
              {error}
            </Alert>
          )))
        }
        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog >
  )
}

export default function DepartmentDetails({ position, setCurrent, updateDepartments }) {

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/departments/positions/${position.id}`)
      setCurrent(null)
      updateDepartments()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Box>
      <Box m={2} display="flex" justifyContent="space-between">
        <Typography variant="h5">
          {position.title}
        </Typography>
        <Box>
          <IconButton size="small" onClick={() => setOpenEdit(true)}>
            <EditIcon />
          </IconButton>
          <IconButton size='small' onClick={() => { setOpenDeleteConfirm(true) }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Box m={2}>
        <Grid container>
          <Grid item sm={12} md={6}>
            <Box display="flex" alignContent="center" justifyContent="space-between" width="100%" px={1}>
              <Typography>
                Base Rate
              </Typography>
              <Box bgcolor="black" width="8%" height="1px" my="auto" />
              <Typography>
                {position.rate}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md={3}>
            <Box display="flex" alignContent="center" justifyContent="space-between" width="100%" px={1} color="gray">
              <Typography>
                OT
              </Typography>
              <Box bgcolor="gray" width="8%" height="1px" my="auto" />
              <Typography>
                {position.OTRate}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md={3}>
            <Box display="flex" alignContent="center" justifyContent="space-between" width="100%" px={1} color="gray">
              <Typography>
                DT
              </Typography>
              <Box bgcolor="gray" width="8%" height="1px" my="auto" />
              <Typography>
                {position.DTRate}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <DeleteConfirm
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
        message={`Are you sure you'd like to delete ${position.title}?`}
        title={`Confirm Delete ${position.title}`}
        onConfirm={handleDelete}
      />
      <EditPositionDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        position={position}
        updateDepartments={updateDepartments}
        updatePosition={setCurrent}
      />
    </Box>
  )
}
