import { describe, it, expect, vi } from 'vitest'

const exchangeCodeForSession = vi.fn()

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(async () => ({
    auth: { exchangeCodeForSession },
  })),
}))

import { GET } from '@/app/auth/callback/route'

describe('GET /auth/callback', () => {
  it('redirects to /dashboard when the code exchange succeeds', async () => {
    exchangeCodeForSession.mockResolvedValueOnce({ error: null })

    const response = await GET(new Request('http://localhost/auth/callback?code=abc123'))

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/dashboard')
  })

  it('redirects to /login with an error when the code exchange fails', async () => {
    exchangeCodeForSession.mockResolvedValueOnce({ error: new Error('invalid code') })

    const response = await GET(new Request('http://localhost/auth/callback?code=bad'))

    expect(response.headers.get('location')).toBe('http://localhost/login?error=auth_failed')
  })

  it('redirects to /login with an error when no code is present', async () => {
    const response = await GET(new Request('http://localhost/auth/callback'))

    expect(response.headers.get('location')).toBe('http://localhost/login?error=auth_failed')
  })
})
