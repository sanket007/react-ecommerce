import { all, call, put, takeLatest } from "redux-saga/effects";
import { UserActionTypes } from "../../redux/user/user.types";
import {
  signInSuccess,
  signInFailure,
  checkUserIsAuthenticated,
  signOutFailure,
  signOutSuccess,
  signUpSuccess,
  signUpFailure
} from "../../redux/user/user.actions";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser
} from "../../firebase/firebase.utils";

import { clearCart } from "../../redux/cart/cart.actions";

export function* setUserFromSnapShot(user, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, user, additionalData);
    const userSnapShot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield put(signInFailure({ error: error }));
  }
}

export function* onSuccessGoogleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield setUserFromSnapShot(user);
  } catch (error) {
    yield put(signInFailure({ error }));
  }
}

export function* onStartGoogleSignIn() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, onSuccessGoogleSignIn);
}

export function* onSuccessUserSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield setUserFromSnapShot(user);
  } catch (error) {
    yield put(signInFailure({ error }));
  }
}

export function* onStartUserSignIn() {
  yield takeLatest(UserActionTypes.USER_SIGN_IN_START, onSuccessUserSignIn);
}

export function* onCheckUserIsAuthenticated() {
  try {
    const authUser = yield getCurrentUser();
    if (!authUser) return;
    else yield setUserFromSnapShot(authUser);
  } catch (error) {
    yield put(checkUserIsAuthenticated());
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
    yield put(clearCart());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* startSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* singInAfterSingUp({ payload: { user, additionalData } }) {
  yield setUserFromSnapShot(user, additionalData);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, singInAfterSingUp);
}

export function* signUp({ payload: { displayName, email, password } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* startSignUp() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* userSagas() {
  yield all([
    call(onStartGoogleSignIn),
    call(onStartUserSignIn),
    call(onCheckUserIsAuthenticated),
    call(startSignOut),
    call(startSignUp),
    call(onSignUpSuccess)
  ]);
}
