import { NextResponse } from 'next/server';
import { Server } from 'socket.io';

declare global {
  var io: Server | undefined;
}

const ioHandler = (req: Request) => {
  if (!global.io) {
    console.log('New Socket.io server...');
    // @ts-ignore
    global.io = new Server({
      path: '/api/socket',
      addTrailingSlash: false,
    });
  }
  return NextResponse.json({ success: true });
};

export const GET = ioHandler;
export const POST = ioHandler; 