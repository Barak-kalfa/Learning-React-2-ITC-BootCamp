import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthConext";
import { db } from "../App/firebase-config";
import {  doc, setDoc } from "firebase/firestore";
import {storage} from "../App/firebase-config"
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage"
import {v4} from "uuid"

import "./ProfilePage.css";


function ProfilePage() {

          const {currentUser} = useAuth();
          const {userId } = useAuth();
          const {userName} = useAuth();
          const [updateName, setUpdateName] = useState();
          const[imageUpload, setImageUpload] = useState();
          const [imageDownloadUrl, setImageDownloadUrl] = useState();
          const userImageFolderRef = ref(storage, `/${userId}`);


          const uploadImage = () => {
               if (imageUpload == null) return;
               const imageRef = ref(storage, `${currentUser.uid}/${imageUpload.name + v4()}`);
               uploadBytes(imageRef, imageUpload).then(()=> {
                    alert("Image Uploaded")
               })
          }



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
                    <button onClick={handleProfileName}>Save</button>
                    <div>
                         <input
                              type="file"
                              onChange={(e) => {
                                   setImageUpload(e.target.files[0]);
                              }}
                         />
                         <button onClick={uploadImage}>Upload</button>
                    </div>
                    {<img src={imageDownloadUrl} />}
               </div>
          </div>
     );
}

export default ProfilePage;
