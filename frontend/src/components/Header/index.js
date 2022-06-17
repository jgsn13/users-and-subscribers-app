import { FaHome, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { Nav, Label } from "./styled";

export default function Header() {
  const buttonClicked = useSelector(state => state.logger.buttonClicked)

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
      <h1 style={{ color: "#fff" }}>{buttonClicked ? "Clicked" : "Not clicked"}</h1>
    </Nav>
  );
}
