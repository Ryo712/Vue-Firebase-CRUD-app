// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyBkn0Bcr6CWmpCxMqP8EuGhWn6xCHTqHIw",
authDomain: "[vue-firebase-app-61bba.firebaseapp.com](http://vue-firebase-app-61bba.firebaseapp.com/)",
projectId: "vue-firebase-app-61bba",
storageBucket: "[vue-firebase-app-61bba.appspot.com](http://vue-firebase-app-61bba.appspot.com/)",
messagingSenderId: "81307523769",
appId: "1:81307523769:web:777e11242242a349919968",
measurementId: "G-PJEJRPV0RE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Authentication
const auth = getAuth()

export default { analytics, db, auth };