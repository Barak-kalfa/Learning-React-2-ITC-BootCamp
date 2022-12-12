import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthConext";
import {auth} from "./App/firebase-config"


export  function PrivateRoute({ redirectPath = "/login", children }) {
     const {currentUser} = useAuth()

     if (!currentUser) {
    
          return <Navigate to={redirectPath} replace />;
     }

     return children;
}
