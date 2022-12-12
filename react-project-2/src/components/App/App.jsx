import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "../NavBar/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home/Home";
import ProfilePage from "../ProfilePage/ProfilePage";
import SignUp from "../signUp/SignUp";
import { AuthProvider } from "../contexts/AuthConext";
import { Login } from "../Login/Login";
import { PrivateRoute } from "../PrivateRoute";

function App() {

     return (
          <div className="App d-flex flex-column">
               <BrowserRouter>
                    <AuthProvider>
                         <NavBar />
                         <div className="d-flex justify-content-center">
                              <Routes>
                                   <Route path="/signup" element={<SignUp />} />
                                   <Route path="/login" element={<Login />} />
                                   <Route
                                        exact
                                        path="/"
                                        element={
                                             <PrivateRoute>
                                                  <Home />
                                             </PrivateRoute>
                                        }
                                   ></Route>
                                   <Route
                                        exact
                                        path="/profile"
                                        element={
                                             <PrivateRoute>
                                                  <ProfilePage />
                                             </PrivateRoute>
                                        }
                                   ></Route>
                              </Routes>
                         </div>
                    </AuthProvider>
               </BrowserRouter>
          </div>
     );
}

export default App;

// <AuthProvider>
//      <div className="App d-flex flex-column">
//           <NavBar />
//           <div className="d-flex justify-content-center">
//                <BrowserRouter>
//                     <Routes>
//                          <Route
//                               exact
//                               path="/"
//                               element={
//                                    <PrivateRoute>
//                                         <HomePage />
//                                    </PrivateRoute>
//                               }
//                          ></Route>
//                          <Route
//                               exact
//                               path="/profile"
//                               element={
//                                    <PrivateRoute>
//                                         <ProfilePage />
//                                    </PrivateRoute>
//                               }
//                          ></Route>
//                          <Route path="/login" element={<Login />} />
//                          <Route path="/signup" element={<SignUp />} />
//                          <Route
//                               path="/"
//                               element={
//                                    currentUser && (
//                                         <Navigate to="/login" />
//                                    )
//                               }
//                          />
//                     </Routes>
//                </BrowserRouter>
//           </div>
//      </div>
// </AuthProvider>;
