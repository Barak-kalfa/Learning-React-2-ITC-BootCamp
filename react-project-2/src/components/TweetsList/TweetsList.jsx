import Tweet from "../Tweet/Tweet";
import { TweetHomeContext } from "../contexts/TweetHomeContext";
import { useContext, useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../App/firebase-config";


function TweetsList() {
          const [tweets, setTweets] = useState([]);
          const tweetsCollectionRef = collection(db, "tweets");
          console.log(tweets)
          
          useEffect(() => {
               const getTweets = async () => {
                    const data = await getDocs(tweetsCollectionRef);
                    setTweets(
                         data.docs.map((doc) => ({
                              ...doc.data(),
                              id: doc.id,
                         })).reverse()
                    );
               };
               getTweets();
          }, []);
     return (
          <div>
               {tweets.map((tweet) => (
                    <Tweet key={Math.random()} tweet={tweet} />
               ))}
          </div>
     );
}

export default TweetsList;
