import axios from 'axios';

const baseURL = 'https://assignment-todolist-api.vercel.app/api';

export const Axios = axios.create({
  baseURL,
});
