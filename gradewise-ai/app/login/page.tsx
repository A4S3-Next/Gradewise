import { Suspense } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GoogleSignInButton } from '@/components/auth/google-signin-button'
import { LoginError } from '@/components/auth/login-error'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm border-border/60 bg-background/60 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle role="heading" aria-level={1}>
            Sign in to GradeWise AI
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Suspense fallback={null}>
            <LoginError />
          </Suspense>
          <GoogleSignInButton />
          <Link href="/" className="text-center text-sm text-muted-foreground hover:underline">
            Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
