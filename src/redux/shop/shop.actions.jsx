import ShopTypes from "./shop.types";

import {
  firestore,
  collectionsSnapShotToMap
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionMap => ({
  type: ShopTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopTypes.FETCH_COLLECTIONS_FAILURE,
  errorMessage: errorMessage
});

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionsRef = firestore.collection("collections");
    dispatch(fetchCollectionsStart());
    console.log("fetch started");

    collectionsRef
      .get()
      .then(snapShot => {
        const collectionMap = collectionsSnapShotToMap(snapShot.docs);
        dispatch(fetchCollectionsSuccess(collectionMap));
        console.log("success");
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
};
