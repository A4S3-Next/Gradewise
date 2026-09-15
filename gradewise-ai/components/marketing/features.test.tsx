import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Features } from '@/components/marketing/features'

describe('Features', () => {
  it('renders all three feature cards', () => {
    render(<Features />)
    expect(screen.getByText(/criterion-by-criterion scoring/i)).toBeInTheDocument()
    expect(screen.getByText(/coaching, not rewriting/i)).toBeInTheDocument()
    expect(screen.getByText(/track your progress/i)).toBeInTheDocument()
  })
})
