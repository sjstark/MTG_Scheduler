import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavButton = ({ view, Icon }) => {

  return (
    <NavLink
      className={`navbar__button`}
      to={view.toLowerCase()}
      activeClassName="--active"
    >
      <Icon fontSize="large" />
      <span className="navbar__button-text">
        {view}
      </span>
    </NavLink>
  )
}

export default NavButton
