import React from 'react'
import { Link  } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navigationbar.css';
import Logo from '../../asset/keells_logo.ico';





function Navigationbar() {
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <img src={Logo} className='Logo' alt="Logo" />
    <ul className="navbar-nav ml-auto">
      <li className='nav-item'><Link to={"/"} className="nav-link">Home</Link></li>
      <li className='nav-item'><Link to={"/Employee"} className="nav-link">Employee</Link></li>
      <li className='nav-item'><Link to={"/Department"} className="nav-link">Department</Link></li>
    </ul>
  </nav>
  )
}

export default Navigationbar
