import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import { setView } from '../../store/view'

export const NavButton = ({ view, Icon }) => {

  const history = useHistory()

  const location = useLocation()

  const [active, setActive] = useState(location.pathname.split('/')[0] == view.toLowerCase())



  // useEffect(() => {
  //   setActive(view == currentView)
  // }, [view, currentView])

  const navigate = () => {
    history.push(`/${view.toLowerCase()}`)
  }

  return (
    <NavLink
      className={`navbar__button`}
      to={view.toLowerCase()}
      activeClassName="--active"
    // onClick={navigate}
    >
      {active && (
        <div className="navbar__button-activebar">
        </div>
      )}
      <Icon fontSize="large" />
      <span className="navbar__button-text">
        {view}
      </span>
    </NavLink>
  )
}

export default NavButton
