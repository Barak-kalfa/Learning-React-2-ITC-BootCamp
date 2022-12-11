import { Form, Button, Card, Alert } from "react-bootstrap";
import { useRef, useEffect } from "react";
import { useState } from "react";
import { auth } from "../App/firebase-config";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword,
onAuthStateChanged, 
signInWithEmailAndPassword} from "@firebase/auth";

export  function Login() {
     const emailRef = useRef();
     const passwordRef = useRef();

     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);
     const [currentUser, setCurrentUser] = useState();

     useEffect(() => {
          const unsubscribe = auth.onAuthStateChanged((user) => {
               setCurrentUser(user);
          });
          return unsubscribe;
     }, []);


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
                         } catch (error) {
                              console.log(error.message);
                              setError("Failed To Create An Account :(");
                         }
                         setLoading(false);
                    };


     // async function handleSubmit(e) {
     //      e.preventDefault();


     //      try {
     //           setError("");
     //           setLoading(true);
     //           await auth.signInWithEmailAndPassword(
     //                emailRef.current.value,
     //                passwordRef.current.value
     //           );
     //      } catch {
     //           setError("Failed To Log In :(");
     //      }
     //      setLoading(false);
     // }

     return (
          <>
               <Card className="mt-5">
                    <Card.Body>
                         <h2 className="text-center mb-4">Login</h2>
                         {currentUser && currentUser.email}
                         {error && <Alert variant="danger">{error}</Alert>}
                         <Form onSubmit={loginUser}>
                              <Form.Group id="email">
                                   <Form.Label>Email</Form.Label>
                                   <Form.Control
                                        type="email"
                                        ref={emailRef}
                                        required
                                   />
                              </Form.Group>
                              <Form.Group id="passowrd">
                                   <Form.Label>Password</Form.Label>
                                   <Form.Control
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
                         </Form>
                    </Card.Body>
                    <div className="w-100 text-center mt-2 mb-2">
                         Don't have an account?{" "}
                         <Link to="/signup">Sign Up</Link>
                    </div>
               </Card>
          </>
     );
}
