import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
     apiKey: "AIzaSyBX25EkaId9bQN-JFBiEY4A4djcKnhmBJU",
     authDomain: "react-project-microblogging-bk.firebaseapp.com",
     projectId: "react-project-microblogging-bk",
     storageBucket: "react-project-microblogging-bk.appspot.com",
     messagingSenderId: "797326551137",
     appId: "1:797326551137:web:197a154c247c2a9c376220",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)