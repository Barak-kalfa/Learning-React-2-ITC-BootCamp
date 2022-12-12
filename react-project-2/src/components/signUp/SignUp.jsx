import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useRef, useEffect } from 'react'
import { useState } from 'react';
import { auth, db } from '../App/firebase-config';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import {
     createUserWithEmailAndPassword,
     onAuthStateChanged,
} from "@firebase/auth";

import "./SignUp.css"


export default function SignUp() {


     const usersCollectionRef = collection(db, "users");
     const emailRef = useRef();
     const nameRef = useRef();
     const passwordRef = useRef();
     const passwordConfirmRef = useRef();
    
     
     const [error, setError] = useState ('')
     const [loading, setLoading] = useState(false);
     const [currentUser, setCurrentUser] = useState();
     const navigate = useNavigate();

         useEffect(() => {
              const unsubscribe = auth.onAuthStateChanged((user) => {
                   setCurrentUser(user);
              });
              return unsubscribe;
         }, []);

                        const createUser = async () => {
                             await addDoc(usersCollectionRef, {
                                  name: nameRef.current.value,
                                  email: emailRef.current.value,
                                  password: passwordRef.current.value,
                                  key: auth.currentUser.uid,
                             });
                        };
                 
               const registerUser = async (e) => {
                       e.preventDefault();
                      if (
                           passwordRef.current.value !==
                           passwordConfirmRef.current.value
                      ) {
                           return setError("Password Do Not Match");
                      }
                    try {
                             setError("");
                             setLoading(true);
                         const user = await createUserWithEmailAndPassword(
                              auth,
                              emailRef.current.value,
                              passwordRef.current.value
                         );
                         createUser()
                      navigate("/");
                    } catch (error) {
                         console.log(error.message);
                              setError("Failed To Create An Account :(");
                    }
                          setLoading(false);
               };



  return (
       <>
            <Card className=" SignUp mt-5" bg="dark">
                 <Card.Body>
                      <h2 className="text-center mb-4">Sign Up</h2>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form onSubmit={registerUser}>
                           <Form.Group id="Username">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control
                                     className="textInput"
                                     type="text"
                                     ref={nameRef}
                                     required
                                />
                           </Form.Group>
                           <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                     className="textInput"
                                     type="email"
                                     ref={emailRef}
                                     required
                                />
                           </Form.Group>
                           <Form.Group id="passowrd">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                     className="textInput"
                                     type="password"
                                     ref={passwordRef}
                                     required
                                />
                           </Form.Group>
                           <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control
                                     className="textInput"
                                     type="password"
                                     ref={passwordConfirmRef}
                                     required
                                />
                           </Form.Group>
                           <Button
                                disabled={loading}
                                className="w-100"
                                type="submit"
                           >
                                Sign Up
                           </Button>
                      </Form>
                 </Card.Body>
                 <div className="w-100 text-center mt-2 mb-2">
                      Already have an account? <Link to="/login">Log In</Link>
                 </div>
            </Card>
       </>
  );
}
