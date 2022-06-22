import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistFunction = (reducers) => {
  const persistConfig = {
    key: 'users_and_subscribers',
    storage,
    whiteList: ["auth"]
  }

  const persistedReducer = persistReducer(persistConfig, reducers)

  return persistedReducer;
}

export default persistFunction;
