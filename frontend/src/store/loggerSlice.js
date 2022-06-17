import { createSlice } from "@reduxjs/toolkit";

const loggerSlice = createSlice({
  name: 'logger',
  initialState: {
    buttonClicked: false,
  },
  reducers: {
    clickAction: (state) => {
      state.buttonClicked = !state.buttonClicked;
    }
  }
})

export const { clickAction } = loggerSlice.actions;

export default loggerSlice.reducer;
