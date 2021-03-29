import React from 'react'
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

const useStyles = makeStyles({
  // table: {
  //   minWidth: 650,
  //   position: "relative"
  // },
  colHead: {
    position: "sticky",
    left: 0,
    top: 0,
    backgroundColor: "white",
    borderRight: "1px solid black"
  }
});

export default function ScheduleTable({ projectId, schedule }) {


  return (
    <>
      { schedule &&
        schedule.map((el, idx) => {
          return (
            <>
              <div key={idx}>
                {el.date}
                {el.shifts.map((el, idx) => (
                  <div key={`shift-${el.id}`}>
                    {el.positionId}
                  </div>
                ))}
              </div>
            </>
          )
        })
      }
    </>
  )
}
