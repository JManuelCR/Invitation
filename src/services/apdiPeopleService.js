import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

export const getGuest = (id) => {
  return API.get(`/guest/${id}`);
};

export const patchGuest = (id, data) => {
  return API.patch(`/guest/${id}`, data);
};
