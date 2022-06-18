import { createSlice } from "@reduxjs/toolkit";

const loggerSlice = createSlice({
  name: 'logger',
  initialState: {
    buttonClicked: false,
  },
  reducers: {
    clickActionRequest: (state, action) => {
      console.log("Requesting to the server...");
    },
    clickActionSuccess: (state, action) => {
      console.log("Success!")
      state.buttonClicked = !state.buttonClicked;
    },
    clickActionFailure: (state, action) => {
      console.log("Error =(");
    }
  }
})

export const {
  clickActionRequest,
  clickActionSuccess,
  clickActionFailure,
} = loggerSlice.actions;

export default loggerSlice.reducer;
