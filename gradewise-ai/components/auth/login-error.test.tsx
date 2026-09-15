import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('error=auth_failed'),
}))

import { LoginError } from '@/components/auth/login-error'

describe('LoginError', () => {
  it('renders an error message when error=auth_failed', () => {
    render(<LoginError />)
    expect(screen.getByRole('alert')).toHaveTextContent(/sign-in failed/i)
  })
})
