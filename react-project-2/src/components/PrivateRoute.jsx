import { useNavigate, Navigate, Route } from "react-router";
import { useAuth } from "./contexts/AuthConext";


export   function PrivateRoute({component: Component, ...rest}) {
     const {currentUser} = useAuth;
     return (
          <Route 
          {...rest}
          render= {props => {
               return currentUser ? <Component {...props} /> : <Navigate to="/login" />
          }} ></Route>
     )
}

