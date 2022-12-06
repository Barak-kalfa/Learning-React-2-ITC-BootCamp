import { useState } from "react";
import "./ProfilePage.css"

function ProfilePage() {
      const [name, setName] = useState ("Unknown")

      const handleProfileName = () => {
        localStorage.setItem("userName", name);
      }
      
     return (
          <div className="d-flex flex-column ProfilePage">
            <div className="d-flex flex-column align-items-start pt-5 ">
               <h1>Profile</h1>
               <label htmlFor="userName">User Name</label>
               <input
                    type="text"
                    id="profileName"
                    value={name}
                    name="profileName"
                    size={40}
                    placeholder="Enter User Name:"
                    onChange={(e)=>{
                      setName(e.target.value)
                    }}
               />
               </div>
               <button onClick={()=>{handleProfileName(name)}}>Save</button>
          </div>
     );
}

export default ProfilePage;
