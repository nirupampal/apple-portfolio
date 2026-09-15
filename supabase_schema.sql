-- ==========================================================
-- SUPABASE SCHEMA FOR NIRUPAM PAL PORTFOLIO
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ukhlvlgrhvftfynommtj/sql/new
-- ==========================================================

-- 1. Contact Messages Table
create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text default 'unread' check (status in ('unread', 'read')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.contact_messages enable row level security;

-- Policies for contact_messages
create policy "Allow public to submit contact messages"
  on public.contact_messages
  for insert
  with check (true);

create policy "Allow read access to contact messages"
  on public.contact_messages
  for select
  using (true);

create policy "Allow update access to contact messages"
  on public.contact_messages
  for update
  using (true);

create policy "Allow delete access to contact messages"
  on public.contact_messages
  for delete
  using (true);

-- Enable Realtime for contact_messages
alter publication supabase_realtime add table public.contact_messages;

-- 2. Site Content Table (Portfolio CMS)
create table if not exists public.site_content (
  key text primary key,
  content jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.site_content enable row level security;

-- Policies for site_content
create policy "Allow public to read site content"
  on public.site_content
  for select
  using (true);

create policy "Allow all updates to site content"
  on public.site_content
  for all
  using (true);

-- Enable Realtime for site_content
alter publication supabase_realtime add table public.site_content;

-- 3. Storage Bucket for Portfolio Uploads
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;

create policy "Public Access to portfolio media"
  on storage.objects for select
  using (bucket_id = 'portfolio');

create policy "Authenticated users can upload portfolio media"
  on storage.objects for insert
  with check (bucket_id = 'portfolio');
