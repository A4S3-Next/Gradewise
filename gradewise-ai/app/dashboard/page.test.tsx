import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import DashboardPage from '@/app/dashboard/page'

describe('DashboardPage', () => {
  it('renders a placeholder heading', () => {
    render(<DashboardPage />)
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
  })
})
