import axios from "axios";

const api = axios.create({
  baseURL: "http://api.subscribers.joaquimgregorio.link",
});

export default api;

export const statesApi = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
});

export const cepApi = axios.create({
  baseURL: "https://viacep.com.br/ws"
})
