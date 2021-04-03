import React, { useEffect, useState } from 'react'
import axios from 'axios'

import PanelView from '../../PanelView'

import DepartmentsList from './DepartmentsList'
import DepartmentDetails from './DepartmentDetails'
import Fab from '@material-ui/core/Fab'

export default function DepartmentsOverview() {
  const [departments, setDepartments] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState({})

  const left = (<DepartmentsList departments={departments} />)

  const right = (<DepartmentDetails department={selectedDepartment} />)

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/api/departments`)
      if (res.status === 200) {
        setDepartments(res.data)
      } else {
        console.log(res)
      }
    })()
  }, [])

  return (
    <div>
      <PanelView left={left} right={right} />
    </div>
  )
}
