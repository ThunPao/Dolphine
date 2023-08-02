// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
async function signInAndAccessDatabase() {
  try {
    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, 'kpza1360@gmail.com', 'dgSDAHIO1aefww684');

    // User signed in successfully
    const user = userCredential.user;
    // console.log('User signed in:', user);

    // Access the Realtime Database


    // const dataRef = ref(database, 'data'); // Replace 'data' with your desired path
    // const newData = {
    //   title: 'Sample Title',
    //   content: 'Sample Content',
    // };
    // await set(dataRef, newData);



    // console.log('Data added to the database');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the function to sign in and access the database
signInAndAccessDatabase();