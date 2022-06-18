import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"

import loggerReducer from "./slices/logger/loggerSlice";

import saga from "./slices/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    logger: loggerReducer
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(saga);

export default store;
