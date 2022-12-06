import TweetForm from "../TweetForm/TweetForm";
import TweetsList from "../TweetsList/TweetsList";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Home.css";
import { TweetHomeContext } from "../contexts/TweetHomeContext";

const Home = () => {
     const tweetsURL =
          "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet";

     const [serverList, setServerList] = useState(null);

     //Getting tweets from server:
     useEffect(() => {
          
          try {
               axios.get(tweetsURL).then((response) => {
                    setServerList(response.data.tweets);
               });
          } catch (e) {
               console.error(e);
          }
     }, []);

     useEffect(() => {
          setInterval(() => {
               try {
                    axios.get(tweetsURL).then((response) => {
                         setServerList(response.data.tweets);
                    });
               } catch (e) {
                    console.error(e);
               }
          }, 10000);
     }, []);

     if (!serverList) return null;

     return (
          <div className="Home d-flex flex-column justify-content-center">
               <TweetHomeContext.Provider value={{ serverList, setServerList }}>
                    <TweetForm />
                    <TweetsList />
               </TweetHomeContext.Provider>
          </div>
     );
};

export default Home;
