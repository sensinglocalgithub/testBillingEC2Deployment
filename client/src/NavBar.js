// src/components/NavBar.js
import React, {useState, useContext} from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import './App.css'; // Import the CSS file
import { UserContext } from './UserContext';

function NavBar() {
  const  navigate = useNavigate();  
  const { user, setUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

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
      {user && (
          <div className="navbar-user" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img src={user.picture} alt={user.name} className="navbar-avatar" />
          <span className="navbar-username">{user.name}</span>

          {dropdownOpen && (
            <div className="navbar-dropdown">
              <button className="navbar-dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
        )}
    </nav>
  );
}

export default NavBar;
