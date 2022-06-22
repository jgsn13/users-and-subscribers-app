import { createSlice } from "@reduxjs/toolkit";

import history from "../../../services/history";

const initialState = {
  isLoggedIn: false,
  token: "",
  user: {},
  isLoading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, _action) => {
      state.isLoading = true
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token
      state.user = action.payload.user
      state.isLoading = false;
      history.push("/")
    },
    loginFailure: (state, _action) => {
      state.isLoggedIn = initialState.isLoggedIn
      state.token = initialState.token
      state.user = initialState.user
      state.isLoading = initialState.isLoading
    },
    editUserRequest: (state, _action) => {
      state.isLoading = true
    },
    editUserSuccess: (state, action) => {
      const { full_name, email } = action.payload
      if (!!full_name) state.user.full_name = full_name
      if (!!email) state.user.email = email
      state.isLoading = false
    },
    editUserFailure: (state, _action) => {
      state.isLoading = false
    }
  }
})

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
} = authSlice.actions;

export default authSlice.reducer;
