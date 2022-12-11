import TweetForm from "../TweetForm/TweetForm";
import TweetsList from "../TweetsList/TweetsList";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Home.css";
import { TweetHomeContext } from "../contexts/TweetHomeContext";
import { useNavigate } from "react-router";
import { auth } from "../App/firebase-config";
import { useAuth } from "../contexts/AuthConext";

const Home = () => {
     const {currentUser} = useAuth;

     const [serverList, setServerList] = useState(null);

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
