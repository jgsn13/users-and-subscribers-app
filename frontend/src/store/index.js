import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"

import persistedReducer from "./slices/persist";

import loggerReducer from "./slices/logger/loggerSlice";

import saga from "./slices/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    logger: persistedReducer(loggerReducer),
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(saga);

export const persistor = persistStore(store);
export default store;
