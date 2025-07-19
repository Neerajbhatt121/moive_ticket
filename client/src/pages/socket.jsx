import { io } from "socket.io-client";

//export const socket = io("http://localhost:5000", {
export const socket = io("https://moive-ticket-1.onrender.com", {
  withCredentials: true,
  transports: ["websocket", "polling"], // fallback
});