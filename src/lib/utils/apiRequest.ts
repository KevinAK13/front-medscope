import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  withCredentials: true, // Necesario si manejas cookies o sesiones
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiRequest;