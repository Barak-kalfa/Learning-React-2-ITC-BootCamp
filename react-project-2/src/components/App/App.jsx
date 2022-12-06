import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "../NavBar/NavBar";
import {BrowserRouter,  Router, Routes, Route} from "react-router-dom"
import Home from "../Home/Home";
import ProfilePage from "../ProfilePage/ProfilePage";


     function App() {

          const [userName, setUserName] = useState( localStorage.getItem("userName"));
       
     return (
          <div className="App d-flex flex-column">
                     <NavBar />
                     <div className="d-flex justify-content-center">
                     <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home userName={userName} />}  />
            <Route path="/profile"  element={<ProfilePage setUserName={setUserName} userName={userName} />} />
            </Routes>
        </BrowserRouter>
                     </div>
      
          </div>
     );
}

export default App;
