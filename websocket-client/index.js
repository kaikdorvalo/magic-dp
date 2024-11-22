import { io } from "socket.io-client"

const socket = io('http://localhost:3001');

socket.on('connect', () => {
    console.log('Conectado no websocket:', socket.id);
});

socket.on('cards-placed', (message) => {
    console.log(message);
});
