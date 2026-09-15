'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { uploadSubmission, type UploadState } from '@/app/dashboard/upload/actions'

const initialState: UploadState = { error: null }

export function UploadForm() {
  const [state, formAction, isPending] = useActionState(uploadSubmission, initialState)

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium text-foreground">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          placeholder="e.g. Photosynthesis Essay"
          className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/50 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="file" className="text-sm font-medium text-foreground">
          File
        </label>
        <input
          id="file"
          name="file"
          type="file"
          required
          accept=".pdf,.doc,.docx,.txt"
          className="rounded-lg border border-dashed border-border bg-background px-3 py-2.5 text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-accent-foreground"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={isPending} className="w-full" size="lg">
        {isPending ? 'Uploading…' : 'Upload submission'}
      </Button>
    </form>
  )
}
