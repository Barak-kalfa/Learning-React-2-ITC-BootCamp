import Tweet from "../Tweet/Tweet";
import { TweetHomeContext } from "../contexts/TweetHomeContext";
import { useContext } from "react";

function TweetsList() {

          const {serverList} = useContext(TweetHomeContext);
     return (
          <div>
               {serverList.map((tweet) => (
                    <Tweet key={Math.random()} tweet={tweet} />
               ))}
          </div>
     );
}

export default TweetsList;
