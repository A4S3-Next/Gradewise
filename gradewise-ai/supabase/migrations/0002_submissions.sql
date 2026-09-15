create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  file_name text not null,
  status text not null default 'pending' check (status in ('pending', 'graded')),
  score numeric(4, 1),
  created_at timestamptz not null default now()
);

create index submissions_user_id_created_at_idx
  on public.submissions (user_id, created_at desc);

alter table public.submissions enable row level security;

create policy "Users can view their own submissions"
  on public.submissions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own submissions"
  on public.submissions for insert
  with check (auth.uid() = user_id);
