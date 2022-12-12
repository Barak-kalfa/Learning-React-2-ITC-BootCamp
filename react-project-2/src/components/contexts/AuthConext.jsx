import {React, useContext, useState, useEffect, createContext } from "react";
import { auth, db } from "../App/firebase-config";
import {
     collection,
     getDocs,
     onSnapshot,
     doc,
} from "firebase/firestore";


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
     const [tweets, setTweets] = useState([]);
     const tweetsCollectionRef = collection(db, "tweets");
     const [tweetsList, setTweetsList] = useState([])


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

                                const getTweets = async () => {
                                     const data = await getDocs(
                                          tweetsCollectionRef
                                     );
                                     const list = data.docs.map((doc) => ({
                                          ...doc.data(),
                                          id: doc.id,
                                     }));
                                     console.log(list);
                                     setTweets(
                                          list.sort(
                                               (a, b) =>
                                                    new Date(b.date) -
                                                    new Date(a.date)
                                          )
                                     );
                                };
     
                 useEffect(() => {
                      getTweets();
                      setTweetsList(tweets);
                 }, []);

              useEffect(() => {
                   const getName = () => {
                        users &&
                              currentUser &&
                             users.forEach((user) => {
                                  if (user.key === currentUser.uid) {
                                       setUserName(user.name)
                                       setUserId(user.id)
                                  }
                             });
                   };
                   getName();
              }, [users]);


              
     useEffect(() => {
               const list = collection(db, "tweets")
              const unsubscribe = onSnapshot(list, (snapshot) => {
                       getTweets();
                       setTweetsList(tweets);
              })
              }, []);
     

     const value = {
          currentUser,
          users,
          userName,
          userId,
          tweets,
          setCurrentUser,
          tweetsList,
          setTweetsList,
     };
     return (
          <AuthContext.Provider value={value }>
               {children}
          </AuthContext.Provider>
     );
}

