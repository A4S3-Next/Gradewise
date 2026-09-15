import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const signInWithOAuth = vi.fn()

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({ auth: { signInWithOAuth } }),
}))

import { GoogleSignInButton } from '@/components/auth/google-signin-button'

describe('GoogleSignInButton', () => {
  it('calls signInWithOAuth with the google provider on click', async () => {
    render(<GoogleSignInButton />)
    await userEvent.click(screen.getByRole('button', { name: /continue with google/i }))
    expect(signInWithOAuth).toHaveBeenCalledWith(expect.objectContaining({ provider: 'google' }))
  })
})
