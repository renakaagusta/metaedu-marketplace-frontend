import axios, { AxiosResponse } from 'axios';
import { camelizeKeys } from 'humps';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.defaults.headers.common['Content-Type'] = 'application/json';

api.interceptors.response.use((response: AxiosResponse) => {
  if (
    response.data
  ) {
    response.data = camelizeKeys(response.data);
  }
  return response;
});

// api.interceptors.request.use(AxiosLogger.requestLogger)