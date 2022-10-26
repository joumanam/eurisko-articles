import axios from 'axios';


const api = axios.create({
    baseURL: `http://34.245.213.76:3000`,
    responseType: 'json',
  });

export const loginRequest = (data: any) =>
  new Promise(async (resolve, reject) => {
    api(`/auth/signin`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data,
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });