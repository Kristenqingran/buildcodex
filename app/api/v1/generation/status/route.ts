import {NextResponse} from 'next/server';

export function GET() {
  const configured = Boolean(
    process.env.TESTLOOM_API_BASE_URL?.trim()
      && process.env.TESTLOOM_API_SHARED_SECRET?.trim(),
  );
  return NextResponse.json({configured}, {headers: {'cache-control': 'no-store'}});
}
