import Link from 'next/link'
import { FileText } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { getSubmissions, type Submission } from '@/lib/submissions'
import { cn } from 'cn'

const STATUS_LABEL: Record<Submission['status'], string> = {
  graded: 'Graded',
  pending: 'Pending review',
}

const DATE_FORMAT = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })

export default async function DashboardPage() {
  const submissions = await getSubmissions()
  const graded = submissions.filter(
    (submission) => submission.status === 'graded' && submission.score !== null
  )
  const averageScore =
    graded.length > 0
      ? (graded.reduce((sum, submission) => sum + Number(submission.score), 0) / graded.length).toFixed(1)
      : null

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <Link href="/dashboard/upload" className={cn(buttonVariants(), 'rounded-full px-4')}>
          Upload submission
        </Link>
      </div>

      {submissions.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border px-6 py-20 text-center">
          <FileText className="h-8 w-8 text-muted-foreground" aria-hidden />
          <p className="text-base font-medium text-foreground">No submissions yet</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Your submissions, progress, and deadlines will appear here once you upload your first
            piece of work.
          </p>
          <Link
            href="/dashboard/upload"
            className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 rounded-full px-4')}
          >
            Upload your first submission
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 sm:max-w-xl">
            <div className="rounded-2xl border border-border p-4">
              <p className="text-sm text-muted-foreground">Submissions</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {submissions.length}
              </p>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <p className="text-sm text-muted-foreground">Graded</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {graded.length}
              </p>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <p className="text-sm text-muted-foreground">Average score</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {averageScore ? `${averageScore}/10` : '—'}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  <th className="px-4 py-3 font-medium">Submission</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="px-4 py-3 font-medium text-foreground">{submission.title}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          submission.status === 'graded'
                            ? 'rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground'
                            : 'rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground'
                        }
                      >
                        {STATUS_LABEL[submission.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {submission.score !== null ? `${submission.score}/10` : '—'}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {DATE_FORMAT.format(new Date(submission.created_at))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
