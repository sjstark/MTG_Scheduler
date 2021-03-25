import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import ProjectsOverview from './components/Views/Projects/Overview'

import "./MainApp.scss"

export default function MainApp() {
  const currentView = useSelector(state => state.view)

  const renderSwitch = (currentView) => {
    switch (currentView) {
      case "Projects":
        return <ProjectsOverview />
      case "Departments":

      case "Clients":

      case "Venues":

      default:
        return "Unavailable"
    }
  }

  return (
    <div className="mainApp">
      {renderSwitch(currentView)}
    </div>
  )
}
