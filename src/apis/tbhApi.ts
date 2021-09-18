const axios = require('axios');

let token = localStorage.getItem("Authorization");

if (!token) token = '';

const startriteApi = axios.create({
  // baseURL: 'http://localhost:8000/api/v1',
  baseURL: "https://startrite-devapi.sterlingapps.p.azurewebsites.net/api/v1",
  headers: {
    Authorization: "Bearer " + token,
  }
});

export const tbhApiInternals = () => {
  const authToken = localStorage.getItem('Authorization');

  return axios.create({
    baseURL: 'https://startrite-devapi.sterlingapps.p.azurewebsites.net/api/v1',
    headers: { Authorization: "Bearer " + authToken }
  });
};

export const paymentGatewayUrl = 'https://pass.sterling.ng/SterlingGateway';

export const bsfUrl = 'http://bsfweb-2-0.sterlingapps.p.azurewebsites.net/explore-bsf';

export default startriteApi;
