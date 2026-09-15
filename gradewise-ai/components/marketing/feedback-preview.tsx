import { MessageSquare } from 'lucide-react'

export function FeedbackPreview() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-16px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="text-sm font-medium text-foreground">Photosynthesis_Essay.docx</span>
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
          7.5 / 10
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Plants convert sunlight into chemical energy through a process called
        photosynthesis.{' '}
        <span className="rounded bg-accent px-0.5 text-accent-foreground underline decoration-primary/50 decoration-2 underline-offset-2">
          This happens because of chlorophyll which is important.
        </span>{' '}
        The reaction takes place primarily in the leaves of the plant.
      </p>

      <div className="mt-4 flex gap-2.5 rounded-xl bg-muted p-3">
        <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
        <p className="text-sm text-foreground">
          <span className="font-medium">Scientific accuracy —</span> name the specific role
          chlorophyll plays (light absorption) instead of calling it &ldquo;important.&rdquo;
        </p>
      </div>
    </div>
  )
}
