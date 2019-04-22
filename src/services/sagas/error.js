import { put } from "redux-saga/effects";
import { logoutAction } from "../actions/auth";
import { handleErrorAction } from "../actions/app";

export function* handleFetchError(action) {
  switch (action.payload.status) {
    case 401:
      yield put(logoutAction(true));
      break;
    default:
      yield put(handleErrorAction(true));
      break;
  }
}
