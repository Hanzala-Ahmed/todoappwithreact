// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqANjVgRTfPPpcN6i7It6PrePlaZKfMhQ",
  authDomain: "routeapphan.firebaseapp.com",
  projectId: "routeapphan",
  storageBucket: "routeapphan.appspot.com",
  messagingSenderId: "608063855517",
  appId: "1:608063855517:web:5af154cccdc03edaafad74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export default db