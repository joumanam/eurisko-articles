import axios from 'axios';
import { useAppSelector } from '../redux/rtkHooks';
import AsyncStorage from '@react-native-community/async-storage';


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



export const fetchArticles = async (page: number) =>

  new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem('token');
    api(`/articles?page=${page}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
