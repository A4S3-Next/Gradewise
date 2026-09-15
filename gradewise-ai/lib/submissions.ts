import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/supabase'

export type Submission = Database['public']['Tables']['submissions']['Row']

export async function getSubmissions(): Promise<Submission[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to load submissions', error)
    return []
  }

  return data ?? []
}
