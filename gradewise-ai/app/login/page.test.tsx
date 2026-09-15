import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/components/auth/google-signin-button', () => ({
  GoogleSignInButton: () => <button>Continue with Google</button>,
}))

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
}))

import LoginPage from '@/app/login/page'

describe('LoginPage', () => {
  it('renders the sign-in card', () => {
    render(<LoginPage />)
    expect(screen.getByRole('heading', { name: /sign in to gradewise ai/i })).toBeInTheDocument()
    expect(screen.getByText(/continue with google/i)).toBeInTheDocument()
  })
})
