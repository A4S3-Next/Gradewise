export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          plan: 'free' | 'premium'
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'premium'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'premium'
          created_at?: string
        }
        Relationships: []
      }
      submissions: {
        Row: {
          id: string
          user_id: string
          title: string
          file_name: string
          status: 'pending' | 'graded'
          score: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          file_name: string
          status?: 'pending' | 'graded'
          score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          file_name?: string
          status?: 'pending' | 'graded'
          score?: number | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
