import "./styles.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";
import { formatCPF, formatPhoneNumber, formatCEP } from "../../utils";

import { Container } from "../../styles/GlobalStyles";
import { SubscriberContainer } from "./styled.js";
import { FaLongArrowAltLeft } from "react-icons/fa";

import history from "../../services/history.js";

export default function Subscriber() {
  const [subscriber, setSubscriber] = useState({});
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/subscriber/${id}`)
      .then(({ data }) => {
        data.cpf = formatCPF(data.cpf);
        data.cep = formatCEP(data.cep);
        setSubscriber(data);
      })
      .catch((error) => console.log(error));
  });

  return (
    <Container>
      <div className="go-back" onClick={history.back}>
        <FaLongArrowAltLeft size={20} />
      </div>
      <h1>{subscriber.full_name}</h1>
      <SubscriberContainer>
        <div className="sub-container">
          <span>
            <b>CPF: </b>
            {subscriber.cpf}
          </span>
          <span>
            <b>Email: </b>
            <i>{subscriber.email}</i>
          </span>
          {!!subscriber.phone_number && (
            <span>
              <b>Telefone: </b>
              {formatPhoneNumber(subscriber.phone_number)}
            </span>)}
          <span>
            <b>CEP: </b>
            {subscriber.cep}
          </span>
          <span>
            <b>Cidade: </b>
            {subscriber.city}
          </span>
          <span>
            <b>Bairro: </b>
            {subscriber.neighborhood}
          </span>
          <span>
            <b>Endereço: </b>
            {subscriber.address}
          </span>
          {!!subscriber.number && (
            <p>
              <b>Número: </b>
              {subscriber.number}
            </p>
          )}
          {!!subscriber.address_2 && (
            <p>
              <b>Complemento: </b>
              {subscriber.address_2}
            </p>
          )}
          <span>
            <b>Por onde soube do evento: </b>
            {subscriber.hear_about_the_event}
          </span>
        </div>
      </SubscriberContainer>
    </Container>
  );
}
