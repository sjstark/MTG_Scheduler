import { Typography, Box, withStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'

import './Header.scss'

const WhiteText = withStyles({
  root: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }
})(Typography)

function Header({ project }) {

  const location = useLocation()

  const [view, setView] = useState()


  useEffect(() => {
    let path = location.pathname.split('/')
    let viewname = path[1]
    console.log(path, viewname)
    switch (viewname) {
      case "projects":
        setView("Projects")
        // if (/^([0-9]+)$/.test(path[2])) {
        //   setView("Projects - " + project.title)
        // }
        return
      case "venues":
        setView("Venues")
        return
      case "clients":
        setView("Clients")
        return
      case "departments":
        setView("Departments")
        return
      default:
        setView("Home")
        return
    }
  }, [location.pathname])

  return (
    <header className="header">
      <Box m={2}>
        <WhiteText
          variant="h5"
        >
          {view}
        </WhiteText>
      </Box>
    </header>
  )
}

const mapStateToProps = (state) => {
  const project = state.projectsData.currentProject
  return { project }
}

export default connect(mapStateToProps)(Header)
