import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.scss'
import NavButton from './NavButton'

import ProjectsIcon from '@material-ui/icons/CalendarToday';
import VenuesIcon from '@material-ui/icons/Business';
import DepartmentsIcon from '@material-ui/icons/People';
import ClientsIcon from '@material-ui/icons/BusinessCenter';
import AdminIcon from '@material-ui/icons/Settings';

import MTGLogo from '../../media/MTG Logo White.png'

const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className="navbar">
      <div className="navbar__top-group">
        <img src={MTGLogo} />
        <NavButton view="Projects" Icon={ProjectsIcon} />
        <NavButton view="Venues" Icon={VenuesIcon} />
        <NavButton view="Departments" Icon={DepartmentsIcon} />
        <NavButton view="Clients" Icon={ClientsIcon} />
      </div>
      <div className="navbar__bottom-group">
        <NavButton view="Admin" Icon={AdminIcon} />
        <LogoutButton setAuthenticated={setAuthenticated} />
      </div>
    </nav>
  );
}

export default NavBar;
