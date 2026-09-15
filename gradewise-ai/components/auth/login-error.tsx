'use client'

import { useSearchParams } from 'next/navigation'

export function LoginError() {
  const searchParams = useSearchParams()
  if (searchParams.get('error') !== 'auth_failed') {
    return null
  }

  return (
    <p role="alert" className="text-center text-sm text-destructive">
      Sign-in failed. Please try again.
    </p>
  )
}
