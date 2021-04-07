import { TableRow, TableCell, } from '@material-ui/core'
import React from 'react'

export default function TotalsRow({ schedule, classes }) {
  return (
    <TableRow>
      <TableCell />
      <TableCell>Total</TableCell>
      {schedule &&
        schedule.map((date, idx) => (
          <React.Fragment key={`total-${date.date}`}>
            <TableCell >
            </TableCell>
            <TableCell >
              $
            </TableCell>
            <TableCell >
            </TableCell>
          </React.Fragment>
        ))
      }
    </TableRow>
  )
}
