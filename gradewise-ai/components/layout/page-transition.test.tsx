import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

import { PageTransition } from '@/components/layout/page-transition'

describe('PageTransition', () => {
  it('renders its children', () => {
    render(
      <PageTransition>
        <p>content</p>
      </PageTransition>
    )
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
