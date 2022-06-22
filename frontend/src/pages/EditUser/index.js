import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { useSelector, useDispatch } from "react-redux";
import { editUserRequest } from "../../store/slices/auth/slice";

import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import Loading from "../../components/Loading";

export default function EditUser() {
  const dispatch = useDispatch()

  const { full_name, email } = useSelector(state => state.auth.user)

  const loading = useSelector(state => state.isLoading)

  const [ fullName, setFullName ] = useState("")
  const [ inputEmail, setInputEmail ] = useState("")
  const [ newPassword, setNewPassword ] = useState("")
  const [ currentPassword, setCurrentPassword ] = useState("")

  useEffect(() => {
    setFullName(full_name)
    setInputEmail(email)
  }, [full_name, email])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {}

    if (!!fullName) {
      if (fullName.length < 3 || fullName.length > 255) {
        return toast.error("Nome deve ter entre 3 e 255 caracteres");
      }
      payload.full_name = fullName;
    } else {
      payload.full_name = "";
    }

    if (!!inputEmail) {
      if (!isEmail(inputEmail)) {
        return toast.error("Email inválido");
      }
      payload.email = inputEmail;
    } else {
      payload.email = "";
    }

    if (!!newPassword) {
      if (newPassword.length < 6 || newPassword.length > 50) {
        return toast.error("Nova senha deve ter entre 6 e 50 caracteres");
      }
      payload.password = newPassword;
    } else {
      payload.password = "";
    }

    if (!currentPassword) {
      return toast.error("Você precisa digitar a senha atual para atualizar os dados");
    } else {
      payload.current_password = currentPassword;
    }

    dispatch(editUserRequest(payload))
  }

  return (
    <Container style={{ maxWidth: "500px", minWidth: "300px" }}>
      <Loading isLoading={loading} />

      <h1>Editar dados</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="fullName">
          Nome completo:
          <input
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="Seu nome completo"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={inputEmail}
            onChange={e => setInputEmail(e.target.value)}
            placeholder="Seu melhor email"
          />
        </label>
        <label htmlFor="password">
          Nova senha:
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Sua nova senha"
          />
        </label>
        <label htmlFor="password">
          Senha atual:
          <input
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            placeholder="Sua senha atual"
          />
        </label>

        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}
