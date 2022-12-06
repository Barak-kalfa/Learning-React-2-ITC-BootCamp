import Tweet from "../Tweet/Tweet";

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
