insert into storage.buckets (id, name, public)
values ('submissions', 'submissions', false)
on conflict (id) do nothing;

create policy "Users can upload to their own submissions folder"
  on storage.objects for insert
  with check (bucket_id = 'submissions' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can view their own submission files"
  on storage.objects for select
  using (bucket_id = 'submissions' and auth.uid()::text = (storage.foldername(name))[1]);
