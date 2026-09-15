import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'

const getSubmissions = vi.fn()

vi.mock('@/lib/submissions', () => ({
  getSubmissions: (...args: unknown[]) => getSubmissions(...args),
}))

import DashboardPage from '@/app/dashboard/page'

describe('DashboardPage', () => {
  it('renders the dashboard heading', async () => {
    getSubmissions.mockResolvedValueOnce([])
    render(await DashboardPage())
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
  })

  it('shows an empty state when there are no submissions', async () => {
    getSubmissions.mockResolvedValueOnce([])
    render(await DashboardPage())
    expect(screen.getByText(/no submissions yet/i)).toBeInTheDocument()
  })

  it('lists submissions with their status and score', async () => {
    getSubmissions.mockResolvedValueOnce([
      {
        id: '1',
        user_id: 'u1',
        title: 'Photosynthesis Essay',
        file_name: 'photosynthesis.docx',
        status: 'graded',
        score: 7.5,
        created_at: '2026-01-01T00:00:00.000Z',
      },
      {
        id: '2',
        user_id: 'u1',
        title: 'Lab Report',
        file_name: 'lab-report.pdf',
        status: 'pending',
        score: null,
        created_at: '2026-01-02T00:00:00.000Z',
      },
    ])
    render(await DashboardPage())

    const gradedRow = screen.getByRole('row', { name: /photosynthesis essay/i })
    expect(within(gradedRow).getByText('7.5/10')).toBeInTheDocument()
    expect(within(gradedRow).getByText('Graded')).toBeInTheDocument()

    const pendingRow = screen.getByRole('row', { name: /lab report/i })
    expect(within(pendingRow).getByText('Pending review')).toBeInTheDocument()
  })
})
