import { React, useContext, useState, useEffect, createContext } from "react";
import { auth, db } from "../App/firebase-config";
import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
     return useContext(AuthContext);
}

export function AuthProvider({ children }) {
     const [currentUser, setCurrentUser] = useState();
     const [userName, setUserName] = useState();
     const usersCollectionRef = collection(db, "users");
     const [users, setUsers] = useState();
     const [userId, setUserId] = useState();
     const [tweets, setTweets] = useState([]);
     const tweetsCollectionRef = collection(db, "tweets");
     const [tweetsList, setTweetsList] = useState([]);
     const [imageDownloadUrl, setImageDownloadUrl] = useState();

     //Seting current user to last loged in
     useEffect(() => {
          const unsubscribe = auth.onAuthStateChanged((user) => {
               setCurrentUser(user);
          });
          return unsubscribe;
     }, []);

     // geting users collection from firebase database
     const getUsers = async () => {
          const data = await getDocs(usersCollectionRef);
          setUsers(
               data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
               }))
          );
     };

     useEffect(() => {
          getUsers();
     }, []);
// getting tweets collection from firebase
     const getTweets = async () => {
          const data = await getDocs(tweetsCollectionRef);
          const list = data.docs.map((doc) => ({
               ...doc.data(),
               id: doc.id,
          }));
          setTweets(list.sort((a, b) => new Date(b.date) - new Date(a.date)));
     };

     //setting tweets list
     useEffect(() => {
          getTweets();
          setTweetsList(tweets);
     }, []);

     //geting user name from user key
     const getName = () => {
          users &&
               currentUser &&
               users.forEach((user) => {
                    if (user.key === currentUser.uid) {
                         setUserName(user.name);
                         setUserId(user.id);
                    }
               });
     };

     useEffect(() => {
          getName();
     }, [users]);

//updating tweets list live
     useEffect(() => {
          const list = collection(db, "tweets");
          const unsubscribe = onSnapshot(list, (snapshot) => {
               getTweets();
               setTweetsList(tweets);
          });
     }, []);
//updating user name live
     useEffect(() => {
          const list = collection(db, "users");
          const unsubscribe = onSnapshot(list, (snapshot) => {
               getName();
               getUsers();
          });
     }, []);
     
     
//values for provider
     const value = {
          currentUser,
          users,
          userName,
          userId,
          tweets,
          setCurrentUser,
          tweetsList,
          setTweetsList,
          getName,
          setImageDownloadUrl,
          imageDownloadUrl,
     };
     return (
          <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
     );
}
