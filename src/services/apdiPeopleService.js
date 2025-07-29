import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

export const getPeople = (id) => {
  console.log("Making API request to:", `/guest/${id}`);
  console.log("Full URL:", `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/guest/${id}`);
  return API.get(`/guest/${id}`);
};
