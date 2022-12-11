import { useState, useContext, useEffect } from "react";
import React from "react";
import "./TweetForm.css";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { auth, db } from "../App/firebase-config";
import { useAuth } from "../contexts/AuthConext";



const TweetForm = () => {
     const [content, setContent] = useState();
     const [errorPosting, setErrorPosting] = useState(false);
     const [buttonState, setButtonState] = useState(false);
     const [isActive, setIsActive] = useState(false);
     const tweetsCollectionRef = collection(db, "tweets");
     const {currentUser} = useAuth();
     

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
          const createTweet = async () => {
               const date = new Date();
               await addDoc(tweetsCollectionRef, {
                    content: content,
                    date: date.toISOString(),
                    key: auth.currentUser.uid,
               });
          };

     // Submiting tweet to server
     const handleSubmit = (e) => {
          e.preventDefault();
          createTweet();
       
          //Reseting input text
          if (content) {
               resetForm();
               setErrorPosting(false);
          }
     };

     return (
          <div className="TweetForm">
               <form>
                    <textarea
                         rows={4}
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
                    <div className="d-flex flex-row-reverse justify-content-between">
                         <button
                              disabled={buttonState}
                              onClick={handleSubmit}
                              className="align-self-end"
                         >
                              Tweet
                         </button>
                         {isActive ? (
                              <div id="charsWarning">
                                   The tweet can't contain more then 140 chars.
                              </div>
                         ) : (
                              ""
                         )}
                    </div>
               </form>
          </div>
     );
};

export default TweetForm;
