import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Subscriber from "../pages/Subscriber";
import Subscribers from "../pages/Subscribers";
import User from "../pages/User";
import EditUser from "../pages/EditUser";
import AddSubscriber from "../pages/AddSubscriber";
import EditSubscriber from "../pages/EditSubscriber";
import Page404 from "../pages/Page404";

export default function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<Subscribers />} />
      <Route
        exact
        path="/subscriber/register"
        element={
          <PrivateRoute>
            <AddSubscriber />
          </PrivateRoute>
        }
       />
      <Route
        exact
        path="/subscriber/edit/:id"
        element={
          <PrivateRoute>
            <EditSubscriber />
          </PrivateRoute>
        }
      />
      <Route exact path="/subscriber/:id" element={<Subscriber />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/user/register" element={<Register />} />
      <Route
        exact
        path="/user"
        element={
          <PrivateRoute>
            <User />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/user/edit"
        element={
          <PrivateRoute>
            <EditUser />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
