import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";
import "./NavBar.css"


function NavBar() {
     const location = window.location.pathname;
  return (
     <div>
<Navbar bg="dark" variant="dark" className='w-100 rounded'>
        <Container >
          <Nav className="me-auto">
            <Nav.Link href="/" className={location === "/" ? 'fw-bold link-light' : ""}>Home</Nav.Link>
            <Nav.Link href="/profile" className={location === "/profile" ? 'fw-bold link-light' : ""}>Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  </div>
  )
}

export default NavBar

