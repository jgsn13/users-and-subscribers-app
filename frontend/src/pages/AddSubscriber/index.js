import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { get } from "lodash";

import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import Loading from "../../components/Loading";

import api, { cepApi } from "../../services/api";
import history from "../../services/history";
import { cpfValidator } from "../../utils";

export default function AddSubscriber() {
  const [ cpf, setCPF ] = useState("")
  const [ fullName, setFullName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ phoneNumber, setPhoneNumber ] = useState("")
  const [ cep, setCEP ] = useState("")
  const [ city, setCity ] = useState("")
  const [ neighborhood, setNeighborhood ] = useState("")
  const [ address, setAddress ] = useState("")
  const [ number, setNumber ] = useState("")
  const [ address2, setAddress2 ] = useState("")
  const [ hearAbout, setHearAbout ] = useState("")
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    if (Number(cep.replace(/\D/g,'')) && cep.length === 8) {
      cepApi.get(`/${cep}/json`).then(({data}) => {
        if (!!data.localidade) setCity(data.localidade || " ")
        if (!!data.complemento) setAddress2(data.complemento || " ")
        if (!!data.bairro) setNeighborhood(data.bairro || " ")
        if (!!data.logradouro) setAddress(data.logradouro || " ")
      }).catch(err => console.log(err))
    } else {
      setCity("")
      setAddress2("")
      setNeighborhood("")
      setAddress("")
    }
  }, [cep])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cpf.length !== 11) {
      return toast.error("CPF precisa ter 11 dígitos");
    }

    if (!cpfValidator(cpf)) {
      return toast.error("CPF Inválido");
    }

    if (fullName.length < 3 || fullName.length > 255) {
      return toast.error("Nome deve ter entre 3 e 255 caracteres");
    }

    if (!isEmail(email)) {
      return toast.error("Email inválido");
    }

    if (!!phoneNumber && (phoneNumber.length !== 11)) {
      return toast.error("Telefone precisa ter 11 dígitos");
    }

    if (!!phoneNumber && !Number(phoneNumber)) {
      return toast.error("Telefone precisa conter apenas dígitos");
    }

    if (cep.length !== 8) {
      return toast.error("CEP precisa ter 11 dígitos");
    }

    if (!Number(cep.replace(/\D/g,''))) {
      return toast.error("CEP precisa conter apenas dígitos");
    }

    if (neighborhood.length < 3) {
      return toast.error("Bairro precisa ter no mínimo 3 caracteres");
    }

    if (address.length < 3) {
      return toast.error("Endereço precisa ter no mínimo 3 caracteres");
    }

    if (!!number && (!Number(number))) {
      return toast.error("Número precisa conter apenas dígitos");
    }

    if (hearAbout.length < 5) {
      return toast.error("Descrição muito curta de onde soube do evento");
    }

    setLoading(true)
    try {
      await api.post("/subscriber/register", {
        cpf,
        full_name: fullName,
        email,
        phone_number: phoneNumber,
        cep,
        city,
        neighborhood,
        address,
        number,
        address_2: address2,
        hear_about_the_event: hearAbout
      })
      toast.success("Inscrito cadastrado com sucesso")
      setLoading(false)
      history.push("/")
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

      <h1>Adicionar inscrito</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="cpf">
          CPF*:
          <input
            type="text"
            value={cpf}
            onChange={e => setCPF(e.target.value)}
            placeholder="CPF com 11 dígitos"
          />
        </label>
        <label htmlFor="fullName">
          Nome completo*:
          <input
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="Nome completo"
          />
        </label>
        <label htmlFor="email">
          Email*:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Ex.: exemplo@teste.com"
          />
        </label>
        <label htmlFor="phoneNumber">
          Telefone (opcional):
          <input
            type="tel"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            placeholder="Telefone com 11 dígitos"
          />
        </label>
        <label htmlFor="cep">
          CEP*:
          <input
            type="text"
            value={cep}
            onChange={e => setCEP(e.target.value)}
            placeholder="CEP com 8 dígitos"
          />
        </label>
        <label htmlFor="city">
          Cidade*:
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="Cidade"
          />
        </label>
        <label htmlFor="neighborhood">
          Bairro*:
          <input
            type="text"
            value={neighborhood}
            onChange={e => setNeighborhood(e.target.value)}
            placeholder="Bairro"
          />
        </label>
        <label htmlFor="address">
          Endereço*:
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Endereço"
          />
        </label>
        <label htmlFor="number">
          Número (opcional):
          <input
            type="text"
            value={number}
            onChange={e => setNumber(e.target.value)}
            placeholder="Número"
          />
        </label>
        <label htmlFor="address2">
          Complemento (opcional):
          <input
            type="text"
            value={address2}
            onChange={e => setAddress2(e.target.value)}
            placeholder="Complemento"
          />
        </label>
        <label htmlFor="hearAbout">
          Por onde soube do evento*:
          <input
            type="text"
            value={hearAbout}
            onChange={e => setHearAbout(e.target.value)}
            placeholder="Por onde soube do evento"
          />
        </label>

        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
