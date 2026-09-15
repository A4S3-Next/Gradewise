import { describe, it, expect } from 'vitest'
import { isProtectedRoute } from '@/lib/auth/protected-routes'

describe('isProtectedRoute', () => {
  it('returns true for dashboard paths', () => {
    expect(isProtectedRoute('/dashboard')).toBe(true)
    expect(isProtectedRoute('/dashboard/settings')).toBe(true)
  })

  it('returns false for non-dashboard paths', () => {
    expect(isProtectedRoute('/')).toBe(false)
    expect(isProtectedRoute('/login')).toBe(false)
  })
})
