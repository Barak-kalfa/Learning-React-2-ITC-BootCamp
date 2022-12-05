import { useState } from "react";

import React from "react";
import axios from "axios";
import "./TweetForm.css";

const tweetsURL =
     "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet";
const TweetForm = ({ setTweet, tweet }) => {
     const [content, setContent] = useState();
     const [userName, setUserName] = useState("");
     const [errorPosting, seterrorPosting] = useState(false);
     const [buttonState, setButtonState] = useState(false);

     //Reseting Tweet input text
     const resetForm = () => {
          setContent("");
     };

     //Checking for Char limit and Placeholder messege
     const checkButton = (e) => {
          if (e > 138) {
               setButtonState(true);
               alert("Can't post more then 140 characters")
          } else {
               setButtonState(false);
          }
     };

     // Submiting tweet to server
     const handleSubmit = (e) => {
          e.preventDefault();
          setButtonState(true);
          const date = new Date();
          const newTweet = {
               content,
               userName: "user",
               date: date.toISOString(true),
          };
          setTweet(newTweet);
          try {
               axios.post(tweetsURL, {
                    content,
                    userName: "user",
                    date: date.toISOString(),
               }).then((response) => {
                    setTweet(response.data);
                    setButtonState(false);
               });
          }  catch(e) {
               console.error(e)}
          
// Posting Error to user on input placeholder
          if (!tweet) {
               seterrorPosting(true);
          }

          //Reseting input text
          if (content) {
               resetForm();
               seterrorPosting(false);
          }
     };

     return (
          <div className="tweetForm p-3">
               <form className="border rounded d-flex flex-column">
                    <div className="d-flex justify-content-start p-3">
                         <textarea
                              maxLength={140}
                              type="text"
                              placeholder={
                                   errorPosting
                                        ? "ERROR: There was a problem with your Post. Please try again :)"
                                        : buttonState
                                        ? "Loading..."
                                        : "What you have in mind..."
                              }
                              value={content}
                              onChange={(e) => {
                                   checkButton(e.target.textContent.length);
                                   setContent(e.target.value);
                              }}
                         ></textarea>
                    </div>
                    <div className="d-flex justify-content-end p-3">
                         <button disabled={buttonState} onClick={handleSubmit}>
                              Tweet
                         </button>
                    </div>
               </form>
          </div>
     );
};

export default TweetForm;
