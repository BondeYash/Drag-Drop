import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // proxy in vite.config -> backend
  withCredentials: true // send cookies
});

export default api;
