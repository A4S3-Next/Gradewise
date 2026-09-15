'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type UploadState = { error: string | null }

export async function uploadSubmission(
  _prevState: UploadState,
  formData: FormData
): Promise<UploadState> {
  const title = formData.get('title')
  const file = formData.get('file')

  if (typeof title !== 'string' || !title.trim()) {
    return { error: 'Give your submission a title.' }
  }

  if (!(file instanceof File) || file.size === 0) {
    return { error: 'Choose a file to upload.' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const path = `${user.id}/${crypto.randomUUID()}-${file.name}`
  const { error: uploadError } = await supabase.storage.from('submissions').upload(path, file)

  if (uploadError) {
    console.error('Failed to upload submission file', uploadError)
    return { error: 'Upload failed. Please try again.' }
  }

  const { error: insertError } = await supabase.from('submissions').insert({
    user_id: user.id,
    title: title.trim(),
    file_name: file.name,
    status: 'pending',
  })

  if (insertError) {
    console.error('Failed to record submission', insertError)
    return { error: 'Upload failed. Please try again.' }
  }

  redirect('/dashboard')
}
