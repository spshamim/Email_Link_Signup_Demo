import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFa-UBHVZVBpqQmeD3LwdJmhXopbVNz5E",
  authDomain: "email-link-signin-65a2c.firebaseapp.com",
  projectId: "email-link-signin-65a2c",
  storageBucket: "email-link-signin-65a2c.appspot.com",
  messagingSenderId: "625500573517",
  appId: "1:625500573517:web:a70063e081b5ba8b81f104"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};