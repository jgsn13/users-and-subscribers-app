import GlobalStyle from "./styles/GlobalStyles";
import Header from "./components/Header";

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import Routing from "./routes";

import history from "./services/history";

function App() {
  return (
    <HistoryRouter history={history}>
      <Header />
      <Routing />
      <GlobalStyle />
    </HistoryRouter>
  );
}

export default App;
