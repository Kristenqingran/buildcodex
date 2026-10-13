import {NextResponse} from 'next/server';
import {isGenerationResult, type GenerationRequest} from '@/lib/testloom';

const REQUEST_TIMEOUT_MS = 90_000;

export async function POST(request: Request) {
  const baseUrl = process.env.TESTLOOM_API_BASE_URL?.trim();
  if (!baseUrl) return NextResponse.json({error: 'TestLoom API is not configured.'}, {status: 503});
  const sharedSecret = process.env.TESTLOOM_API_SHARED_SECRET?.trim();
  if (!sharedSecret) return NextResponse.json({error: 'TestLoom API shared secret is not configured.'}, {status: 503});

  let body: GenerationRequest;
  try { body = await request.json() as GenerationRequest; } catch { return NextResponse.json({error: 'Invalid JSON request.'}, {status: 400}); }
  if (!body.requirement?.trim() || !body.language?.trim()) return NextResponse.json({error: 'Requirement and language are required.'}, {status: 400});

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/api/v1/generation`, {
      method: 'POST', headers: {'content-type': 'application/json', 'X-TestLoom-API-Key': sharedSecret},
      body: JSON.stringify({requirement: body.requirement, language: body.language}), signal: controller.signal,
    });
    const payload: unknown = await response.json().catch(() => ({error: 'Backend returned invalid JSON.'}));
    if (!response.ok) return NextResponse.json(payload, {status: response.status});
    if (!isGenerationResult(payload)) return NextResponse.json({error: 'Backend response does not match GenerationResult.'}, {status: 502});
    return NextResponse.json(payload);
  } catch (error) {
    const message = error instanceof DOMException && error.name === 'AbortError' ? 'TestLoom request timed out.' : 'Unable to reach TestLoom backend.';
    return NextResponse.json({error: message}, {status: 504});
  } finally { clearTimeout(timeout); }
}
