import TweetForm from "../TweetForm/TweetForm";
import TweetsList from "../TweetsList/TweetsList";
import React, { useState, useEffect } from "react";
import "./App.css";

// import {ListContext} from "../contexts/ListContext"

function App() {
     const [tweetsList, setTweetsList] = useState([]);

    if (tweetsList.length>0) {
      localStorage.setItem('tweetsList', JSON.stringify(tweetsList))
 
    }
     
     useEffect(() => {
      const tweetsList = JSON.parse(localStorage.getItem('tweetsList'));
      if (tweetsList) {
        setTweetsList(tweetsList);
      }
    }, []);
    

     const addTweet = (tweet) => {
      console.log(tweet)
          setTweetsList((prevTweet) => [tweet, ...prevTweet]);
    
          
          
     };

     return (
          <div className="App d-flex flex-column justify-conten-center">
               {/* <ListContext.Provider value={tweetsList}> */}
               <TweetForm addTweet={addTweet} />
               <TweetsList list={tweetsList} />
               {/* </ListContext.Provider> */}
          </div>
     );
}

export default App;
