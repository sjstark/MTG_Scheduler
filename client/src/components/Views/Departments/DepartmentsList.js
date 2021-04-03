import { Collapse, IconButton, List, ListItem, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import OpenIcon from '@material-ui/icons/KeyboardArrowDown';
import CloseIcon from '@material-ui/icons/KeyboardArrowUp';

function DepartmentListItem({ department }) {
  const [open, setOpen] = useState(true)

  return (
    <ListItem>
      <IconButton onClick={() => { setOpen(!open) }}>
        {open
          ?
          <CloseIcon />
          :
          <OpenIcon />
        }
      </IconButton>
      <Typography variant="h6">
        {department.title}
      </Typography>
      <Collapse open={open}>
        <List>

          {department &&
            department.positions.map((position, idx) => {
              return (
                <ListItem key={`position-${position.id}`}>
                  {position.title}
                </ListItem>
              )
            })
          }
        </List>
      </Collapse>
    </ListItem>
  )
}

export default function DepartmentsList({ departments }) {
  useEffect(() => {
    console.log(departments)
  }, [departments])
  return (
    <List>
      {departments && departments.map((department, idx) => {
        return (
          <DepartmentListItem key={`department-${department.id}`} department={department} />
        )
      })}
    </List>
  )
}
