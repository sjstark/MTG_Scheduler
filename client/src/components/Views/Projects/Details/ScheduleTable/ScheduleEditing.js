import { Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import AsyncCreateableSelect from 'react-select/async-creatable'
import AsyncSelect from 'react-select/async'


import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios';

function AddDepartmentDialog({ open, onClose, handleAdd = null }) {

  const [departmentOptions, setDepartmentOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState(undefined)

  useEffect(() => {
    console.log(value)

  }, [value])

  const loadDepartments = async (inputValue, cb) => {
    // setIsLoading(true)
    const res = await axios.get(`/api/departments?query=${inputValue}`)
    const options = res.data.map((department) => ({ value: department, label: department.title }))
    cb(options)
    // setIsLoading(false)
  }

  const createDepartment = async (inputValue) => {
    setIsLoading(true)
    const res = await axios.post(`/api/departments`, { title: inputValue })
    setDepartmentOptions([...departmentOptions, { value: res.data, label: res.data.title }])
    setValue(res.data)
    setIsLoading(false)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Add Department To Schedule</DialogTitle>
      <DialogContent>
        <Box mb={12}>
          {/* <AsyncCreateableSelect
            options={departmentOptions}
            value={value}
            // cacheOptions
            isDisabled={isLoading}
            isLoading={isLoading}
            // defaultOptions
            loadOptions={loadDepartments}
            onCreateOption={createDepartment}
            onChange={(newValue) => { setValue(newValue) }}
          /> */}
          <AsyncSelect
            value={value}
            cacheOptions
            isDisabled={isLoading}
            isLoading={isLoading}
            defaultOptions
            loadOptions={loadDepartments}
            onChange={(newValue) => { setValue(newValue) }}
          />
        </Box>
        <DialogActions>
          <Button
            onClick={onClose}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => { handleAdd(value.value); onClose() }}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog >
  )
}

export default function ScheduleEditing({ project, schedule, setSchedule, setProject }) {
  const [openAddDepartment, setOpenAddDepartment] = useState(false)

  const handleAdd = (department) => {
    const updatedProject = { ...project }
    updatedProject.departments[department.id] = { ...department, positions: [] }
    setProject(updatedProject)
  }

  return (
    <Box>
      <IconButton variant="contained" onClick={() => setOpenAddDepartment(true)}>
        <AddCircleIcon />
      </IconButton>
      <AddDepartmentDialog
        open={openAddDepartment}
        onClose={() => setOpenAddDepartment(false)}
        handleAdd={handleAdd}
      />
    </Box>
  )
}
