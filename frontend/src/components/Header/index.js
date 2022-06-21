import { FaHome, FaUserPlus, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Nav, Label, Button } from "./styled";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

import { loginFailure } from "../../store/slices/auth/slice";
import history from "../../services/history";
import api from "../../services/api";

export default function Header() {
  const dispatch = useDispatch()

  const { isLoggedIn, token } = useSelector(state => state.auth)

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${token}`
  })

  useEffect(() => {
    if (!!token) {
      const { exp } = jwtDecode(token)
      const expirationTime = (exp * 1000) - 60000
      if (Date.now() >= expirationTime) {
        dispatch(loginFailure())
        history.push("/login")
        toast.warning("Sua sessão expirou")
      }
    }
  })

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(loginFailure())
    history.push("/")
  }

  return (
    <Nav>
      <Link to="/">
        <FaHome size={22} />
        <Label>Home</Label>
      </Link>
      {!isLoggedIn ? (
        <div className="login-register">
          <FaSignInAlt size={22} />
          <Link style={{ margin: "0 3px" }} to="/user/register">Cadastro</Link>/
          <Link style={{ marginLeft: "3px" }} to="/login">Login</Link>
        </div>)
      : ""}
      {isLoggedIn ? <Link to="/subscriber/register">
        <FaUserPlus size={22} />
        <Label>Adicionar Inscrito</Label>
      </Link> : ""}
      {isLoggedIn ? <Link to="/user">
        <FaUser size={18} />
        <Label>Perfil</Label>
      </Link> : ""}
      {isLoggedIn ? <Button onClick={handleLogout} to="/logout">
        <FaSignOutAlt size={22} />
        <Label>Sair</Label>
      </Button> : ""}
    </Nav>
  );
}
