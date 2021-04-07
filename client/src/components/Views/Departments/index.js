import React, { useEffect, useState } from 'react'
import axios from 'axios'

import PanelView from '../../PanelView'

import DepartmentsList from './DepartmentsList'
import DepartmentDetails from './DepartmentDetails'
import Fab from '@material-ui/core/Fab'

export default function DepartmentsOverview() {
  const [departments, setDepartments] = useState([])
  const [selectedPosition, setSelectedPosition] = useState(null)

  const updateDepartments = async () => {
    const res = await axios.get(`/api/departments`)
    if (res.status === 200) {
      setDepartments(res.data)
    } else {
      console.log(res)
    }
  }

  useEffect(() => {
    updateDepartments()
  }, [])

  return (
    <div>
      <PanelView
        left={
          <DepartmentsList
            departments={departments}
            setDepartments={setDepartments}
            setCurrent={setSelectedPosition}
            currentId={selectedPosition && selectedPosition.id}
            reloadDepartments={updateDepartments}
          />
        }
        right={selectedPosition &&
          <DepartmentDetails
            position={selectedPosition}
            setCurrent={setSelectedPosition}
            updateDepartments={updateDepartments}
          />
        }
      />
    </div>
  )
}
