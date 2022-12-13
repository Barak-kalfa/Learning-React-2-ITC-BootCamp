import "./App.css";
import NavBar from "../NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
