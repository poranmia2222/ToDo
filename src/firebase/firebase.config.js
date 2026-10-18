import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBisPyRsmIlIoRI_FbM-GYfsINvOQ_0DBc",
  authDomain: "todoauth-f9e31.firebaseapp.com",
  projectId: "todoauth-f9e31",
  storageBucket: "todoauth-f9e31.firebasestorage.app",
  messagingSenderId: "55666001721",
  appId: "1:55666001721:web:cffbd72357e9a5a04b8ae8",
  measurementId: "G-E6MZFYMP2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)