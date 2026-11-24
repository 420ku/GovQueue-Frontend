import io from "socket.io-client";

const URL = import.meta.env.VITE_SERVER_URL;

// Vercel Functions do not guarantee sticky sessions for HTTP polling.
// Connect directly over WebSocket to avoid polling handshake 400 errors.
export const socket = io(URL, {
    transports: ["websocket"],
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 10000,
});

socket.on("connect_error", (error) => {
    console.error("GovQueue realtime connection failed:", error.message);
});
