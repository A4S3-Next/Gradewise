# GradeWise AI — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the GradeWise AI project scaffold — Next.js/TS/Tailwind app, Google auth via Supabase, base layout with dark mode, premium-styled marketing page, and a protected dashboard shell — with all external services wired to placeholder env vars.

**Architecture:** A single Next.js 15 App Router project (`gradewise-ai/`, living inside this repo alongside the other project folders, no nested `.git`) using shadcn/ui + Tailwind for components, Framer Motion for transitions, and `@supabase/ssr` for auth (browser client, server client, and middleware-based route protection). Vitest + React Testing Library cover pure logic and interactive components; layout/scaffold correctness is verified via `pnpm build`/`typecheck`/`lint` and manual browser checks.

**Tech Stack:** Next.js 15 (App Router), TypeScript (strict), Tailwind CSS, shadcn/ui, Framer Motion, next-themes, `@supabase/supabase-js` + `@supabase/ssr`, pnpm, Vitest, React Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-14-gradewise-ai-foundation-design.md`

## Global Constraints

- Project lives at `/Users/a4/Code/gradewise-ai`, tracked inside the existing `/Users/a4/Code` git repo — do not run `git init` inside it.
- No teacher mode — student-only product.
- No upload/parsing/AI-grading logic, no dashboard data/charts, no Stripe — those belong to later sub-projects.
- All Supabase env vars are placeholders (`.env.local.example` only, no real `.env.local`); the app must build and render the marketing page even when auth calls fail, per the spec's Error Handling section.
- TypeScript strict mode; pnpm as the package manager throughout.

---

### Task 1: Scaffold the Next.js project

**Files:**
- Create: `gradewise-ai/` (entire generated project)

**Interfaces:**
- Produces: a working Next.js 15 + TS + Tailwind + ESLint app at `gradewise-ai/`, buildable with `pnpm build`.

- [ ] **Step 1: Scaffold with create-next-app**

Run from `/Users/a4/Code`:

```bash
pnpm create next-app@latest gradewise-ai \
  --typescript --tailwind --eslint --app --no-src-dir \
  --import-alias "@/*" --use-pnpm
