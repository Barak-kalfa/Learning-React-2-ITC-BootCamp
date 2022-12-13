import Tweet from "../Tweet/Tweet";
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
