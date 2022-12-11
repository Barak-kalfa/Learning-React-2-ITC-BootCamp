import {React, useContext, useState, useEffect, createContext } from "react";
import { auth, db } from "../App/firebase-config";
import { collection, getDocs } from "firebase/firestore";

 const AuthContext = createContext();

export function useAuth() {
     return useContext(AuthContext)
}

export function AuthProvider({children}) {
     const [currentUser, setCurrentUser] = useState ();
      const [userName, setUserName] = useState();
     const usersCollectionRef = collection(db, "users");
     const [users, setUsers] = useState();
     const[userId, setUserId] = useState()

     useEffect(() => {
              const unsubscribe =  auth.onAuthStateChanged((user) => {
                   setCurrentUser(user);
              });
              return unsubscribe
     }, [])

       useEffect(() => {
            const getUsers = async () => {
                 const data = await getDocs(usersCollectionRef);
                 setUsers(
                      data.docs.map((doc) => ({
                           ...doc.data(),
                           id: doc.id,
                      }))
                 );
            };
            getUsers();
       }, []);

              useEffect(() => {
                   const getName = () => {
                        users &&
                      
                             users.forEach((user) => {
                                  if (user.key === currentUser.uid) {
                                       setUserName(user.name)
                                       setUserId(user.id)
                                  }
                             });
                   };
                   getName();
              }, [users]);


     const value = {
          currentUser,
          users,
          userName,
          userId
     };
     return (
          <AuthContext.Provider value={value }>
               {children}
          </AuthContext.Provider>
     );
}

