import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../pages/Login";
import Page404 from "../pages/Page404";

export default function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={
        <PrivateRoute>
          <Login />
        </PrivateRoute>
      } />
      <Route path="*" element={<Page404 />}/>
    </Routes>
  );
}
