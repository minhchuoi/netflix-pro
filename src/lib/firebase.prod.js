import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import { seedDatabase } from "../seed2";

const firebaseConfig = {
  apiKey: "AIzaSyDLTsH_n-qEaVuwt0mQYBt3Hov7lbM1Rjg",
  authDomain: "netflix-ce999.firebaseapp.com",
  projectId: "netflix-ce999",
  storageBucket: "netflix-ce999.appspot.com",
  messagingSenderId: "306393614554",
  appId: "1:306393614554:web:94b6091fdaca78b048fde3"
};

const firebase = Firebase.initializeApp(firebaseConfig);

// seedDatabase(firebase);

export { firebase };
