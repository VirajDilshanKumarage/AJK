import React from 'react'
import { Link  } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navigationbar.css';





function Navigationbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>John Keells</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/" className="underline-on-hover">Home</Nav.Link>
            <Nav.Link href="/Employee" className="underline-on-hover">Employee</Nav.Link>
            <Nav.Link href="/Department" className="underline-on-hover">Department</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default Navigationbar
