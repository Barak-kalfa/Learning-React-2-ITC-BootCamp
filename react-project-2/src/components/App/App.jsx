import React, { useState } from "react";
import "./App.css";
import NavBar from "../NavBar/NavBar";
import {BrowserRouter, Routes, Route, Navigate, } from "react-router-dom"
import Home from "../Home/Home";
import ProfilePage from "../ProfilePage/ProfilePage";
import SignUp from "../signUp/SignUp"
import { AuthProvider, useAuth } from "../contexts/AuthConext";
import { Login } from "../Login/Login";
import { auth } from "./firebase-config";
import {PrivateRoute} from "../PrivateRoute"

     function App() {
          const {currentUser} = useAuth;
          const [userName, setUserName] = useState();
          
     return (
          <AuthProvider>
               <div className="App d-flex flex-column">
                    <NavBar />
                    <div className="d-flex justify-content-center">
                         <BrowserRouter>
                              <Routes>
                                   <Route exact path="/" element={<Home />} />
                                   <Route
                                        path="/profile"
                                        element={<ProfilePage />}
                                   />
                                   <Route path="/login" element={<Login />} />
                                   <Route path="/signup" element={<SignUp />} />
                                   <Route
                                        path="/"
                                        element={
                                             currentUser && (
                                                  <Navigate to="/login" />
                                             )
                                        }
                                   />
                              </Routes>
                         </BrowserRouter>
                    </div>
               </div>
          </AuthProvider>
     );
}

export default App;
