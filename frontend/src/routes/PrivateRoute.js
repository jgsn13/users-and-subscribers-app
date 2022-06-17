import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isLoggedIn = true;

  return isLoggedIn ? children : <Navigate to={{ pathname: "/login" }} />;
}
