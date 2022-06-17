import GlobalStyle from "./styles/GlobalStyles";
import Header from "./components/Header";

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import Routing from "./routes";
import history from "./services/history";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <HistoryRouter history={history}>
      <Header />
      <Routing />
      <GlobalStyle />
      <ToastContainer autoClose={5000} className="toast-container" />
    </HistoryRouter>
  );
}

export default App;
