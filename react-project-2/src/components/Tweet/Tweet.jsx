import { useAuth } from "../contexts/AuthConext";
import { useEffect, useState } from "react";
import "./Tweet.css";


function Tweet({ tweet }) {

    const [name, setName] = useState();
    const {users} = useAuth()

       useEffect(() => {
            const getName = () => {
                 users &&
                      users.forEach((user) => {
                           if (user.key === tweet.key) {
                                setName(user.name);
                           }
                      });
            };
            getName();
       }, []);

     return (
          <div className=" Tweet rounded d-flex flex-column bg-dark">
               <div className="tweetHeader d-flex justify-content-between">
                    <span>{name}</span>
                    <span>{tweet.date}</span>
               </div>
               <div className="tweetContent d-flex pe-5 me-5 text-break">
                    {tweet.content}
               </div>
          </div>
     );
}

export default Tweet;
