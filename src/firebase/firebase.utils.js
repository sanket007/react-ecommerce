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

export const createCollectionAndDocuments = async (
  collectionKey,
  documents
) => {
  const collectionRef = firestore.collection(collectionKey);
  // const collectionSnapShot = await collectionRef.get();
  const batch = firestore.batch();
  documents.forEach(item => {
    const docRef = collectionRef.doc();
    batch.set(docRef, item);
  });

  return await batch.commit();
};

export const collectionsSnapShotToMap = collections => {
  const transformedCollection = collections.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export default firebase;
