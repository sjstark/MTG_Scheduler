import { TextField, Box, Button, Collapse, Grid, IconButton, List, ListItem, Typography, Fab, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import OpenIcon from '@material-ui/icons/KeyboardArrowDown';
import CloseIcon from '@material-ui/icons/KeyboardArrowUp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import AddDepartmentDialog from './AddDepartmentDialog';
import AddPositionDialog from './AddPositionDialog';
import Alert from '@material-ui/lab/Alert';

import DeleteConfirm from './DeleteConfirm'

const FabBottom = {
  position: 'absolute',
  bottom: 20,
  alignSelf: "center"
}


function EditDepartmentDialog({ open, onClose, department: initialDepartment, updateDepartment, reloadDepartments }) {
  const [errors, setErrors] = useState({})
  const [department, setDepartment] = useState({ ...initialDepartment })

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)

  const handleSubmit = async () => {
    try {
      const res = await axios.put(`/api/departments/${department.id}`, department)

      onClose()
      updateDepartment(res.data)
    } catch (e) {
      if (e.response) {
        setErrors(e.response.data.errors)
      }
      console.log(e)
    }
  }

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/departments/${department.id}`)

      onClose()
      reloadDepartments()
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
      <DialogTitle>{`Edit ${department.title}`}</DialogTitle>
      <DialogContent>
        <Grid container direction='column' spacing={5}>
          <Grid item>
            <TextField
              autoFocus
              label="Department Title"
              value={department.title}
              onChange={({ target }) => setDepartment({ ...department, title: target.value })}
              error={errors.title}
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
          <Button onClick={() => setOpenDeleteConfirm(true)} color="secondary">
            Delete
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </DialogContent>
      <DeleteConfirm
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
        message={`Are you sure you'd like to delete ${department.title}?`}
        title={`Confirm Delete ${department.title}`}
        onConfirm={handleDelete}
      />
    </Dialog>
  )
}

function DepartmentListItem({ department, setCurrent, currentId, departmentIdx, changeDepartment, reloadDepartments }) {
  const [open, setOpen] = useState(false)
  const [openAddPosition, setOpenAddPosition] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const handleAdd = () => {
    setOpen(true)
    setOpenAddPosition(true)
  }

  const handleAddPosition = (position) => {
    const updatedDepartment = { ...department }
    updatedDepartment.positions.push(position)
    changeDepartment(departmentIdx, updatedDepartment)
  }

  return (
    <ListItem>
      <Box width="100%">

        <Grid container>
          <Grid item xs={1}>
            <IconButton size="small" onClick={() => { setOpen(!open) }}>
              {open
                ?
                <CloseIcon />
                :
                <OpenIcon />
              }
            </IconButton>
          </Grid>
          <Grid item xs={5}>
            <Box fontWeight="bold" fontSize="22px">
              {department.title}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box fontSize="22px">
              {`${department.positions.length} Positions`}
            </Box>
          </Grid>
          <Grid item xs={1}>
            <IconButton size="small" onClick={() => setOpenEdit(true)}>
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton size="small" onClick={handleAdd}>
              <AddBoxIcon />
            </IconButton>
          </Grid>
        </Grid>


        <Box width="100%">

          <Collapse in={open} component="div">
            <List>

              {department &&
                department.positions.map((position, idx) => {
                  return (
                    <ListItem key={`position-${position.id}`} >
                      <Box ml={5}>
                        <Button fullWidth onClick={() => { setCurrent(position) }}>
                          {`• ${position.title}`}

                        </Button>
                      </Box>
                    </ListItem>
                  )
                })
              }
            </List>
          </Collapse>
        </Box>
      </Box>
      <AddPositionDialog
        open={openAddPosition}
        onClose={() => setOpenAddPosition(false)}
        addPosition={handleAddPosition}
        department={department}
      />
      <EditDepartmentDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        department={department}
        updateDepartment={(updatedDepartment) => changeDepartment(departmentIdx, updatedDepartment)}
        reloadDepartments={reloadDepartments}
      />
    </ListItem >
  )
}


export default function DepartmentsList({ departments, setCurrent, setDepartments, reloadDepartments }) {
  const [openAddDepartment, setOpenAddDepartment] = useState(false)

  const addDepartment = (newDepartment) => {
    setDepartments([...departments, newDepartment])
  }

  const changeDepartment = (idx, updatedDepartment) => {
    const newDepartments = [...departments]
    newDepartments[idx] = updatedDepartment
    setDepartments(newDepartments)
  }

  return (
    <Box display="flex" flexDirection="column">
      <List>
        {departments && departments.map((department, idx) => {
          return (
            <DepartmentListItem key={`department-${department.id}`} department={department} changeDepartment={changeDepartment} departmentIdx={idx} setCurrent={setCurrent} reloadDepartments={reloadDepartments} />
          )
        })}
      </List>
      <Fab variant="extended" size="small" style={FabBottom} onClick={() => setOpenAddDepartment(true)}>
        Add Department
      </Fab>
      <AddDepartmentDialog open={openAddDepartment} onClose={() => setOpenAddDepartment(false)} addDepartment={addDepartment} />
    </Box>
  )
}
