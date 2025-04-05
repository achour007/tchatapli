import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiResponse } from 'next';

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: NetServer & {
      io?: SocketIOServer;
    };
  };
};

export const initSocket = (res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('join', (room: string) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
      });

      socket.on('message', (data: { room: string; message: string; user: string }) => {
        io.to(data.room).emit('message', data);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
  return res.socket.server.io;
}; 