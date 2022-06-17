import { configureStore } from "@reduxjs/toolkit";
import loggerReducer from "./loggerSlice";

export default configureStore({
  reducer: {
    logger: loggerReducer
  },
})
