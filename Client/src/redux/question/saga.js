import { all, call, takeEvery, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import actions from "./actions";
import { axiosPost, axiosGet, axiosPut } from "../axiosHelper";

export function* getQuestions({ payload }) {
  try {
    const { data } = yield call(axiosGet, "api/question/get");
    yield put(actions.getQuestionsSuccess(data.data));
  } catch (error) {
    yield put(actions.getQuestionsFailure(error.message));
  }
}

export function* getQuestionsById({ payload }) {
  try {
    const { data } = yield call(
      axiosGet,
      "api/question/getQuestion/" + payload
    );
    yield put(actions.getQuestionByIdSuccess(data.data));
  } catch (error) {
    yield put(actions.getQuestionByIdFailure(error.message));
  }
}

export function* addQuestion({ payload }) {
  try {
    const { data } = yield call(axiosPost, payload, "api/question/create");
    yield put(actions.addQuestionSuccess(data.data));
  } catch (error) {
    yield put(actions.addQuestionFailure(error.message));
  }
}

export function* updateQuestionById({ payload }) {
  try {
    console.log('payload ----->', payload)
    const { data } = yield call(axiosPut, payload, "api/question/update");
    yield put(actions.updateQuestionByIdSuccess(data.data));
  } catch (error) {
    yield put(actions.updateQuestionByIdFailure(error.message));
  }
}

export function* addQuestionSuccess({ payload }) {
  yield put(push("/admin"));
}

export function* updateQuestionSuccess({ payload }) {
  yield put(push("/admin"));
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_QUESTIONS, getQuestions),
    takeEvery(actions.GET_QUESTION_BYID, getQuestionsById),
    takeEvery(actions.Add_QUESTION, addQuestion),
    takeEvery(actions.Add_QUESTION_SUCCESS, addQuestionSuccess),
    takeEvery(actions.UPDATE_QUESTION, updateQuestionById),
    takeEvery(actions.UPDATE_QUESTION_SUCCESS, updateQuestionSuccess),
  ]);
}
