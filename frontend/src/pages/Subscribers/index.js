import "./styles.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api, { statesApi } from "../../services/api";
import { formatCPF } from "../../utils";

import { Container } from "../../styles/GlobalStyles";
import { SubscriberContainer } from "./styled";
import { FaEdit, FaUserCircle, FaTrash } from "react-icons/fa";
import SearchInput from "../../components/SearchInput";

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get("/subscribers")
      .then(({ data }) => setSubscribers(data.subscribers))
      .catch((error) => console.log(error));

    statesApi
      .get("?orderBy=nome")
      .then(({ data }) => setStates(data))
      .catch((error) => console.log(error));
  }, [loading]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const getCities = ({ target }) => {
    const sigla = target.options[target.selectedIndex].value;
    if (!sigla) {
      setCities([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    statesApi
      .get(`/${sigla}/municipios?orderBy=nome`)
      .then(({ data }) => {
        const citiesName = [];
        data.forEach((city) => {
          citiesName.push(city.nome.toLowerCase());
        });
        setCities(citiesName);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const filteredSubscribers = !!searchValue
    ? subscribers.filter((sub) =>
        sub.full_name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : cities.length > 0
    ? subscribers.filter((sub) => cities.includes(sub.city.toLowerCase()))
    : subscribers;

  return (
    <Container>
      <h1>Inscritos</h1>
      <div className="search-container">
        <SearchInput searchValue={searchValue} handleChange={handleChange} />
        {!!searchValue && (
          <>
            <p className="search-value">
              <b>Pesquisa: </b>
              <i>{searchValue}</i>
            </p>
            {filteredSubscribers.length > 0 && (
              <>
                <p className="search-results">
                  <b>Resultados: </b>
                  <i>{filteredSubscribers.length}</i>
                </p>
              </>
            )}
          </>
        )}
      </div>
      <div>
        <label for="states">
          <b>Estado: </b>
        </label>
        <select name="states" onChange={getCities} className="select-state">
          <option value="">---</option>
          {states.map((state) => (
            <option value={state.sigla}>{state.nome}</option>
          ))}
        </select>
      </div>
      {(filteredSubscribers.length > 0 && (
        <SubscriberContainer>
          {filteredSubscribers.map((subscriber) => (
            <div key={subscriber.id} className="sub-container">
              <div>
                <FaUserCircle size={30} />
                <Link className="link" to={`/subscriber/${subscriber.id}`}>
                  {subscriber.full_name}
                </Link>
              </div>
              <span>
                <i>{subscriber.city}</i>
              </span>
              <span>
                <i>{subscriber.email}</i>
              </span>
              <span>{formatCPF(subscriber.cpf)}</span>
              <Link to={`/subscriber/${subscriber.id}`}>
                <FaEdit size={20} />
              </Link>
              <Link to={`/subscriber/${subscriber.id}`}>
                <FaTrash size={20} />
              </Link>
            </div>
          ))}
        </SubscriberContainer>
      )) ||
        (!!searchValue && (
          <p className="no-subs">Nenhum inscrito encontrado</p>
        ))}
    </Container>
  );
}
