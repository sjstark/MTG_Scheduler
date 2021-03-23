import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.scss'

import MTGLogo from '../../media/MTG Logo White.png'

const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className="navbar">
      <img src={MTGLogo} />
      <LogoutButton setAuthenticated={setAuthenticated} />
    </nav>
  );
}

export default NavBar;
