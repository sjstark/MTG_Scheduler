import React, { useState } from 'react'
import axios from 'axios'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { DialogContent, TextField, Button, DialogActions } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';

export default function AddDepartmentDialog({ open, onClose, addDepartment }) {
  const [department, setDepartment] = useState({
    title: ""
  })

  const [errors, setErrors] = useState({})

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`/api/departments`, department)

      onClose()
      addDepartment(res.data)
      setDepartment({ title: "" })
    } catch (e) {
      setErrors(e.response.data.errors)
      console.log(e.response.data)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="">
      <DialogTitle> Create Department</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Department Title"
          value={department.title}
          onChange={({ target }) => setDepartment({ ...department, title: target.value })}
          error={errors.title}
        />
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
            Create
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
