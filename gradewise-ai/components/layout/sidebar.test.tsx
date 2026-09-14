import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Sidebar } from '@/components/layout/sidebar'

describe('Sidebar', () => {
  it('renders a link to the dashboard', () => {
    render(<Sidebar />)
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard')
  })
})
