import TweetForm from "../TweetForm/TweetForm";
import TweetsList from "../TweetsList/TweetsList";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const tweetsURL =
     "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet";

     function App() {
     const [tweet, setTweet] = useState(null);
     const [serverList, setServerList] = React.useState(null);

//Getting tweets from server:
     React.useEffect(() => {
          try {
               axios.get(tweetsURL).then((response) => {
                    setServerList(response.data);
               });
          }
       catch(e) {
          console.error(e)}
     }, [tweet]);
     if (!serverList) return null;

     return (
          <div className="App d-flex flex-column justify-conten-center">
               <TweetForm tweet={tweet} setTweet={setTweet} />
               <TweetsList serverList={serverList} />
          </div>
     );
}

export default App;
