import TweetForm from "../TweetForm/TweetForm";
import TweetsList from "../TweetsList/TweetsList";

import "./Home.css";


const Home = () => {

     return (
          <div className="Home d-flex flex-column justify-content-center">
                    <TweetForm />
                    <TweetsList />
          </div>
     );
};

export default Home;
