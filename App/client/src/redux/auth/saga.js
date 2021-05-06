import { all, call, takeEvery, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import { getToken, clearToken } from "helpers/utility";
import actions from "./actions";
import { axiosPost, axiosGet, axiosPut } from "../axiosHelper";

export function* loginRequest({ payload }) {
  try {
    const {data} = yield call(axiosPost, payload, "api/auth/signin")
    const {auth_token, ...user} = data.data
    yield put(actions.loginSuccess(user, auth_token));
  } catch (error) {
    yield put(actions.loginFailure(error.message, error.data || {}));
  }
}

export function* registerRequest({ payload }) {
  try {
    const {data} = yield call(axiosPost, payload, "api/auth/signup")
    yield put(actions.registerSuccess(data.data));
  } catch (error) {
    yield put(actions.registerFailure(error.message, error.data || {}));
  }
}

export function* logout() {
  try {
    yield put(actions.logoutSuccess());
  } catch (error) {
    yield put(actions.logoutError());
  }
}

export function* loginSuccess({ payload, token }) {
  yield localStorage.setItem("auth_token", token);
  yield put(push("/admin"));
}

export function* registerSuccess() {
  yield put(push("/signin"));
}

export function* logoutSuccess() {
  yield clearToken(); 
}

export function* checkAuthorization() {
  const token = getToken().get("authToken");
  if (token) {
    yield put(actions.loginSuccess({}, token));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.CHECK_AUTHORIZATION, checkAuthorization),
    takeEvery(actions.LOGIN_REQUEST, loginRequest),
    takeEvery(actions.LOGIN_SUCCESS, loginSuccess),
    takeEvery(actions.REGISTER_REQUEST, registerRequest),
    takeEvery(actions.REGISTER_SUCCESS, registerSuccess),
    takeEvery(actions.LOGOUT, logout),
    takeEvery(actions.LOGOUT_SUCCESS, logoutSuccess),
  ]);
}
