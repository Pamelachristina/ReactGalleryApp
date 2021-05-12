import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
  <header>
    <ul className="main-nav">
      <li><NavLink to="/cats">Cats</NavLink></li>
      <li><NavLink to="/dogs">Dogs</NavLink></li>
      <li><NavLink to ="/owls">Owls</NavLink></li>
    </ul>    
  </header>
);

export default Nav;