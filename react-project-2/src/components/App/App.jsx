import React, { useState } from "react";
import "./App.css";
import NavBar from "../NavBar/NavBar";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "../Home/Home";
import ProfilePage from "../ProfilePage/ProfilePage";
import SignUp from "../signUp/SignUp"
import { AuthProvider } from "../contexts/AuthConext";
import { Login } from "../Login/Login";


     function App() {

          const [userName, setUserName] = useState( localStorage.getItem("userName"));
       
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
                                        element={
                                             <ProfilePage
                                                  setUserName={setUserName}
                                                  userName={userName}
                                             />
                                        }
                                   />
                                   <Route path="/login" element={<Login />} />
                                   <Route path="/signup" element={<SignUp />} />
                              </Routes>
                         </BrowserRouter>
                    </div>
               </div>
          </AuthProvider>
     );
}

export default App;
