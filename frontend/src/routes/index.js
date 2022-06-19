import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Subscriber from "../pages/Subscriber";
import Subscribers from "../pages/Subscribers";
import User from "../pages/User";
import Page404 from "../pages/Page404";

export default function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<Subscribers />} />
      <Route exact path="/subscriber/:id" element={<Subscriber />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route
        exact
        path="/user"
        element={
          <PrivateRoute>
            <User />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
