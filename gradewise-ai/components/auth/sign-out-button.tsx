'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Sign-out failed', error)
    } finally {
      router.push('/')
    }
  }

  return (
    <Button variant="ghost" onClick={handleSignOut}>
      Sign out
    </Button>
  )
}
