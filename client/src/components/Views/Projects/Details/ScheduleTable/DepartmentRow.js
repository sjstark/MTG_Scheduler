import { Collapse, IconButton, TableCell, TableRow } from '@material-ui/core'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import React, { useEffect, useState } from 'react'

export default function DepartmentRow({ department, schedule }) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    console.log(schedule)
  }, [schedule])
  return (
    <>
      <TableRow>
        <TableCell>
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
        <TableCell> {department.title} </TableCell>
        {schedule && schedule.map((date) => (
          <React.Fragment key={`blank-${department.id}-${date.date}`}>
            <TableCell />
            <TableCell />
            <TableCell />
          </React.Fragment>
        ))}
      </TableRow>
      {/* <Collapse in={open} component={React.Fragment}> */}
      {
        open &&
        department.positions.map((position, idx) => (
          <TableRow>
            <TableCell />
            <TableCell>
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
                      <TableCell />
                      <TableCell />
                      <TableCell />
                    </React.Fragment>
                  )
                }
              })
            }
          </TableRow>
        ))}
      {/* </Collapse> */}
    </>
  )
}
