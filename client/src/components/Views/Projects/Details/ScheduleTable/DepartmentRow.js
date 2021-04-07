import { Box, IconButton, TableCell, TableRow } from '@material-ui/core'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import AddBoxIcon from '@material-ui/icons/AddBox';
import React, { useEffect, useState } from 'react'

function PositionShift({ position, date }) {
  return (
    <>
    </>
  )
}


function PositionRow({ position, schedule, classes }) {
  return (
    <TableRow>
      <TableCell className={[classes.colOne, classes.centered]} />
      <TableCell className={[classes.colTwo, classes.centered]}>
        {position.title}
      </TableCell>
      {schedule &&
        schedule.map((date) => {
          if (date.shifts[position.id]) {
            let positionShift = date.shifts[position.id]
            return (
              <React.Fragment key={`date-${date.date}-${position.title}-details`} >
                <TableCell>
                  {positionShift.startTime}
                </TableCell>
                <TableCell>
                  {positionShift.endTime}
                </TableCell>
                <TableCell>
                  {positionShift.quantity}
                </TableCell>
              </React.Fragment>
            )
          } else {
            return (
              <React.Fragment key={`date-${date.date}-${position.title}-details`} >
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </React.Fragment>
            )
          }
        })
      }
    </TableRow>
  )
}


export default function DepartmentRow({ department, schedule, classes }) {
  const [open, setOpen] = useState(true)
  const [addPosition, setAddPosition] = useState(true)

  useEffect(() => {
    console.log(schedule)
  }, [schedule])
  return (
    <>
      <TableRow>
        <TableCell className={[classes.colOne, classes.centered]}>
          <IconButton size="small" onClick={() => { setOpen(!open) }}>
            {
              open
                ?
                <KeyboardArrowUp />
                :
                <KeyboardArrowDown />
            }
          </IconButton>
        </TableCell>
        <TableCell className={[classes.colTwo, classes.centered]}>
          <Box display="flex" alignContent="center">
            {department.title}
            <IconButton size="small" onClick={() => { console.log('add position') }}>
              <AddBoxIcon />
            </IconButton>
          </Box>
        </TableCell>
        {schedule && schedule.map((date) => (
          <React.Fragment key={`blank-${department.id}-${date.date}`}>
            <TableCell />
            <TableCell />
            <TableCell />
          </React.Fragment>
        ))}
      </TableRow>
      {
        open &&
        department.positions.map((position, idx) => (
          <PositionRow key={`positionRow-${position.id}`} position={position} schedule={schedule} classes={classes} />
        ))}
    </>
  )
}
