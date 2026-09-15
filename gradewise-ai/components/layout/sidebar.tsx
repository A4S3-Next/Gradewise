import Link from 'next/link'
import { LayoutDashboard } from 'lucide-react'

const NAV_ITEMS = [{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }]

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <Link
        href="/"
        className="flex h-16 items-center px-6 text-base font-semibold tracking-tight text-sidebar-foreground"
      >
        GradeWise AI
      </Link>
      <nav className="flex flex-col gap-0.5 px-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/65 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
