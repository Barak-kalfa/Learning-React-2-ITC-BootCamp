import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";
import "./NavBar.css"
import { auth } from "../App/firebase-config";
import { signOut } from "@firebase/auth";


function NavBar() {
     const location = window.location.pathname;
     
       const logOut = async () => {
            await signOut(auth);
       };
  return (
     <div className='sticky-sm-top'>
<Navbar bg="dark" variant="dark" className='w-100 rounded'>
        <Container >
          <Nav className="me-auto">
            <Nav.Link href="/" className={location === "/" ? 'fw-bold link-light' : ""}>Home</Nav.Link>
            <Nav.Link href="/profile" className={location === "/profile" ? 'fw-bold link-light' : ""}>Profile</Nav.Link>
            <Nav.Link href="/login" className={location === "/login" ? 'fw-bold link-light' : ""}>Login</Nav.Link>
            <Nav.Link href="/signup" className={location === "/singup" ? 'fw-bold link-light' : ""}>Sign Up</Nav.Link>
            <Nav.Link onClick={logOut}>Sign Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  </div>
  )
}

export default NavBar

