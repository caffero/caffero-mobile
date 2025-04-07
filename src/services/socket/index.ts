import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'https://your-backend.com/socket';
let socket: Socket | null = null;

export function connectSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, { transports: ['websocket'] });
  }
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function getSocket(): Socket {
  if (!socket) throw new Error("Socket not connected.");
  return socket;
}
