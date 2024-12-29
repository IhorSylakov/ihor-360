import { NextResponse } from 'next/server';

export async function POST() {
  // Удаляем куки пользователя
  const cookie = 'user=; Path=/; Max-Age=0; HttpOnly; Secure;';
  const response = NextResponse.json({ success: true });
  response.headers.append('Set-Cookie', cookie);

  return response;
}
