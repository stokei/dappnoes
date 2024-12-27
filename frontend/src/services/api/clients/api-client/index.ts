import axios from 'axios';

import { API_URL } from '@/environments';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
});
