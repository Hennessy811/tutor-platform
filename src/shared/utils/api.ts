import { BACKEND_URL } from './config';

export const request = (url: string, options?: RequestInit) => {
  const token = localStorage.getItem('jwt');

  return fetch(`${BACKEND_URL}/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    ...options,
  }).then((r) => r.json());
};

export const post = () => {};
