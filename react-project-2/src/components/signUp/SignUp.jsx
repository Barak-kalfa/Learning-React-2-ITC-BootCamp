import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useRef, useEffect } from 'react'
import { useState } from 'react';
import { auth } from '../App/firebase-config';
import { Link } from 'react-router-dom';
import {
     createUserWithEmailAndPassword,
     onAuthStateChanged,
} from "@firebase/auth";



export default function SignUp() {

     const emailRef = useRef();
     const passwordRef = useRef();
     const passwordConfirmRef = useRef();
    

     const [error, setError] = useState ('')
     const [loading, setLoading] = useState(false);
     const [currentUser, setCurrentUser] = useState();

         useEffect(() => {
              const unsubscribe = auth.onAuthStateChanged((user) => {
                   setCurrentUser(user);
              });
              return unsubscribe;
         }, []);

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
                    } catch (error) {
                         console.log(error.message);
                              setError("Failed To Create An Account :(");
                    }
                          setLoading(false);
               };

//     async function handleSubmit (e) {
//           e.preventDefault();
//           console.log(emailRef.current.value,);

//           if (passwordRef.current.value !== passwordConfirmRef.current.value){
//                return setError('Password Do Not Match')
//           }
//           try {
//                setError('')
//                setLoading(true);
//                await auth.createUserWithEmailAndPassword(
//                     emailRef.current.value,
//                     passwordRef.current.value
//                );
     
//           } catch {
//                setError('Failed To Create An Account :(')
//           }
//           setLoading(false)
//      }

  return (
       <>
            <Card className="mt-5">
                 <Card.Body>
                      <h2 className="text-center mb-4">Sign Up</h2>
                      {currentUser && currentUser.email}
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form onSubmit={registerUser}>
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
                           <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control
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
                                {" "}
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
