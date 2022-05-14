import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidenav" style={{top:"0px"}}>
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          <img src='logo192.png' alt='' width='50px' />
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li>
        <Link to="/" className="nav-link">
          Inventory
        </Link>
      </li>
    </ul>
    </div>
    </div>
  )
}

export default Sidebar;