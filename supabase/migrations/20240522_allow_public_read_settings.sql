-- Enable RLS (if not already enabled)
alter table settings enable row level security;

-- Drop existing policy if it exists (to avoid errors)
drop policy if exists "Allow public read access" on settings;

-- Create policy to allow ANYONE (anon + authenticated) to read settings
create policy "Allow public read access"
on settings for select
to anon, authenticated
using (true);
