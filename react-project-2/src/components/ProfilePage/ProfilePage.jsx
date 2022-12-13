import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthConext";
import { db } from "../App/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { storage } from "../App/firebase-config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import "./ProfilePage.css";

function ProfilePage() {


     const { currentUser } = useAuth();
     const { userId } = useAuth();
     const { userName } = useAuth();
     const [updateName, setUpdateName] = useState();
     const [imageUpload, setImageUpload] = useState();
     const {imageDownloadUrl} = useAuth();
     const {setImageDownloadUrl} = useAuth()
     const userImageFolderRef = ref(storage, `/${userId}`);
     const { getName } = useAuth();
     
     //oplading user profile image
     const uploadImage = () => {
          if (imageUpload == null) return;
          const imageRef = ref(
               storage,
               `${currentUser.uid}/${imageUpload.name + v4()}`
          );
          uploadBytes(imageRef, imageUpload).then(() => {
               alert("Image Uploaded");
          });
     };
     const imageListRef = ref(storage, `${currentUser.uid}/`);
     useEffect(() => {
          listAll(imageListRef).then((response) => {
               response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                         setImageDownloadUrl(url);
                    });
               });
          });
          getName()
     }, []);
     
//changing user name in firebase users collection
     function handleProfileName() {
          const docRef = doc(db, "users", userId);
          const name = {
               name: updateName,
          };
          setDoc(docRef, name, { merge: true });
     }

     return (
          <div className="d-flex flex-column ProfilePage">
               <div className=" w-100 d-flex flex-column align-items-start pt-5 ">
                    <div className="w-100 d-flex flex-row gap-5 mb-4">
                         <div>
                              <h1>Profile:</h1>
                              {userName && <h2 id="name">{userName}</h2>}
                         </div>
                         {imageDownloadUrl && <img src={imageDownloadUrl} />}
                    </div>

                    <label id="profile" htmlFor="userName">
                         User Name:
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
                         <label id="profile" htmlFor="profileImg">
                              Upload Profile Picture:
                         </label>
                         <input
                              className="pt-2"
                              id="profileImg"
                              type="file"
                              onChange={(e) => {
                                   setImageUpload(e.target.files[0]);
                              }}
                         />
                         <button onClick={uploadImage}>Upload</button>
                    </div>
               </div>
          </div>
     );
}

export default ProfilePage;
