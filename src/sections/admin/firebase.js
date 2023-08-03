// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { getAuth, signInWithEmailAndPassword,onAuthStateChanged  } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEmN8-Zn_QBtd34zLWNT2fQsZPsc3etZA",
  authDomain: "dolphinert-2a978.firebaseapp.com",
  databaseURL: "https://dolphinert-2a978-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dolphinert-2a978",
  storageBucket: "dolphinert-2a978.appspot.com",
  messagingSenderId: "137316863630",
  appId: "1:137316863630:web:8389c8a5633137e62e83df",
  measurementId: "G-D90Z9W81DD"
};
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);


const auth = getAuth(app);
// Example function to sign in and access the database

// Check if a user is already signed in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // console.log('User is already signed in:', user);
    // You can redirect to a protected route or perform any necessary actions here
  } else {
    signInAndAccessDatabase
    // console.log('No user is signed in');
  }
});


async function signInAndAccessDatabase() {
  try {


      // If not signed in, perform sign-in
      const userCredential = await signInWithEmailAndPassword(auth, 'user@example.com', '123456');
      user = userCredential.user;
      console.log('User successfully logged in:', user);


    // You can redirect to a protected route or perform any necessary actions here

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the function to sign in and access the database
// signInAndAccessDatabase();