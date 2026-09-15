import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const signOut = vi.fn()
const push = vi.fn()

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({ auth: { signOut } }),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}))

import { SignOutButton } from '@/components/auth/sign-out-button'

describe('SignOutButton', () => {
  it('signs out and redirects home on click', async () => {
    render(<SignOutButton />)
    await userEvent.click(screen.getByRole('button', { name: /sign out/i }))
    expect(signOut).toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith('/')
  })
})
