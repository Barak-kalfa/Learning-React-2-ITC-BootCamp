import TweetForm from "../TweetForm/TweetForm";
import TweetsList from "../TweetsList/TweetsList";
import { useAuth } from "../contexts/AuthConext";
import "./Home.css";
import { useEffect } from "react";


const Home = () => {

          const {setTweetsList} = useAuth()
          const { tweets } = useAuth();
        useEffect(() => {
             setTweetsList(tweets);
         
        }, [tweets]);

     return (
          <div className="Home d-flex flex-column justify-content-center">
                    <TweetForm />
                    <TweetsList />
          </div>
     );
};

export default Home;
