// src/components/NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css'; // Import the CSS file

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className="nav-link"
            activeClassName="active-link" // This class will be applied when the link is active
          >
            Template
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/parameters/1"
            className="nav-link"
            activeClassName="active-link"
          >
            Parameters
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/budgeting-framework/1"
            className="nav-link"
            activeClassName="active-link"
          >
            Budgeting Framework
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
