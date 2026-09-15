import { describe, it, expect, vi } from 'vitest'

vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => ({
    getAll: () => [],
    set: vi.fn(),
  })),
}))

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(() => ({ auth: {} })),
}))

import { createClient } from '@/lib/supabase/server'
import { createServerClient } from '@supabase/ssr'

describe('createClient (server)', () => {
  it('creates a server client without throwing, even with placeholder env vars', async () => {
    const client = await createClient()
    expect(client).toBeDefined()
    expect(createServerClient).toHaveBeenCalled()
  })
})
