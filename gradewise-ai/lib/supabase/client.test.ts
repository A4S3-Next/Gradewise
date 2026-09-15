import { describe, it, expect, vi } from 'vitest'

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(() => ({ auth: {} })),
}))

import { createClient } from '@/lib/supabase/client'
import { createBrowserClient } from '@supabase/ssr'

describe('createClient (browser)', () => {
  it('creates a browser client without throwing, even with placeholder env vars', () => {
    const client = createClient()
    expect(client).toBeDefined()
    expect(createBrowserClient).toHaveBeenCalled()
  })
})
