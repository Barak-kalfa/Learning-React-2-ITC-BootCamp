import TweetForm from "../TweetForm/TweetForm"
import TweetsList from "../TweetsList/TweetsList"
import axios from "axios";
import React, { useState, useEffect } from "react";

const Home = () => {
const tweetsURL =
"https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet";

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
     <div className="d-flex flex-column justify-content-center">
     <TweetForm tweet={tweet} setTweet={setTweet} />
     <TweetsList serverList={serverList} />
     </div>

  )
}

export default Home