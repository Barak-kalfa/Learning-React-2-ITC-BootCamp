import { useState } from "react";
import { useAuth } from "../contexts/AuthConext";
import { db } from "../App/firebase-config";
import {  doc, setDoc } from "firebase/firestore";

import "./ProfilePage.css";

function ProfilePage() {
          const {userId } = useAuth();
          const {userName} = useAuth();
          const [updateName, setUpdateName] = useState();

          function handleProfileName () {
               const docRef = doc(
                    db,
                    "users",
                    userId
               );
               const name = {
                    name: updateName
               }
               setDoc(docRef, name, { merge: true });
          }
               
     return (
          <div className="d-flex flex-column ProfilePage">
               <div className="d-flex flex-column align-items-start pt-5 ">
                    <h1>Profile</h1>
                    <label id="profile" htmlFor="userName">
                         User Name: {userName && userName}
                    </label>
                    <input
                         type="text"
                         id="profileName"
                         name="profileName"
                         size={40}
                         placeholder="Enter User Name:"
                         onChange={(e) => {
                              setUpdateName(e.target.value);
                         }}
                    />
               </div>
               <button
                    onClick={handleProfileName}
               >
                    Save
               </button>
          </div>
     );
}

export default ProfilePage;
