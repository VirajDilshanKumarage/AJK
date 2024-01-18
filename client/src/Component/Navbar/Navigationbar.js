import React from 'react'
import { Link  } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';





function Navigationbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>JK</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Employee">Employee</Nav.Link>
            <Nav.Link href="/Department">Department</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default Navigationbar
