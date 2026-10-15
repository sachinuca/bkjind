-- ==============================================================================
-- SUPABASE DATABASE SETUP FOR GITHUB PAGES WEBSITE
-- Copy and run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Table for durable user responses & feedback
create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  category text default 'General Inquiry',
  rating int default 5,
  message text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.responses enable row level security;

-- Allow anonymous visitors to read and submit responses
drop policy if exists "Allow public to insert responses" on public.responses;
create policy "Allow public to insert responses" 
  on public.responses for insert 
  to anon 
  with check (true);

drop policy if exists "Allow public to read responses" on public.responses;
create policy "Allow public to read responses" 
  on public.responses for select 
  to anon 
  using (true);


-- 2. Table for dynamic media (Audio & Video)
create table if not exists public.media_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('audio', 'video')),
  title text not null,
  media_url text not null,
  description text,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.media_items enable row level security;

-- Allow public read & management
drop policy if exists "Allow public to read media" on public.media_items;
create policy "Allow public to read media" 
  on public.media_items for select 
  to anon 
  using (true);

drop policy if exists "Allow public to insert media" on public.media_items;
create policy "Allow public to insert media" 
  on public.media_items for insert 
  to anon 
  with check (true);

drop policy if exists "Allow public to update media" on public.media_items;
create policy "Allow public to update media" 
  on public.media_items for update 
  to anon 
  using (true);

drop policy if exists "Allow public to delete media" on public.media_items;
create policy "Allow public to delete media" 
  on public.media_items for delete 
  to anon 
  using (true);


-- 3. Insert Starter Demo Media (Audio & Video)
insert into public.media_items (type, title, media_url, description)
values
  ('audio', 'Ambient Chill Track (Demo)', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 'Streaming audio hosted in the cloud, dynamically playable on your static site.'),
  ('video', 'Open Source Tech Showcase', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Dynamic video showcase fetched directly from your Supabase table.')
on conflict do nothing;
