import {React, useContext, useState, useEffect, createContext } from "react";
import { auth } from "../App/firebase-config";
// import "../App/firebase-config/auth"


 const AuthContext = createContext();


export function useAuth() {
     return useContext(AuthContext)
}

export function AuthProvider({children}) {
     const [currentUser, setCurrentUser] = useState ();

     function signup(email, passowrd) {
          console.log(email, passowrd)
          return auth.createUserWithEmailAndPassword(email, passowrd)
     }
     useEffect(() => {
              const unsubscribe =  auth.onAuthStateChanged((user) => {
                   setCurrentUser(user);
              });
              return unsubscribe
     }, [])
     
     const value = {
          currentUser,
          signup,
     }
     return (
          <AuthContext.Provider value={value }>
               {children}
          </AuthContext.Provider>
     );
}

