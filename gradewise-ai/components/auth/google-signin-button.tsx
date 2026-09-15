'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export function GoogleSignInButton() {
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    setError(null)
    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (signInError) {
        setError('Google sign-in failed. Please try again.')
      }
    } catch (error) {
      console.error('Google sign-in failed', error)
      setError('Google sign-in failed. Please try again.')
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={handleSignIn} className="w-full" size="lg">
        Continue with Google
      </Button>
      {error && (
        <p role="alert" className="text-center text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
