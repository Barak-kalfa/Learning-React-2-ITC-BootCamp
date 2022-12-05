import React, { useState, useContext } from "react";
import { ListContext } from "../contexts/ListContext";
import Tweet from "../Tweet/Tweet";
import axios from "axios";

function TweetsList({serverList}) {

     return (
          <div>
               {serverList.tweets.map((tweet) => (
                    <Tweet key={Math.random()} tweet={tweet} />
               ))}
          </div>
     );
}

export default TweetsList;
