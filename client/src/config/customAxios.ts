import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

export const customAxios: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    access_token: Cookies.get('jwt'),
  },
});
