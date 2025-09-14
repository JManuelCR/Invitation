import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 10000, // 10 segundos timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para requests
API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getGuest = async (id) => {
  try {
    if (!id || id === 'default') {
      throw new Error('ID de invitado no válido');
    }
    
    const response = await API.get(`/guest/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const patchGuest = async (id, data) => {
  try {
    if (!id) {
      throw new Error('ID de invitado requerido para actualizar');
    }
    
    const response = await API.patch(`/guest/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
