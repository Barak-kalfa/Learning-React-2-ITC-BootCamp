import { useAuth } from "../contexts/AuthConext";
import "./ProfilePage.css";

function ProfilePage(props) {
          const { currentUser } = useAuth();

     return (
          <div className="d-flex flex-column ProfilePage">
               <div className="d-flex flex-column align-items-start pt-5 ">
                    <h1>Profile</h1>
                    <label id="profile" htmlFor="userName">
                         User Name: {currentUser&& currentUser.email}
                    </label>
                    <input
                         type="text"
                         id="profileName"
                         value={props.userName ? props.userName : ""}
                         name="profileName"
                         size={40}
                         placeholder="Enter User Name:"
                         onChange={(e) => {
                              // props.setUserName(e.target.value);
                         }}
                    />
               </div>
               <button
                    onClick={() => {
                         // handleProfileName(props.userName);
                    }}
               >
                    Save
               </button>
          </div>
     );
}

export default ProfilePage;
