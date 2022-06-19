import { FaHome, FaUserPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

import { Link } from "react-router-dom";

import { Nav, Label } from "./styled";

export default function Header() {
  const isLoggedIn = true;

  return (
    <Nav>
      <Link to="/">
        <FaHome size={22} />
        <Label>Home</Label>
      </Link>
      {isLoggedIn ? <Link to="/register">
        <FaUserPlus size={22} />
        <Label>Cadastro</Label>
      </Link> : ""}
      {!isLoggedIn ? <Link to="/login">
        <FaSignInAlt size={22} />
        <Label>Login</Label>
      </Link> : ""}
      {isLoggedIn ? <Link to="/logout">
        <FaSignOutAlt size={22} />
        <Label>Sair</Label>
      </Link> : ""}
    </Nav>
  );
}
