import { FaHome, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

import { Link } from "react-router-dom";

import { Nav, Label } from "./styled";

export default function Header() {
  return (
    <Nav>
      <Link to="/">
        <FaHome size={22} />
        <Label>Home</Label>
      </Link>
      <Link to="/register">
        <FaUserPlus size={22} />
        <Label>Cadastro</Label>
      </Link>
      <Link to="/logout">
        <FaSignOutAlt size={22} />
        <Label>Sair</Label>
      </Link>
    </Nav>
  );
}
