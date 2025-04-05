import { NextResponse } from 'next/server';
import { initSocket } from '@/app/utils/socket';

export async function GET(req: Request) {
  const response = NextResponse.next();
  initSocket(response as any);
  return response;
} 