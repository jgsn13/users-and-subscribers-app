import { call, put, all, takeLatest } from "redux-saga/effects";
import { get } from "lodash";
import { toast } from "react-toastify";
import {
  loginSuccess,
  loginFailure,
  editUserSuccess,
  editUserFailure,
} from "./slice";
import api from "../../../services/api";
import history from "../../../services/history";

function* authRequest({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, '/authenticate', { email, password })
    yield put(loginSuccess({ ...response.data }))

    api.defaults.headers.Authorization = `Bearer ${response.data.token}`

    toast.success("Você fez login")
    history.push("/")
  } catch {
    toast.error("Email ou senha inválidos")
    yield put(loginFailure())
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, "auth.token", "")
  if (!token) return
  api.defaults.headers.Authorization = `Bearer ${token}`
}

function* editRequest({ payload }) {
  const { full_name, email, password, current_password } = payload;
  const reqBody = {};
  if (!!full_name) reqBody.full_name = full_name;
  if (!!email) reqBody.email = email;
  if (!!password) reqBody.password = password;
  if (!!current_password) reqBody.current_password = current_password;

  try {
    yield call(api.put, "/user", reqBody)
    toast.success("Dados alterados com sucesso")
    if (!!password) delete reqBody.password
    if (!!current_password) delete reqBody.current_password
    yield put(editUserSuccess(reqBody))
  } catch (err) {
    const errors = get(err, "response.data.errors", [])
    if (errors.length > 0) {
      errors.map(error => toast.error(error))
    } else {
      toast.error("Erro desconhecido")
    }
    yield put(editUserFailure())
  }
}

export default all([
  takeLatest("auth/loginRequest", authRequest),
  takeLatest("persist/REHYDRATE", persistRehydrate),
  takeLatest("auth/editUserRequest", editRequest),
])
