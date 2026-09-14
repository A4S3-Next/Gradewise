import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('@/components/layout/theme-toggle', () => ({
  ThemeToggle: () => <button aria-label="Toggle theme">theme</button>,
}))

import { Navbar } from '@/components/layout/navbar'

describe('Navbar', () => {
  it('renders the brand link pointing home', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /gradewise ai/i })).toHaveAttribute('href', '/')
  })

  it('opens the mobile menu and shows a sign in link', async () => {
    render(<Navbar />)
    await userEvent.click(screen.getByRole('button', { name: /open menu/i }))
    const signInLinks = await screen.findAllByRole('link', { name: /sign in/i })
    expect(signInLinks.length).toBeGreaterThan(0)
  })
})
