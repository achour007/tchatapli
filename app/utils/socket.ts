import { Server as SocketIOServer } from 'socket.io';

declare global {
  var io: SocketIOServer | undefined;
}

export const initSocket = () => {
  if (!global.io) {
    console.log('Initializing Socket.IO server...');
    global.io = new SocketIOServer({
      path: '/api/socket',
      addTrailingSlash: false,
    });

    global.io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('join', (room: string) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
      });

      socket.on('message', (data: { room: string; message: string; user: string }) => {
        global.io?.to(data.room).emit('message', data);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
  return global.io;
}; 