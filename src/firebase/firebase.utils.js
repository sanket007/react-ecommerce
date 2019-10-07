import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCWRzEstP5lXEIvDBBcS-_rzkNjnGTCkcI",
  authDomain: "react-ecommerce-eff6a.firebaseapp.com",
  databaseURL: "https://react-ecommerce-eff6a.firebaseio.com",
  projectId: "react-ecommerce-eff6a",
  storageBucket: "",
  messagingSenderId: "476940634368",
  appId: "1:476940634368:web:14783f1feda7c87a30cbe5",
  measurementId: "G-1N7TFVPG38"
};

export const createUserProfileDocument = async (userAuth, additinalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additinalData
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
