import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
   apiKey: "AIzaSyBiM8t-sv42ysSHCAVK7yQXQOoFH5L8KDI",
   authDomain: "mymoney-834af.firebaseapp.com",
   projectId: "mymoney-834af",
   storageBucket: "mymoney-834af.appspot.com",
   messagingSenderId: "316496355466",
   appId: "1:316496355466:web:4377d2b880ce0fd795cd73"
};

// Init firebase
const app = initializeApp(firebaseConfig);

// Init services
const db = getFirestore(app);
const auth = getAuth();

export { db, auth }
