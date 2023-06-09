import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import "./NavBar.css";
import { auth } from "../App/firebase-config";
import { Link } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { useAuth } from "../contexts/AuthConext";

function NavBar() {
     
     const { imageDownloadUrl } = useAuth();
     const {userName} = useAuth()

     const logOut = async () => {
          await signOut(auth);
          window.location.reload(false);
     };
     const LinkStyle = "text-decoration-none text-light m-2";
     return (
          <div className="sticky-sm-top">
               <Navbar bg="dark" variant="dark" className="w-100 rounded ">
                    <Container className="">
                         <Nav className="nav me-auto  ">
                              <Link to="/" className={LinkStyle}>
                                   Home
                              </Link>
                              <Link to="/profile" className={LinkStyle}>
                                   Profile
                              </Link>
                              <Link to="/login" className={LinkStyle}>
                                   Login
                              </Link>
                              <Link to="/signup" className={LinkStyle}>
                                   Sign Up
                              </Link>
                              <Link className={LinkStyle} onClick={logOut}>
                                   Sign Out
                              </Link>
                         </Nav>
                    </Container>
                    {userName && <div className={LinkStyle}>{userName}</div>}
                    {imageDownloadUrl && (
                         <img
                              className=" nav-img d-flex justify-self-end me-4"
                              src={imageDownloadUrl}
                         />
                    )}
               </Navbar> 
          </div>
     );
}

export default NavBar;