```

- [ ] **Step 2: Verify no nested git repo was created**

```bash
ls -la gradewise-ai/.git 2>&1
```

Expected: `No such file or directory` (create-next-app should skip `git init` since `/Users/a4/Code` is already a repo — confirm it didn't happen anyway).

- [ ] **Step 3: Verify the app builds and runs**

```bash
cd gradewise-ai && pnpm build
```

Expected: build succeeds with the default Next.js starter page.

- [ ] **Step 4: Commit**

```bash
cd /Users/a4/Code
git add gradewise-ai
git commit -m "Scaffold GradeWise AI Next.js project"
```

---

### Task 2: Add Vitest testing infrastructure

**Files:**
- Create: `gradewise-ai/vitest.config.ts`
- Create: `gradewise-ai/vitest.setup.ts`
- Modify: `gradewise-ai/package.json` (scripts)

**Interfaces:**
- Produces: `pnpm test` (runs Vitest once) and `pnpm test:watch`, with `@/*` path alias resolution and jsdom environment, available to every later task's tests.

- [ ] **Step 1: Install test dependencies**

```bash
cd gradewise-ai
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Write vitest config**

`gradewise-ai/vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

`gradewise-ai/vitest.setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 3: Add scripts to package.json**

Add to the `"scripts"` object in `gradewise-ai/package.json`:

```json
"test": "vitest run",
"test:watch": "vitest",
"typecheck": "tsc --noEmit"
```

- [ ] **Step 4: Write a smoke test to verify the harness works**

Create `gradewise-ai/vitest.smoke.test.ts`:

```ts
import { describe, it, expect } from 'vitest'

describe('vitest harness', () => {
  it('runs a basic assertion', () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 5: Run it and verify it passes**

```bash
pnpm test
```

Expected: 1 test passes.

- [ ] **Step 6: Delete the smoke test (its only job was to prove the harness works)**

```bash
rm vitest.smoke.test.ts
```

- [ ] **Step 7: Commit**

```bash
cd /Users/a4/Code
git add gradewise-ai/vitest.config.ts gradewise-ai/vitest.setup.ts gradewise-ai/package.json gradewise-ai/pnpm-lock.yaml
git commit -m "Add Vitest testing infrastructure to GradeWise AI"
```

---

### Task 3: Install shadcn/ui, Framer Motion, and next-themes

**Files:**
- Create: `gradewise-ai/components.json` (shadcn config)
- Create: `gradewise-ai/lib/utils.ts` (shadcn `cn` helper)
- Create: `gradewise-ai/components/ui/button.tsx`, `card.tsx`, `sheet.tsx` (shadcn primitives)
- Modify: `gradewise-ai/app/globals.css`, `gradewise-ai/tailwind.config.ts` (written by shadcn init)

**Interfaces:**
- Produces: `Button`, `Card`/`CardHeader`/`CardTitle`/`CardContent`, `Sheet`/`SheetTrigger`/`SheetContent` components under `@/components/ui/*`, consumed by every UI task below.

- [ ] **Step 1: Init shadcn/ui**

```bash
cd gradewise-ai
pnpm dlx shadcn@latest init
```

Accept the defaults offered for a Next.js + Tailwind project (New York style, Slate base color, CSS variables enabled).

- [ ] **Step 2: Add the primitives this sub-project needs**

```bash
pnpm dlx shadcn@latest add button card sheet
```

- [ ] **Step 3: Install Framer Motion and next-themes**

```bash
pnpm add framer-motion next-themes
```

- [ ] **Step 4: Verify the app still builds**

```bash
pnpm build
```

Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
cd /Users/a4/Code
git add gradewise-ai
git commit -m "Install shadcn/ui, Framer Motion, and next-themes"
```

---

### Task 4: Theme provider and dark-mode toggle

**Files:**
- Create: `gradewise-ai/components/layout/theme-provider.tsx`
- Create: `gradewise-ai/components/layout/theme-toggle.tsx`
- Test: `gradewise-ai/components/layout/theme-toggle.test.tsx`

**Interfaces:**
- Consumes: `Button` from `@/components/ui/button`, `useTheme`/`ThemeProvider` from `next-themes`.
- Produces: `ThemeProvider` (wraps the app in root layout, Task 5) and `ThemeToggle` (a button, consumed by `Navbar` in Task 7 and the dashboard header in Task 14).

- [ ] **Step 1: Write the failing test for ThemeToggle**

`gradewise-ai/components/layout/theme-toggle.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const setTheme = vi.fn()

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme }),
}))

import { ThemeToggle } from '@/components/layout/theme-toggle'

describe('ThemeToggle', () => {
  it('toggles from light to dark when clicked', async () => {
    render(<ThemeToggle />)
    await userEvent.click(screen.getByRole('button', { name: /toggle theme/i }))
    expect(setTheme).toHaveBeenCalledWith('dark')
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

```bash
pnpm test theme-toggle
```

Expected: FAIL — `@/components/layout/theme-toggle` does not exist.

- [ ] **Step 3: Implement ThemeProvider and ThemeToggle**

`gradewise-ai/components/layout/theme-provider.tsx`:

```tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ComponentProps } from 'react'

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

`gradewise-ai/components/layout/theme-toggle.tsx`:

```tsx
'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-5 w-5 dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
    </Button>
  )
}
```

- [ ] **Step 4: Run the test again and verify it passes**

```bash
pnpm test theme-toggle
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/a4/Code
git add gradewise-ai/components/layout/theme-provider.tsx gradewise-ai/components/layout/theme-toggle.tsx gradewise-ai/components/layout/theme-toggle.test.tsx
git commit -m "Add theme provider and dark-mode toggle"
```

---

### Task 5: Page transition wrapper

**Files:**
- Create: `gradewise-ai/components/layout/page-transition.tsx`
- Test: `gradewise-ai/components/layout/page-transition.test.tsx`

**Interfaces:**
- Consumes: `usePathname` from `next/navigation`, `AnimatePresence`/`motion` from `framer-motion`.
- Produces: `PageTransition({ children })`, consumed by the root layout (Task 6).

- [ ] **Step 1: Write the failing test**

`gradewise-ai/components/layout/page-transition.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

import { PageTransition } from '@/components/layout/page-transition'

describe('PageTransition', () => {
  it('renders its children', () => {
    render(
      <PageTransition>
        <p>content</p>
      </PageTransition>
    )
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

```bash
pnpm test page-transition
```

Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement PageTransition**

`gradewise-ai/components/layout/page-transition.tsx`:

```tsx
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

- [ ] **Step 4: Run the test again and verify it passes**

```bash
pnpm test page-transition
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/a4/Code
git add gradewise-ai/components/layout/page-transition.tsx gradewise-ai/components/layout/page-transition.test.tsx
git commit -m "Add page transition wrapper"
```

---

### Task 6: Root layout wiring (ThemeProvider + PageTransition)

**Files:**
- Modify: `gradewise-ai/app/layout.tsx`

**Interfaces:**
- Consumes: `ThemeProvider` (Task 4), `PageTransition` (Task 5).
- Produces: every route in the app is now wrapped in theme + transition context.

Note: `app/layout.tsx` renders `<html>`/`<body>` and cannot be unit-tested with React Testing Library (RTL can't mount document-level tags). This task is verified via build and the final manual browser check (Task 16), not an automated test.

- [ ] **Step 1: Update the root layout**

`gradewise-ai/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { PageTransition } from '@/components/layout/page-transition'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'GradeWise AI',
  description: 'Teacher-style feedback that coaches students to improve their own work.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify the build succeeds**

```bash
cd gradewise-ai && pnpm build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
cd /Users/a4/Code
git add gradewise-ai/app/layout.tsx
git commit -m "Wire theme provider and page transitions into root layout"
```

---

### Task 7: Navbar

**Files:**
- Create: `gradewise-ai/components/layout/navbar.tsx`
- Test: `gradewise-ai/components/layout/navbar.test.tsx`

**Interfaces:**
- Consumes: `ThemeToggle` (Task 4), `Button` and `Sheet`/`SheetTrigger`/`SheetContent` (Task 3).
- Produces: `Navbar`, consumed by the marketing layout (Task 12).

- [ ] **Step 1: Write the failing test**

`gradewise-ai/components/layout/navbar.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('@/components/layout/theme-toggle', () => ({
  ThemeToggle: () => <button aria-label="Toggle theme">theme</button>,
}))

import { Navbar } from '@/components/layout/navbar'

describe('Navbar', () => {
  it('renders the brand link pointing home', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /gradewise ai/i })).toHaveAttribute('href', '/')
  })

  it('opens the mobile menu and shows a sign in link', async () => {
    render(<Navbar />)
    await userEvent.click(screen.getByRole('button', { name: /open menu/i }))
    const signInLinks = await screen.findAllByRole('link', { name: /sign in/i })
    expect(signInLinks.length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

```bash
pnpm test navbar
```

Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement Navbar**

`gradewise-ai/components/layout/navbar.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/layout/theme-toggle'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          GradeWise AI
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <Button asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-8 flex flex-col gap-4">
                <Button asChild onClick={() => setOpen(false)}>
                  <Link href="/login">Sign in</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 4: Run the test again and verify it passes**

```bash
pnpm test navbar
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/a4/Code
git add gradewise-ai/components/layout/navbar.tsx gradewise-ai/components/layout/navbar.test.tsx
git commit -m "Add responsive Navbar with mobile menu"
```

---

### Task 8: Sidebar

**Files:**
- Create: `gradewise-ai/components/layout/sidebar.tsx`
- Test: `gradewise-ai/components/layout/sidebar.test.tsx`

**Interfaces:**
- Produces: `Sidebar`, consumed by the dashboard layout (Task 14).

- [ ] **Step 1: Write the failing test**

`gradewise-ai/components/layout/sidebar.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Sidebar } from '@/components/layout/sidebar'

describe('Sidebar', () => {
  it('renders a link to the dashboard', () => {
    render(<Sidebar />)
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard')
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

```bash
pnpm test sidebar
```

Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement Sidebar**

`gradewise-ai/components/layout/sidebar.tsx`:

```tsx
import Link from 'next/link'
import { LayoutDashboard } from 'lucide-react'

const NAV_ITEMS = [{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }]

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-border/40 bg-background/60 backdrop-blur-lg md:block">
      <nav className="flex flex-col gap-1 p-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
```

- [ ] **Step 4: Run the test again and verify it passes**

```bash
pnpm test sidebar
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/a4/Code
git add gradewise-ai/components/layout/sidebar.tsx gradewise-ai/components/layout/sidebar.test.tsx
git commit -m "Add dashboard sidebar"
```

---

### Task 9: Supabase client helpers and database types

**Files:**
- Create: `gradewise-ai/types/supabase.ts`
- Create: `gradewise-ai/lib/supabase/client.ts`
- Create: `gradewise-ai/lib/supabase/server.ts`
- Create: `gradewise-ai/.env.local.example`
- Test: `gradewise-ai/lib/supabase/client.test.ts`
- Test: `gradewise-ai/lib/supabase/server.test.ts`

**Interfaces:**
- Produces: `createClient()` (browser, sync) from `@/lib/supabase/client`, and `createClient()` (server, async) from `@/lib/supabase/server`. Both consumed by Tasks 10–14. `Database` type consumed by both client factories.

- [ ] **Step 1: Install Supabase packages**

```bash
cd gradewise-ai
pnpm add @supabase/supabase-js @supabase/ssr
```

- [ ] **Step 2: Write the database types**

`gradewise-ai/types/supabase.ts`:

```ts
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
      }
    }
  }
}
```

- [ ] **Step 3: Write the failing test for the browser client**

`gradewise-ai/lib/supabase/client.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(() => ({ auth: {} })),
}))

import { createClient } from '@/lib/supabase/client'
import { createBrowserClient } from '@supabase/ssr'

describe('createClient (browser)', () => {
  it('creates a browser client without throwing, even with placeholder env vars', () => {
    const client = createClient()
    expect(client).toBeDefined()
    expect(createBrowserClient).toHaveBeenCalled()
  })
})
```

- [ ] **Step 4: Write the failing test for the server client**

`gradewise-ai/lib/supabase/server.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => ({
    getAll: () => [],
    set: vi.fn(),
  })),
}))

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(() => ({ auth: {} })),
}))

import { createClient } from '@/lib/supabase/server'
import { createServerClient } from '@supabase/ssr'

describe('createClient (server)', () => {
  it('creates a server client without throwing, even with placeholder env vars', async () => {
    const client = await createClient()
    expect(client).toBeDefined()
    expect(createServerClient).toHaveBeenCalled()
  })
})
```

- [ ] **Step 5: Run both and verify they fail**

```bash
pnpm test lib/supabase
```

Expected: FAIL — modules do not exist.

- [ ] **Step 6: Implement the browser client**

`gradewise-ai/lib/supabase/client.ts`:

```ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  )
}
```

- [ ] **Step 7: Implement the server client**

`gradewise-ai/lib/supabase/server.ts`:

```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from a Server Component; safe to ignore since
            // middleware (Task 11) refreshes the session on navigation.
          }
        },
      },
    }
  )
}
```

- [ ] **Step 8: Create the placeholder env file**

`gradewise-ai/.env.local.example`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

- [ ] **Step 9: Run the tests again and verify they pass**

```bash
pnpm test lib/supabase
```

Expected: PASS.

- [ ] **Step 10: Commit**

```bash
cd /Users/a4/Code
git add gradewise-ai/types/supabase.ts gradewise-ai/lib/supabase gradewise-ai/.env.local.example gradewise-ai/package.json gradewise-ai/pnpm-lock.yaml
git commit -m "Add Supabase browser/server clients and database types"
```

---

### Task 10: Auth callback route handler

**Files:**
- Create: `gradewise-ai/app/auth/callback/route.ts`
- Test: `gradewise-ai/app/auth/callback/route.test.ts`

**Interfaces:**
- Consumes: `createClient` (server) from `@/lib/supabase/server`.
- Produces: `GET` handler at `/auth/callback`, the redirect target configured in `GoogleSignInButton` (Task 12).

- [ ] **Step 1: Write the failing test**

`gradewise-ai/app/auth/callback/route.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'

const exchangeCodeForSession = vi.fn()

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(async () => ({
    auth: { exchangeCodeForSession },
  })),
}))

import { GET } from '@/app/auth/callback/route'

describe('GET /auth/callback', () => {
  it('redirects to /dashboard when the code exchange succeeds', async () => {
    exchangeCodeForSession.mockResolvedValueOnce({ error: null })

    const response = await GET(new Request('http://localhost/auth/callback?code=abc123'))

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/dashboard')
  })

  it('redirects to /login with an error when the code exchange fails', async () => {
    exchangeCodeForSession.mockResolvedValueOnce({ error: new Error('invalid code') })

    const response = await GET(new Request('http://localhost/auth/callback?code=bad'))

    expect(response.headers.get('location')).toBe('http://localhost/login?error=auth_failed')
  })

  it('redirects to /login with an error when no code is present', async () => {
    const response = await GET(new Request('http://localhost/auth/callback'))

    expect(response.headers.get('location')).toBe('http://localhost/login?error=auth_failed')
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

```bash
pnpm test auth/callback
```

Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement the route handler**

`gradewise-ai/app/auth/callback/route.ts`:

```ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
```

- [ ] **Step 4: Run the test again and verify it passes**

```bash
pnpm test auth/callback
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/a4/Code
git add gradewise-ai/app/auth/callback
git commit -m "Add auth callback route handler"
```

---

### Task 11: Route protection (middleware)

**Files:**
- Create: `gradewise-ai/lib/auth/protected-routes.ts`
- Create: `gradewise-ai/middleware.ts`
- Test: `gradewise-ai/lib/auth/protected-routes.test.ts`

**Interfaces:**
- Produces: `isProtectedRoute(pathname: string): boolean`, used by `middleware.ts`.
- `middleware.ts` has no exported function consumed elsewhere — Next.js invokes `middleware()` directly by convention.

Note: `middleware.ts` itself (which talks to Supabase and Next's request/response objects) is verified manually in Task 16, not by a unit test — `isProtectedRoute` is the pure, testable piece of its logic.

- [ ] **Step 1: Write the failing test**

`gradewise-ai/lib/auth/protected-routes.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { isProtectedRoute } from '@/lib/auth/protected-routes'

describe('isProtectedRoute', () => {
  it('returns true for dashboard paths', () => {
    expect(isProtectedRoute('/dashboard')).toBe(true)
    expect(isProtectedRoute('/dashboard/settings')).toBe(true)
  })

  it('returns false for non-dashboard paths', () => {
    expect(isProtectedRoute('/')).toBe(false)
    expect(isProtectedRoute('/login')).toBe(false)
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

```bash
pnpm test protected-routes
```

Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement isProtectedRoute**

`gradewise-ai/lib/auth/protected-routes.ts`:

```ts
export function isProtectedRoute(pathname: string): boolean {
  return pathname.startsWith('/dashboard')
}
```

- [ ] **Step 4: Run the test again and verify it passes**

```bash
pnpm test protected-routes
```

Expected: PASS.

- [ ] **Step 5: Implement middleware**

`gradewise-ai/middleware.ts`. The Supabase call is wrapped in `try/catch` so a placeholder/invalid `NEXT_PUBLIC_SUPABASE_URL` degrades to "treat as unauthenticated" instead of crashing the request, per the spec's error-handling requirement:

```ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { isProtectedRoute } from '@/lib/auth/protected-routes'

export async function middleware(request: NextRequest) {
  if (!isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  let response = NextResponse.next({ request })
  let user = null

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {
    user = null
  }

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
```

- [ ] **Step 6: Commit**

```bash
cd /Users/a4/Code
git add gradewise-ai/lib/auth gradewise-ai/middleware.ts
git commit -m "Protect /dashboard routes with auth middleware"
```

---

### Task 12: Login page and Google sign-in

**Files:**
- Create: `gradewise-ai/components/auth/google-signin-button.tsx`
- Create: `gradewise-ai/app/login/page.tsx`
- Test: `gradewise-ai/components/auth/google-signin-button.test.tsx`
- Test: `gradewise-ai/app/login/page.test.tsx`

**Interfaces:**
- Consumes: `createClient` (browser) from `@/lib/supabase/client`, `Button`/`Card` from `@/components/ui/*`.
- Produces: `/login` route, the redirect target for unauthenticated users from middleware (Task 11) and from `Navbar`/mobile menu (Task 7).

- [ ] **Step 1: Write the failing test for GoogleSignInButton**

`gradewise-ai/components/auth/google-signin-button.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const signInWithOAuth = vi.fn()

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({ auth: { signInWithOAuth } }),
}))

import { GoogleSignInButton } from '@/components/auth/google-signin-button'

describe('GoogleSignInButton', () => {
  it('calls signInWithOAuth with the google provider on click', async () => {
    render(<GoogleSignInButton />)
    await userEvent.click(screen.getByRole('button', { name: /continue with google/i }))
    expect(signInWithOAuth).toHaveBeenCalledWith(expect.objectContaining({ provider: 'google' }))
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

```bash
pnpm test google-signin-button
```

Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement GoogleSignInButton**

`gradewise-ai/components/auth/google-signin-button.tsx`:

```tsx
'use client'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export function GoogleSignInButton() {
  const handleSignIn = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
    } catch (error) {
      console.error('Google sign-in failed', error)
    }
  }

  return (
    <Button onClick={handleSignIn} className="w-full" size="lg">
      Continue with Google
    </Button>
  )
}
```

- [ ] **Step 4: Run the test again and verify it passes**

```bash
pnpm test google-signin-button
```

Expected: PASS.

- [ ] **Step 5: Write the failing test for the login page**

`gradewise-ai/app/login/page.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/components/auth/google-signin-button', () => ({
  GoogleSignInButton: () => <button>Continue with Google</button>,
}))

import LoginPage from '@/app/login/page'

describe('LoginPage', () => {
  it('renders the sign-in card', () => {
    render(<LoginPage />)
    expect(screen.getByRole('heading', { name: /sign in to gradewise ai/i })).toBeInTheDocument()
    expect(screen.getByText(/continue with google/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run it and verify it fails**

```bash
pnpm test app/login
```

Expected: FAIL — module does not exist.

- [ ] **Step 7: Implement the login page**

`gradewise-ai/app/login/page.tsx`:

```tsx
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GoogleSignInButton } from '@/components/auth/google-signin-button'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm border-border/60 bg-background/60 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle>Sign in to GradeWise AI</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <GoogleSignInButton />
          <Link href="/" className="text-center text-sm text-muted-foreground hover:underline">
            Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
```

- [ ] **Step 8: Run the test again and verify it passes**

```bash
pnpm test app/login
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
cd /Users/a4/Code
git add gradewise-ai/components/auth/google-signin-button.tsx gradewise-ai/components/auth/google-signin-button.test.tsx gradewise-ai/app/login
git commit -m "Add Google sign-in button and login page"
```

---

### Task 13: Sign-out and dashboard shell

**Files:**
- Create: `gradewise-ai/components/auth/sign-out-button.tsx`
- Create: `gradewise-ai/app/dashboard/layout.tsx`
- Create: `gradewise-ai/app/dashboard/page.tsx`
- Test: `gradewise-ai/components/auth/sign-out-button.test.tsx`
- Test: `gradewise-ai/app/dashboard/page.test.tsx`

**Interfaces:**
- Consumes: `createClient` (browser), `Sidebar` (Task 8), `ThemeToggle` (Task 4).
- Produces: the protected `/dashboard` shell that Task 11's middleware guards and later sub-projects populate with real data.

- [ ] **Step 1: Write the failing test for SignOutButton**

`gradewise-ai/components/auth/sign-out-button.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const signOut = vi.fn()
const push = vi.fn()

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({ auth: { signOut } }),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}))

import { SignOutButton } from '@/components/auth/sign-out-button'

describe('SignOutButton', () => {
  it('signs out and redirects home on click', async () => {
    render(<SignOutButton />)
    await userEvent.click(screen.getByRole('button', { name: /sign out/i }))
    expect(signOut).toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith('/')
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

```bash
pnpm test sign-out-button
```

Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement SignOutButton**

`gradewise-ai/components/auth/sign-out-button.tsx`:

```tsx
'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Sign-out failed', error)
    } finally {
      router.push('/')
    }
  }

  return (
    <Button variant="ghost" onClick={handleSignOut}>
      Sign out
    </Button>
  )
}
```

- [ ] **Step 4: Run the test again and verify it passes**

```bash
pnpm test sign-out-button
```

Expected: PASS.

- [ ] **Step 5: Write the failing test for the dashboard page**

`gradewise-ai/app/dashboard/page.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import DashboardPage from '@/app/dashboard/page'

describe('DashboardPage', () => {
  it('renders a placeholder heading', () => {
    render(<DashboardPage />)
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run it and verify it fails**

```bash
pnpm test app/dashboard/page
```

Expected: FAIL — module does not exist.

- [ ] **Step 7: Implement the dashboard layout and page**

`gradewise-ai/app/dashboard/layout.tsx`:

```tsx
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
```

`gradewise-ai/app/dashboard/page.tsx`:

```tsx
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Your submissions, progress, and deadlines will appear here soon.
      </p>
    </div>
  )
}
```

- [ ] **Step 8: Run the tests again and verify they pass**

```bash
pnpm test dashboard
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
cd /Users/a4/Code
git add gradewise-ai/components/auth/sign-out-button.tsx gradewise-ai/components/auth/sign-out-button.test.tsx gradewise-ai/app/dashboard
git commit -m "Add sign-out button and protected dashboard shell"
```

---

### Task 14: Marketing page (Hero + Features)

**Files:**
- Create: `gradewise-ai/components/marketing/hero.tsx`
- Create: `gradewise-ai/components/marketing/features.tsx`
- Create: `gradewise-ai/app/(marketing)/layout.tsx`
- Create: `gradewise-ai/app/(marketing)/page.tsx`
- Modify: delete `gradewise-ai/app/page.tsx` (the default create-next-app starter page; superseded by the marketing route group)
- Test: `gradewise-ai/components/marketing/hero.test.tsx`
- Test: `gradewise-ai/components/marketing/features.test.tsx`

**Interfaces:**
- Consumes: `Button` (Task 3), `Card`/`CardHeader`/`CardTitle`/`CardContent` (Task 3), `Navbar` (Task 7).
- Produces: the `/` route.

- [ ] **Step 1: Write the failing test for Hero**

`gradewise-ai/components/marketing/hero.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Hero } from '@/components/marketing/hero'

describe('Hero', () => {
  it('renders the primary headline and a call-to-action link', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', { name: /feedback that makes you a better student/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /get started free/i })).toHaveAttribute(
      'href',
      '/login'
    )
  })
})
```

- [ ] **Step 2: Write the failing test for Features**

`gradewise-ai/components/marketing/features.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Features } from '@/components/marketing/features'

describe('Features', () => {
  it('renders all three feature cards', () => {
    render(<Features />)
    expect(screen.getByText(/criterion-by-criterion scoring/i)).toBeInTheDocument()
    expect(screen.getByText(/coaching, not rewriting/i)).toBeInTheDocument()
    expect(screen.getByText(/track your progress/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run both and verify they fail**

```bash
pnpm test components/marketing
```

Expected: FAIL — modules do not exist.

- [ ] **Step 4: Implement Hero**

`gradewise-ai/components/marketing/hero.tsx`:

```tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-24 text-center">
      <span className="rounded-full border border-border/60 bg-background/60 px-4 py-1 text-sm text-muted-foreground backdrop-blur">
        Teacher-style feedback, not AI-written answers
      </span>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
        Feedback that makes you a better student
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        Upload your essay, report, or project and get detailed, criterion-by-criterion
        feedback from GradeWise AI — coaching you to improve your own work, never
        rewriting it for you.
      </p>
      <div className="flex gap-3">
        <Button asChild size="lg">
          <Link href="/login">Get started free</Link>
        </Button>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Implement Features**

`gradewise-ai/components/marketing/features.tsx`:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const FEATURES = [
  {
    title: 'Criterion-by-criterion scoring',
    description:
      'Feedback graded against official assessment criteria for MYP, IB DP, GCSE, AP, CBSE, IGCSE, or your own custom rubric.',
  },
  {
    title: 'Coaching, not rewriting',
    description:
      'GradeWise AI never rewrites your assignment. It shows you what to fix and why, so you improve the work yourself.',
  },
  {
    title: 'Track your progress',
    description:
      'See your improvement over time with a dashboard of past submissions, scores, and completed suggestions.',
  },
]

export function Features() {
  return (
    <section className="mx-auto grid max-w-5xl gap-6 px-4 py-16 sm:grid-cols-3">
      {FEATURES.map((feature) => (
        <Card key={feature.title} className="border-border/60 bg-background/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {feature.description}
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
```

- [ ] **Step 6: Run the tests again and verify they pass**

```bash
pnpm test components/marketing
```

Expected: PASS.

- [ ] **Step 7: Wire the marketing route group and remove the starter page**

`gradewise-ai/app/(marketing)/layout.tsx`:

```tsx
import type { ReactNode } from 'react'
import { Navbar } from '@/components/layout/navbar'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
```

`gradewise-ai/app/(marketing)/page.tsx`:

```tsx
import { Hero } from '@/components/marketing/hero'
import { Features } from '@/components/marketing/features'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
    </>
  )
}
```

Delete the default starter page so the route group's `page.tsx` serves `/` instead:

```bash
rm gradewise-ai/app/page.tsx
```

- [ ] **Step 8: Verify the app builds**

```bash
cd gradewise-ai && pnpm build
```

Expected: build succeeds; `/` is served by the `(marketing)` route group.

- [ ] **Step 9: Commit**

```bash
cd /Users/a4/Code
git add gradewise-ai/components/marketing gradewise-ai/app/\(marketing\) gradewise-ai/app/page.tsx
git commit -m "Add marketing landing page"
```

---

### Task 15: Supabase database migration

**Files:**
- Create: `gradewise-ai/supabase/migrations/0001_init.sql`

**Interfaces:**
- Produces: the `profiles` table schema matching `Database['public']['Tables']['profiles']` (Task 9). Applied later via the Supabase SQL editor or CLI once the user has a real project — not exercised by any automated test in this sub-project, since there is no live database to run it against yet.

- [ ] **Step 1: Write the migration**

`gradewise-ai/supabase/migrations/0001_init.sql`:

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  plan text not null default 'free' check (plan in ('free', 'premium')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger: create a profile row automatically when a new auth user signs up
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name',
          new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a4/Code
git add gradewise-ai/supabase
git commit -m "Add initial Supabase migration for profiles table"
```

---

### Task 16: Final verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full automated check suite**

```bash
cd gradewise-ai
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

Expected: all four succeed with no errors.

- [ ] **Step 2: Manually verify in the browser, using the `run` skill to launch the dev server**

Check each of the following:
- `/` renders the landing page (Navbar, Hero, Features) with glassmorphism styling.
- Clicking the dark-mode toggle switches themes and the choice persists across a page reload.
- Resizing to a mobile width collapses the Navbar into the hamburger menu, and the menu opens/closes correctly.
- Visiting `/dashboard` while logged out redirects to `/login` (verifying the middleware degrades gracefully with placeholder Supabase env vars, per Task 11, rather than throwing a 500 error).
- `/login` renders the sign-in card with a working "Continue with Google" button (it will not complete OAuth with placeholder keys — clicking it should not crash the page).
- Page transitions animate smoothly when navigating between `/`, `/login`.

- [ ] **Step 3: Fix any issues found, committing each fix separately**

If manual verification surfaces a bug, fix it, re-run the relevant automated tests, and commit with a message describing the fix.

- [ ] **Step 4: Final commit confirming the sub-project is complete**

```bash
cd /Users/a4/Code
git add -A gradewise-ai
git commit -m "Complete GradeWise AI foundation sub-project"
```
