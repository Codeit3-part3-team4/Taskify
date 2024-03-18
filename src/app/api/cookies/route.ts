import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  if (!request.body) {
    return NextResponse.json({ status: 400, message: 'Missing request cookies body' });
  }
  const body = await request.json();

  if (!body.key || !body.value) {
    return NextResponse.json({ status: 400, message: 'Missing request cookies body' });
  }
  cookies().set(body.key, String(body.value));

  return NextResponse.json({ status: 200 });
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');

  if (!key) return NextResponse.json({ status: 400, message: 'not found cookies key' });

  const value = cookies().get(key);

  if (!value) {
    return NextResponse.json({ status: 400, message: 'not found cookies key' });
  }

  return NextResponse.json(value, { status: 200 });
}
