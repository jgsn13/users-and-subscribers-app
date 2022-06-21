import "./styles.css"
import { Container } from "../../styles/GlobalStyles";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FaUserEdit, FaTrash } from "react-icons/fa";
import { UserContainer, PasswordContainer, ButtonDelete, ButtonCancel } from "./styled";
import { useState } from "react";

export default function User() {
  const { full_name, email } = useSelector(state => state.auth.user)
  const [deleteAccount, setDeleteAccount] = useState(false)

  const handleDeleteAccount = () => {

  }

  return (
    <Container style={{ maxWidth: "500px", minWidth: "300px" }}>
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
         <input type="password" placeholder="Sua senha" />
            <ButtonDelete onClick={handleDeleteAccount}>Excluir</ButtonDelete>
            <ButtonCancel
              onClick={() => { setDeleteAccount(!deleteAccount)}}>Cancelar</ButtonCancel>
        </label>
       </PasswordContainer>}
    </Container>
  );
}

