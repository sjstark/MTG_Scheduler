import React, { useEffect } from 'react'
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

import DepartmentRow from './DepartmentRow'

const useStyles = makeStyles({
  // table: {
  //   minWidth: 650,
  //   position: "relative"
  // },
  colCarret: {
    position: "sticky",
    left: 0,
    top: 0,
    backgroundColor: "white",
    width: 30
  },
  colHead: {
    position: "sticky",
    left: 0,
    top: 0,
    backgroundColor: "white",
    width: "10vw",
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
        <colgroup>
          <col />
          <col className={classes.tableRightBorder} />
          {schedule &&
            schedule.map((el, idx) => (
              <React.Fragment key={`dategroup-${el.date}`}>
                <col className={classes.colData} />
                <col className={classes.colData} />
                <col className={classes.colDataEnd} />
              </React.Fragment>
            ))
          }
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell className={[classes.colHead, classes.centered]} colSpan={2}>
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
            <TableCell />
            <TableCell />
            {schedule &&
              schedule.map((el, idx) => (
                <>
                  <TableCell key={`datehead-${el.date}-in`} className={classes.centered}>
                    IN
                  </TableCell>
                  <TableCell key={`datehead-${el.date}-out`} className={classes.centered}>
                    OUT
                  </TableCell>
                  <TableCell key={`datehead-${el.date}-qty`} className={classes.centered}>
                    QTY
                  </TableCell>
                </>
              ))
            }
          </TableRow>
        </TableHead>


        <TableBody>
          {departments &&
            Object.values(departments).map((department, idx) => (
              <DepartmentRow key={`department-row-${department.id}-${idx}`} department={department} schedule={schedule} />
            ))
          }
        </TableBody>
      </Table>
    </>
  )
}
