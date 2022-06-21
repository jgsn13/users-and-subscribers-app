import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"

import persistedReducer from "./slices/persist";

import authSlice from "./slices/auth/slice";

import saga from "./slices/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: persistedReducer(authSlice),
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(saga);

export const persistor = persistStore(store);
export default store;
