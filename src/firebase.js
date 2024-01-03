// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAPI0GWbzJWQC--vFHlZqdOfoopAzoYh3E',
  authDomain: 'personalfinance-c69bb.firebaseapp.com',
  projectId: 'personalfinance-c69bb',
  storageBucket: 'personalfinance-c69bb.appspot.com',
  messagingSenderId: '534594772081',
  appId: '1:534594772081:web:0f96738a835ecc30004fd0',
  measurementId: 'G-MYY9RVB4NE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export let userDetails;

onAuthStateChanged(auth, (user) => {
  if (user) {
    userDetails = user;
  }
});

// Initialize Cloud Firestore and get a reference to the service
// export const db = getFirestore(app);

// Defaults to single-tab persistence if no tab manager is specified.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(/*settings*/ {}),
});
