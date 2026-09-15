import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const setTheme = vi.fn()
let mockResolvedTheme = 'light'

vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: mockResolvedTheme, setTheme }),
}))

import { ThemeToggle } from '@/components/layout/theme-toggle'

describe('ThemeToggle', () => {
  it('toggles from light to dark when clicked', async () => {
    mockResolvedTheme = 'light'
    render(<ThemeToggle />)
    await userEvent.click(screen.getByRole('button', { name: /toggle theme/i }))
    expect(setTheme).toHaveBeenCalledWith('dark')
  })

  it('toggles from dark to light when clicked, including when the system resolved to dark', async () => {
    mockResolvedTheme = 'dark'
    render(<ThemeToggle />)
    await userEvent.click(screen.getByRole('button', { name: /toggle theme/i }))
    expect(setTheme).toHaveBeenCalledWith('light')
  })
})
