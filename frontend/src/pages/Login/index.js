import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmail } from "validator";
import { toast } from "react-toastify";
import history from "../../services/history";

import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import Loading from "../../components/Loading";

import { useDispatch } from "react-redux";
import { loginRequest } from "../../store/slices/auth/slice";

export default function Login() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const loading = useSelector(state => state.auth.isLoading)

  useEffect(() => {
    if (isLoggedIn) history.back()
  })

  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error("Email inválido");
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error("Senha inválida");
    }

    if (formErrors) return;

    dispatch(loginRequest({ email, password }))
  }

  return (
    <Container style={{ maxWidth: "500px", minWidth: "300px" }}>
      <Loading isLoading={loading} />

      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Seu email"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Sua senha"
        />
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
