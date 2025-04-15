
const BASE_URL = import.meta.env.VITE_API_URL || window.API_URL || 'http://localhost:8080';
const IDENTITY_PATH = import.meta.env.VITE_IDENTITY_API_PATH || window.IDENTITY_API_PATH || '/identity';
const DOMAIN2_PATH = import.meta.env.VITE_DOMAIN2_API_PATH || window.DOMAIN2_API_PATH || '/domain2';
const KITCHEN_PATH = import.meta.env.VITE_KITCHEN_API_PATH || window.KITCHEN_API_PATH || '/kitchen';

export const API_CONFIG = {
  BASE_URL,
  IDENTITY_API_URL: `${BASE_URL}${IDENTITY_PATH}`,
  DOMAIN2_API_URL: `${BASE_URL}${DOMAIN2_PATH}`,
  KITCHEN_API_URL: `${BASE_URL}${KITCHEN_PATH}`,
  AUTH_API_URL: `${BASE_URL}${IDENTITY_PATH}/auth`
};

export default API_CONFIG;