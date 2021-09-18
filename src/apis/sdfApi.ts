import axios from "axios";

const devUrl = "https://distributionloan-dev.sterlingapps.p.azurewebsites.net/api/v1";

const host = window.location.hostname;

let baseURL = "";

switch (host) {
  case "localhost":
    baseURL = devUrl;
    break;
  case "https://sdf-frontend-dev.azurewebsites.net":
    baseURL = devUrl;
    break;
  default:
    baseURL = devUrl;
    break;
}

export const sdfApi = () => {
  const authToken = localStorage.getItem('Authorization');

  return axios.create({
    baseURL,
    headers: { Authorization: "Bearer " + authToken }
  });
};
