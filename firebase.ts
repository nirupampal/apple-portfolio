import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjbzdjoQLSkXEvAV1v9RkjICYafUx26dw",
  authDomain: "my-portfolio-21c3c.firebaseapp.com",
  projectId: "my-portfolio-21c3c",
  storageBucket: "my-portfolio-21c3c.firebasestorage.app",
  messagingSenderId: "769437248126",
  appId: "1:769437248126:web:7a2315bc49c54efd0d862f",
  measurementId: "G-99XRJVY2TM",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export const ADMIN_EMAIL = "nirupampaldev@gmail.com";
export const PORTFOLIO_COLLECTION = "siteContent";
export const PORTFOLIO_DOCUMENT = "portfolio";
