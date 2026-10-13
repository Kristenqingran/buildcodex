import {afterEach, describe, expect, it, vi} from 'vitest';
import {POST} from '@/app/api/v1/generation/route';

const request = () => new Request('http://localhost/api/v1/generation/', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({requirement: '买入', language: 'zh-CN'})});

afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

describe('TestLoom generation proxy', () => {
  it('requires both backend URL and shared secret', async () => {
    vi.stubEnv('TESTLOOM_API_BASE_URL', 'http://127.0.0.1:8000');
    expect((await POST(request())).status).toBe(503);
    vi.stubEnv('TESTLOOM_API_SHARED_SECRET', 'secret');
    vi.stubEnv('TESTLOOM_API_BASE_URL', '');
    expect((await POST(request())).status).toBe(503);
  });

  it('forwards the shared secret without returning it', async () => {
    vi.stubEnv('TESTLOOM_API_BASE_URL', 'http://127.0.0.1:8000');
    vi.stubEnv('TESTLOOM_API_SHARED_SECRET', 'do-not-leak');
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({run_id: 'run-1', status: 'SUCCESS', language: 'zh-CN', metadata: {}}), {status: 200}));
    vi.stubGlobal('fetch', fetchMock);
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect(fetchMock.mock.calls[0][1].headers['X-TestLoom-API-Key']).toBe('do-not-leak');
    expect(await response.text()).not.toContain('do-not-leak');
  });

  it('safely passes backend auth failures through without the secret', async () => {
    vi.stubEnv('TESTLOOM_API_BASE_URL', 'http://127.0.0.1:8000');
    vi.stubEnv('TESTLOOM_API_SHARED_SECRET', 'do-not-leak');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({error: 'Unauthorized'}), {status: 401})));
    const response = await POST(request());
    expect(response.status).toBe(401);
    expect(await response.text()).not.toContain('do-not-leak');
  });

  it('returns a clear 504 for an aborted backend request', async () => {
    vi.stubEnv('TESTLOOM_API_BASE_URL', 'http://127.0.0.1:8000');
    vi.stubEnv('TESTLOOM_API_SHARED_SECRET', 'do-not-leak');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new DOMException('Aborted', 'AbortError')));
    const response = await POST(request());
    expect(response.status).toBe(504);
    expect(await response.text()).toContain('timed out');
  });
});
