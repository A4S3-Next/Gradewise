import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Hero } from '@/components/marketing/hero'

describe('Hero', () => {
  it('renders the primary headline and a call-to-action link', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', { name: /feedback that makes you a better student/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /get started free/i })).toHaveAttribute(
      'href',
      '/login'
    )
  })
})
