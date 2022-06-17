import GlobalStyle from "./styles/GlobalStyles";
import Header from "./components/Header";

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import Routing from "./routes";
import history from "./services/history";

import store from "./store"
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Header />
        <Routing />
        <GlobalStyle />
        <ToastContainer autoClose={5000} className="toast-container" />
      </HistoryRouter>
    </Provider>
  );
}

export default App;
