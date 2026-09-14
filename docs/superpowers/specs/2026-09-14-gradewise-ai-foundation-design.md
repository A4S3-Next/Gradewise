# GradeWise AI — Sub-Project 1: Foundation

## Context

GradeWise AI is a SaaS web app that gives students teacher-style, criterion-based
feedback on assignments (essays, reports, presentations, reflections, projects)
without ever rewriting the work for them. Students upload a file, pick a
curriculum (MYP, IB DP, GCSE, AP, CBSE, IGCSE, Custom) and subject, and receive
structured coaching feedback.

The full product is too large for one implementation cycle, so it is split into
five sub-projects, built in order:

1. **Foundation** (this spec) — scaffold, auth, base layout, dark mode
2. Core grading engine — upload, parsing, OpenAI-driven feedback generation, feedback UI
3. Dashboard & analytics — submission history, draft comparison, progress charts
4. Billing — Stripe subscriptions, free/premium plan gating
5. Polish pass — glassmorphism/animation refinement, mobile QA

There is no teacher mode — the product is student-only. External services
(Supabase, OpenAI, Stripe) will be wired with placeholder env vars; the user
will supply real API keys later before deployment.

## Goals

- Stand up a Next.js + TypeScript + Tailwind project at
  `/Users/a4/Code/gradewise-ai`, using pnpm, shadcn/ui, and Framer Motion.
- Implement Google sign-in/sign-out via Supabase Auth (placeholder keys).
- Create the initial Postgres schema: a `profiles` table auto-populated on
  signup via a database trigger.
- Build a premium-feeling marketing/landing page (Linear/Notion/Framer-style:
  rounded cards, soft shadows, glassmorphism, subtle motion).
- Build a protected `/dashboard` route shell (empty placeholder — populated in
  sub-project 3) with a persistent dark-mode toggle and responsive nav/sidebar.
- Add a global page-transition wrapper using Framer Motion.

## Non-goals

- No file upload, parsing, or AI grading logic (sub-project 2).
- No submission history, charts, or analytics (sub-project 3).
- No Stripe integration or plan gating (sub-project 4).
- No teacher-facing anything.
- No live deploy to Vercel — project should be Vercel-ready (correct build
  config, env var conventions) but deployment itself is out of scope until
  real API keys exist.

## Architecture

- **Framework**: Next.js 15, App Router, TypeScript (strict mode).
- **Styling**: Tailwind CSS + shadcn/ui component primitives.
- **Animation**: Framer Motion for page transitions and micro-interactions.
- **Auth/DB**: Supabase (`@supabase/supabase-js`, `@supabase/ssr`) — Google
  OAuth provider, Postgres database, row-level security enabled.
- **Package manager**: pnpm.
- **Deployment target**: Vercel (config present, not exercised in this
  sub-project).

## Project structure

```
gradewise-ai/
  app/
    (marketing)/
      page.tsx              # landing page
      layout.tsx
    login/
      page.tsx              # custom Google sign-in page
    dashboard/
      page.tsx              # protected placeholder shell
      layout.tsx
    layout.tsx               # root layout: theme provider, page transitions
    globals.css
  components/
    ui/                      # shadcn primitives (button, card, etc.)
    layout/
      navbar.tsx
      sidebar.tsx
      theme-toggle.tsx
      page-transition.tsx
    marketing/
      hero.tsx
      features.tsx
  lib/
    supabase/
      client.ts               # browser client
      server.ts                # server client (route handlers/middleware)
  types/
    supabase.ts                # generated/placeholder DB types
  supabase/
    migrations/
      0001_init.sql            # profiles table + trigger
  middleware.ts                 # protects /dashboard routes
  .env.local.example
```

## Database schema (this sub-project only)

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

Later sub-projects extend this schema (`submissions`, `feedback`,
`subscriptions`, etc.) in their own migrations — not part of this spec.

## Auth flow

1. User lands on `/` (marketing page), clicks "Sign in with Google."
2. Redirect to `/login`, custom-styled page with a "Continue with Google"
   button that calls `supabase.auth.signInWithOAuth({ provider: 'google' })`.
3. Supabase redirects back through an `/auth/callback` route handler that
   exchanges the code for a session and redirects to `/dashboard`.
4. `middleware.ts` checks session on requests to `/dashboard/**` and redirects
   unauthenticated users to `/login`.
5. Sign-out clears the Supabase session and redirects to `/`.

Since Supabase keys are placeholders, this flow will build and render
correctly but won't complete a real OAuth round-trip until the user supplies
real keys — this is expected and acceptable for this sub-project.

## UI/design requirements

- Rounded cards, soft shadows, subtle glassmorphism (backdrop-blur panels).
- Modern, restrained color palette with light and dark themes; dark mode
  toggle persisted via `localStorage` + `next-themes`.
- Typography: a clean sans-serif (e.g., Inter or Geist) with clear
  hierarchy for headings/body.
- Mobile-responsive nav (hamburger/sheet on small screens).
- Global page-transition wrapper (fade/slide) applied via a client component
  wrapping route content, using Framer Motion's `AnimatePresence`.

## Error handling

- Auth failures (OAuth error, missing session) redirect to `/login` with a
  toast/inline error message — no silent failures.
- Missing/placeholder Supabase env vars should not crash the app at build
  time; the app should build and render the marketing page even without
  real keys. Auth-dependent actions will simply fail gracefully with a
  clear message when attempted.

## Testing

- No AI or payment logic exists yet, so testing is limited to:
  - `pnpm build` and `pnpm typecheck` pass cleanly.
  - `pnpm lint` passes.
  - Manual verification via the `run` skill: landing page renders, dark
    mode toggles and persists, `/dashboard` redirects to `/login` when
    unauthenticated, layout is responsive at mobile/tablet/desktop widths.

## Open questions for later sub-projects (not blocking this one)

- Exact criteria/rubric sourcing per curriculum (sub-project 2).
- Free plan analysis limit and premium price point (sub-project 4).
- Draft comparison UX (sub-project 3).
