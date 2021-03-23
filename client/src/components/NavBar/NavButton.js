import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { setView } from '../../store/view'

export const NavButton = ({ view, Icon }) => {
  const dispatch = useDispatch()

  const currentView = useSelector(state => state.view)

  const [active, setActive] = useState(currentView == view)

  useEffect(() => {
    console.log(view, currentView)
    setActive(view == currentView)
  }, [view, currentView])

  return (
    <div
      className={`navbar__button ${active ? "--active" : ""}`}
      onClick={() => dispatch(setView(view))}
    >
      <Icon fontSize="large" />
      <span className="navbar__button-text">
        {view}
      </span>
    </div>
  )
}

export default NavButton
