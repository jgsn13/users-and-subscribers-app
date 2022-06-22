import { useState } from "react";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { get } from "lodash";

import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import Loading from "../../components/Loading";

import api from "../../services/api";
import history from "../../services/history";

export default function Register() {
  const [ fullName, setFullName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ secretKey, setSecretKey ] = useState("")
  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (fullName.length < 3 || fullName.length > 255) {
      return toast.error("Nome deve ter entre 3 e 255 caracteres");
    }

    if (!isEmail(email)) {
      return toast.error("Email inválido");
    }

    if (password.length < 6 || password.length > 50) {
      return toast.error("Senha deve ter entre 6 e 50 caracteres");
    }

    setLoading(true)
    try {
      await api.post("/user/register", {
        full_name: fullName,
        email,
        password,
        secret_key: secretKey,
      })
      toast.success("Cadastro feito com sucesso")
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

      <h1>Cadastre-se</h1>

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
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Seu melhor email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>
        <label htmlFor="">
          Chave de registro:
          <input
            type="text"
            value={secretKey}
            onChange={e => setSecretKey(e.target.value)}
            placeholder="Chave única de registro"
          />
        </label>

        <button type="submit">Criar conta</button>
      </Form>
    </Container>
  );
}
