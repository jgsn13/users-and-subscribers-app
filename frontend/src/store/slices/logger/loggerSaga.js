import { call, put, all, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  clickActionRequest,
  clickActionSuccess,
  clickActionFailure
} from "./loggerSlice";

const request = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 600)
})

function* sampleRequest() {
  try {
    yield call(request)
    yield put(clickActionSuccess())
  } catch {
    yield put(clickActionFailure())
    toast.error("Error")
  }
}

export default all([
  takeLatest("logger/clickActionRequest", sampleRequest)
])
