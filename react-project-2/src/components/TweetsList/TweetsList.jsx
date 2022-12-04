import React, { useState, useContext } from "react";
import { ListContext } from "../contexts/ListContext";
import Tweet from "../Tweet/Tweet";

function TweetsList({ list }) {
     // const list = useContext(ListContext)

     return (
          <div>
               {list.map((tweet) => (
                    <Tweet key={Math.random()} tweet={tweet} />
               ))}
          </div>
     );
}

export default TweetsList;
