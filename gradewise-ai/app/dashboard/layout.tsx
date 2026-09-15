import type { ReactNode } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { SignOutButton } from '@/components/auth/sign-out-button'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-end gap-2 border-b border-border/40 px-6">
          <ThemeToggle />
          <SignOutButton />
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
