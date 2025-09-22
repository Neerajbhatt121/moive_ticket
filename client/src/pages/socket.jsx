import { io } from "socket.io-client";

//export const socket = io("http://localhost:5000", {
export const socket = io(`${import.meta.env.VITE_BASE_URL_API_URL}`, {
  withCredentials: true,
  transports: ["websocket", "polling"], // fallback
});