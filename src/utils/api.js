import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

export async function getRecommendations(preferences) {
  const response = await api.post("/recommend", preferences);
  return response.data;
}

export async function getAllCars() {
  const response = await api.get("/cars");
  return response.data;
}

export default api;
