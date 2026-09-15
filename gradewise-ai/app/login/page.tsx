import { Suspense } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GoogleSignInButton } from '@/components/auth/google-signin-button'
import { LoginError } from '@/components/auth/login-error'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-muted/40 px-4">
      <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
        GradeWise AI
      </Link>

      <Card className="w-full max-w-sm rounded-2xl border-border shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-16px_rgba(0,0,0,0.18)]">
        <CardHeader className="items-center gap-1 text-center">
          <CardTitle role="heading" aria-level={1} className="text-lg">
            Sign in to GradeWise AI
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Get criterion-by-criterion feedback on your next submission.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Suspense fallback={null}>
            <LoginError />
          </Suspense>
          <GoogleSignInButton />
        </CardContent>
      </Card>

      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to home
      </Link>
    </div>
  )
}
