import { Form, Button, Card, Alert } from "react-bootstrap";
import { useRef, useEffect } from "react";
import { useState } from "react";
import { auth } from "../App/firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider} from "@firebase/auth";
import { useAuth } from "../contexts/AuthConext"; 
import "./Login.css"

export  function Login() {
     const emailRef = useRef();
     const passwordRef = useRef();

     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);
     const {setCurrentUser} = useAuth();
     const {currentUser} = useAuth()
     const GoogleProvider = new GoogleAuthProvider();

     const navigate = useNavigate();

               const googleLogIn = () => {
                    signInWithPopup(auth, GoogleProvider)
                         .then((result) => {
                              const credential =
                                   GoogleAuthProvider.credentialFromResult(
                                        result
                                   );
                              const token = credential.accessToken;
                             setCurrentUser(result.user)
                              const user = result.user;
                         })
                         .catch((error) => {
                              const errorCode = error.code;
                              const errorMessage = error.message;
                              const email = error.customData.email;
                              const credential =
                                   GoogleAuthProvider.credentialFromError(
                                        error
                                   );
                         });
               }
                    const loginUser = async (e) => {
                         e.preventDefault();
                         try {
                              setError("");
                              setLoading(true);
                              const user = await signInWithEmailAndPassword(
                                   auth,
                                   emailRef.current.value,
                                   passwordRef.current.value
                              );
                              navigate('/')
                         } catch (error) {
                              console.log(error.message);
                              setError("Failed To Log In :(");
                         }
                         setLoading(false);
                    };

     return (
          <>
               <Card className=" Login mt-5" bg="dark">
                    <Card.Body>
                         <h2 className="text-center mb-4">Login</h2>
                         {currentUser && currentUser.email}
                         {error && <Alert variant="danger">{error}</Alert>}
                         <Form onSubmit={loginUser}>
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
                              <Button
                                   disabled={loading}
                                   className="w-100"
                                   type="submit"
                              >
                                   Login
                              </Button>
                              <Button
                                   disabled={loading}
                                   className="w-100 pb-2"
                                   onClick={googleLogIn}
                              >
                                   Log In With Google
                              </Button>
                         </Form>
                    </Card.Body>

                    <div className="w-100 text-center mt-2 mb-2">
                         Don't have an account?
                         <Link to="/signup"> Sign Up</Link>
                    </div>
               </Card>
          </>
     );
}
