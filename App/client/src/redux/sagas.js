import { all } from "redux-saga/effects";
import auth from "./auth/saga";
import question from "./question/saga";
export default function* rootSaga(getState) {
	yield all([
		auth(),
		question(),
	]);
}
