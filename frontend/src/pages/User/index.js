import "./styles.css"
import { Container } from "../../styles/GlobalStyles";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

import { FaUserEdit, FaTrash } from "react-icons/fa";
import { UserContainer, PasswordContainer, ButtonDelete, ButtonCancel } from "./styled";
import { useState } from "react";
import { toast } from "react-toastify";
import { get } from "lodash";

import api from "../../services/api";
import history from "../../services/history";
import { useDispatch } from "react-redux";
import { loginFailure } from "../../store/slices/auth/slice"

export default function User() {
  const dispatch = useDispatch()

  const { full_name, email } = useSelector(state => state.auth.user)
  const [deleteAccount, setDeleteAccount] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDeleteAccount = async (_event) => {
    setLoading(true)
    try {
      await api.delete("/user")

      dispatch(loginFailure())
      setLoading(false)
      history.push("/login")
    } catch (error) {
      console.log(error)
      const errors = get(error, 'response.data.errors', [])
      errors.map(err => toast.error(err))
      setLoading(false)
    }
  }

  return (
    <Container style={{ maxWidth: "500px", minWidth: "300px" }}>
      <Loading isLoading={loading} />
      <div className="edit-name">
        <Link to="/user/edit"><FaUserEdit size={20} /></Link>
        <h1>Perfil</h1>
      </div>
      <UserContainer>
        <p>
          <b>Nome: </b>
          <span>{full_name}</span>
        </p>
        <p>
          <b>Email: </b>
          <span>{email}</span>
        </p>
      </UserContainer>
      <ButtonDelete style={{ width: "100%", marginTop: "15px" }} onClick={setDeleteAccount}>
        <FaTrash style={{ marginRight: "10px" }} size={20} />Excluir minha conta
      </ButtonDelete>
      {deleteAccount && <PasswordContainer>
        <div />
        <label>
          <h1 style={{ fontSize: "30px", marginBottom: "10px" }}>Tem certeza?</h1>
          <ButtonDelete onClick={handleDeleteAccount}>Sim</ButtonDelete>
          <ButtonCancel
            onClick={() => { setDeleteAccount(!deleteAccount)}}>Cancelar</ButtonCancel>
        </label>
       </PasswordContainer>}
    </Container>
  );
}

