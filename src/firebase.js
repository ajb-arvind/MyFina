// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAwqrvyw9OwqUMm10bivZJsM58IdTUCAR0',
  authDomain: 'my-finance-0.firebaseapp.com',
  projectId: 'my-finance-0',
  storageBucket: 'my-finance-0.appspot.com',
  messagingSenderId: '898681003689',
  appId: '1:898681003689:web:9ed7adbf8a51f1174c13b8',
  measurementId: 'G-ND53PV63BX',
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
