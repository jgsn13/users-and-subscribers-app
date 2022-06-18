import { all } from "redux-saga/effects";

import sample from "./logger/loggerSaga";

export default function* saga() {
  return yield all([sample])
}
