import { Box, Button, Collapse, Grid, IconButton, List, ListItem, Typography, Fab } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import OpenIcon from '@material-ui/icons/KeyboardArrowDown';
import CloseIcon from '@material-ui/icons/KeyboardArrowUp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddDepartmentDialog from './AddDepartmentDialog';

const FabBottom = {
  position: 'absolute',
  bottom: 20,
  alignSelf: "center"
}

function DepartmentListItem({ department, setCurrent, currentId }) {
  const [open, setOpen] = useState(false)

  const handleAdd = () => {
    setOpen(true)
  }

  return (
    <ListItem>
      <Box width="100%">

        <Grid container>
          <Grid item xs={1}>
            <IconButton size="small" onClick={() => { setOpen(!open) }}>
              {open
                ?
                <OpenIcon />
                :
                <CloseIcon />
              }
            </IconButton>
          </Grid>
          <Grid item xs={5}>
            <Box fontWeight="bold" fontSize="22px">
              {department.title}
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box fontSize="22px">
              {`${department.positions.length} Positions`}
            </Box>
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
    </ListItem >
  )
}


export default function DepartmentsList({ departments, setCurrent, setDepartments }) {
  const [openAddDepartment, setOpenAddDepartment] = useState(false)
  const [addPosition, setAddPosition] = useState(false)

  const addDepartment = (newDepartment) => {
    setDepartments([...departments, newDepartment])
  }

  return (
    <Box display="flex" flexDirection="column">
      <List>
        {departments && departments.map((department, idx) => {
          return (
            <DepartmentListItem key={`department-${department.id}`} department={department} setCurrent={setCurrent} />
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
