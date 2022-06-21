import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export default (reducers) => {
  const persistConfig = {
    key: 'users_and_subscribers',
    storage,
    whiteList: ["auth"]
  }

  const persistedReducer = persistReducer(persistConfig, reducers)

  return persistedReducer;
}
