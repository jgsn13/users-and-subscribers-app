import { FaHome, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

import { Nav } from "./styled";

export default function Header() {
  return (
    <Nav>
      <a href="#"><FaHome size={22} />Home</a>
      <a href="#"><FaUserPlus size={22} />Cadastro</a>
      <a href="#"><FaSignOutAlt size={22} />Sair</a>
    </Nav>
  );
}
