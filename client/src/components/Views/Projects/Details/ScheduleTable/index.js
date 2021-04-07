import React, { useEffect } from 'react'
import {
  Fab,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

import DepartmentRow from './DepartmentRow'
import TotalsRow from './TotalsRow'

const useStyles = makeStyles({
  colOne: {
    // position: "sticky",
    left: 0,
    top: 0,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  colTwo: {
    // position: "sticky",
    left: "62px",
    top: 0,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    textAlign: "center"
  },
  colData: {
    width: "5vw"
  },
  colDataEnd: {
    width: "5vw",
    borderRight: "1px solid grey"
  },
  tableRightBorder: {
    borderRight: "2px solid grey"
  },
  tableRightBorderLight: {
    borderRight: "1px solid grey"
  },
  centered: {
    textAlign: "center"
  }
});

export default function ScheduleTable({ projectId, schedule, departments }) {
  const classes = useStyles()

  useEffect(() => {
    console.log(departments)
    if (departments) {
      console.log(Object.values(departments))
    }
  }, [departments])

  return (
    <>
      <Table>
        {/* <colgroup className={classes.absoluteLeft} span={2}>
          <col />
          <col className={classes.tableRightBorder} />
        </colgroup>
        <colgroup>
          {schedule &&
            schedule.map((el, idx) => (
              <React.Fragment key={`dategroup-${el.date}`}>
                <col className={classes.colData} />
                <col className={classes.colData} />
                <col className={classes.colDataEnd} />
              </React.Fragment>
            ))
          }
        </colgroup> */}
        <TableHead>
          <TableRow>
            <TableCell className={[classes.colOne, classes.centered]} colSpan={2}>
              Position
            </TableCell>
            {schedule &&
              schedule.map((el, idx) => (
                <TableCell key={`datehead-${el.date}`} colSpan={3} className={classes.centered}>
                  {el.date}
                </TableCell>
              ))
            }
          </TableRow>

          <TableRow>
            <TableCell className={[classes.colOne, classes.centered]} />
            <TableCell className={[classes.colTwo, classes.centered]} />
            {schedule &&
              schedule.map((el, idx) => (
                <React.Fragment key={`datehead-${el.date}`}>
                  <TableCell className={classes.centered}>
                    IN
                  </TableCell>
                  <TableCell className={classes.centered}>
                    OUT
                  </TableCell>
                  <TableCell className={classes.centered}>
                    QTY
                  </TableCell>
                </React.Fragment>
              ))
            }
          </TableRow>
        </TableHead>


        <TableBody>
          {departments &&
            Object.values(departments).map((department, idx) => (
              <DepartmentRow key={`department-row-${department.id}-${idx}`} department={department} schedule={schedule} classes={classes} />
            ))
          }
          <TotalsRow schedule={schedule} classes={classes} />
        </TableBody>
      </Table>
    </>
  )
}
