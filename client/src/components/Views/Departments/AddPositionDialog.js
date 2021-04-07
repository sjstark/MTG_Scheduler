import React, { useState } from 'react'
import axios from 'axios'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Grid, DialogContent, TextField, Button, DialogActions, InputAdornment } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

export default function AddPositionDialog({ open, onClose, addPosition, department }) {

  const [position, setPosition] = useState({
    title: "",
    rate: 0.0
  })

  const [errors, setErrors] = useState({})

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`/api/departments/${department.id}/positions`, position)

      onClose()
      addPosition(res.data)
      setPosition({ title: "", rate: "0.00" })
    } catch (e) {
      if (e.response) {
        setErrors(e.response.data.errors)
      }
      console.log(e)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="">
      <DialogTitle> {`Create Position for ${department.title}`}</DialogTitle>
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
              label="Position Rate"
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
            Create
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
