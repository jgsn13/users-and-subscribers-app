import GlobalStyle from "./styles/GlobalStyles";
import Header from "./components/Header";

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import Routing from "./routes";
import history from "./services/history";

import store, { persistor } from "./store"
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <HistoryRouter history={history}>
          <Header />
          <Routing />
          <GlobalStyle />
          <ToastContainer autoClose={5000} className="toast-container" />
        </HistoryRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
