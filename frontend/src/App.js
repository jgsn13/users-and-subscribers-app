import GlobalStyle from "./styles/GlobalStyles";
import Header from "./components/Header";

import { BrowserRouter } from "react-router-dom";
import Routing from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routing />
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
