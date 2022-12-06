import { useState } from "react";
import React from "react";
import axios from "axios";
import "./TweetForm.css";


const TweetForm = ({ setTweet, tweet }) => {

     const tweetsURL =
     "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet";
     const [content, setContent] = useState();
     const [errorPosting, seterrorPosting] = useState(false);
     const [buttonState, setButtonState] = useState(false);
     const [isActive, setIsActive] = useState(false);
     //Reseting Tweet input text
     const resetForm = () => {
          setContent("");
     };

     //Checking for Char limit and Placeholder messege
     const checkButton = (e) => {
          if (e > 138) {
               setIsActive(true);
               setButtonState(true);

          } else {
               setButtonState(false);
               setIsActive(false);
          }
     };

     // Submiting tweet to server
     const handleSubmit = (e) => {
          e.preventDefault();
          setButtonState(true);
          const date = new Date();
          const newTweet = {
               content,
               userName: localStorage.getItem("userName"),
               date: date.toISOString(true),
          };

          try {
               axios.post(tweetsURL, {
                    content,
                    userName: localStorage.getItem("userName"),
                    date: date.toISOString(),
               }).then((response) => {
                    setTweet(response.data);
                    setButtonState(false);
               });
          } catch (e) {
               console.error(e);
          }

          // Posting Error to user on input placeholder
          if (!tweet) {
               seterrorPosting(true);
          }
          //Creating Tweets fetch at Home:
          setTweet(newTweet);

          //Reseting input text
          if (content) {
               resetForm();
               seterrorPosting(false);
          }
     };

     return (
          <div className="TweetForm">
          <div className="p-3">
               <form className="border rounded ">
                    <div className=" d-flex justify-content-start p-3">
                         <textarea 
                              rows={6}
                              maxLength={140}
                              type="text"
                              placeholder={
                                   //Sets state to posting Error/  loading /place holder =>
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
                    <div className="d-flex flex-row-reverse justify-content-between p-3">
                    <button disabled={buttonState} onClick={handleSubmit} className="align-self-end">
                              Tweet
                         </button>
                         {isActive? <div id="charsWarning" >The tweet can't contain more then 140 chars.</div> : ""}
                     
                       
                    </div >
               </form>
          </div>
          </div>
     );
};

export default TweetForm;
