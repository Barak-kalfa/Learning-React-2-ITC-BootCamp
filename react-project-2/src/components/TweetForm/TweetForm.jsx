import { useState } from "react";
import Moment from 'moment';

import "./TweetForm.css"



const TweetForm = ({ addTweet }) => {
     const [content, setContent] = useState();
     const [userName, setUserName] = useState("");
     const [date, setDate] = useState("");
     const[buttonState, setButtonState] = useState (false)


     const resetForm = () => {
          setContent("");


     };

     const checkButton=(e) =>{
          if (e > 138) {
               setButtonState(true)
          } else {
               setButtonState(false)
          }
     }

     const handleSubmit = (e) => {
          e.preventDefault();
          const date = Moment().format() 
          console.log(date)

          
          const tweet = {
               content,
               userName: "user",
               date: date.toString()
          };

          if (content) {
               addTweet(tweet);
               resetForm();
          }
     };

     return (
          <div className="tweetForm p-3">
               <form className="border rounded d-flex flex-column">
                    <div className="d-flex justify-content-start p-3">
                         <textarea
                         maxLength={140}
                              type="text"
                              placeholder="What you have in mind..."
                              value={content}
                              onChange={(e) => {
                                   checkButton(e.target.textContent.length)
                                   setContent(e.target.value)}
                              }
                         ></textarea>
                    </div>
                    <div className="d-flex justify-content-end p-3">
                         <button disabled={buttonState} onClick={handleSubmit}>Tweet</button>
                         </div>
               
               </form>
          </div>
     );
};

export default TweetForm;
