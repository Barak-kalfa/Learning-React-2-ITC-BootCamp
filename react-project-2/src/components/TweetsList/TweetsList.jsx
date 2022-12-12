import Tweet from "../Tweet/Tweet";

import { useContext, useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../App/firebase-config";
import { useAuth } from "../contexts/AuthConext";


function TweetsList() {
          const {tweetsList} = useAuth();

     return (
          <div>
               {tweetsList.map((tweet) => (
                    <Tweet key={Math.random()} tweet={tweet} />
               ))}
          </div>
     );
}

export default TweetsList;
