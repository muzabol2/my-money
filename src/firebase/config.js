import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
   apiKey: "AIzaSyBiM8t-sv42ysSHCAVK7yQXQOoFH5L8KDI",
   authDomain: "mymoney-834af.firebaseapp.com",
   projectId: "mymoney-834af",
   storageBucket: "mymoney-834af.appspot.com",
   messagingSenderId: "316496355466",
   appId: "1:316496355466:web:4377d2b880ce0fd795cd73"
 };

 firebase.initializeApp(firebaseConfig);

 const projectFirestore = firebase.firestore();

 export { projectFirestore }
