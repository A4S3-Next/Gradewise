'use client'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export function GoogleSignInButton() {
  const handleSignIn = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
    } catch (error) {
      console.error('Google sign-in failed', error)
    }
  }

  return (
    <Button onClick={handleSignIn} className="w-full" size="lg">
      Continue with Google
    </Button>
  )
}
