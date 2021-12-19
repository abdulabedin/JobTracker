import axios from "axios";

const url = "https://cps530-termproject.herokuapp.com";

export const api = axios.create({
  baseURL: url,
});

export function setTokenHeader(token) {
  if (token) {
    api.defaults.headers.common["authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["authorization"];
  }
}
