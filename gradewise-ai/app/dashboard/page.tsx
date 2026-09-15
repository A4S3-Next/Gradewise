import { FileText } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>

      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border px-6 py-20 text-center">
        <FileText className="h-8 w-8 text-muted-foreground" aria-hidden />
        <p className="text-base font-medium text-foreground">No submissions yet</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Your submissions, progress, and deadlines will appear here once you upload your first
          piece of work.
        </p>
      </div>
    </div>
  )
}
