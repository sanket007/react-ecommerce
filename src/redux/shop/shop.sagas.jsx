import { takeEvery, call, put } from "redux-saga/effects";
import ShopTypes from "./shop.types";
import {
  firestore,
  collectionsSnapShotToMap
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from "../../redux/shop/shop.actions";

export function* fetchCollectionsAsync() {
  try {
    const collectionsRef = firestore.collection("collections");
    const snapShot = yield collectionsRef.get();
    const collectionMap = yield call(collectionsSnapShotToMap, snapShot.docs);
    yield put(fetchCollectionsSuccess(collectionMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeEvery(ShopTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
