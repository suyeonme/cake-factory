import axios, { AxiosInstance } from 'axios';

export const customAxios: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    // access_token: cookies.get('access_token'), // jwt
  },
});
