import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { UploadForm } from '@/components/dashboard/upload-form'

export default function UploadPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
      <div>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to dashboard
        </Link>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
          Upload a submission
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          We&rsquo;ll review it and get back to you with detailed, criterion-by-criterion
          feedback.
        </p>
      </div>

      <Card>
        <CardContent className="pt-2">
          <UploadForm />
        </CardContent>
      </Card>
    </div>
  )
}
