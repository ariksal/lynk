-- ============================================================================
-- LYNK — database schema
-- Philosophy: people are valued for who they are, not for attention metrics.
-- There are deliberately NO follower counts, NO like counts, NO popularity
-- rankings anywhere in this schema. Connection is mutual; belonging is the goal.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- PROFILES  (one row per auth user)
-- ---------------------------------------------------------------------------
create table if not exists profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  username      text unique not null,
  display_name  text not null,
  bio           text,
  -- "Who they are" — the things LYNK matches on instead of clout.
  interests     text[] default '{}',
  values        text[] default '{}',
  location      text,
  avatar_url    text,
  created_at    timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- COMMUNITIES  (interest groups, volunteering orgs, social circles…)
-- ---------------------------------------------------------------------------
create table if not exists communities (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  description   text,
  -- e.g. 'hobby', 'volunteering', 'support', 'local', 'identity'
  category      text not null default 'hobby',
  -- 'group' = informal community; 'institution' = formal org / civic body
  kind          text not null default 'group',
  tags          text[] default '{}',
  location      text,
  cover_url     text,
  created_by    uuid references profiles (id) on delete set null,
  created_at    timestamptz default now()
);

-- Membership is the only "social graph" — and it is mutual belonging,
-- not a one-directional follow.
create table if not exists memberships (
  community_id  uuid references communities (id) on delete cascade,
  profile_id    uuid references profiles (id) on delete cascade,
  role          text not null default 'member', -- 'member' | 'organizer'
  joined_at     timestamptz default now(),
  primary key (community_id, profile_id)
);

-- ---------------------------------------------------------------------------
-- POSTS  (shared inside a community, not broadcast to a follower count)
-- ---------------------------------------------------------------------------
create table if not exists posts (
  id            uuid primary key default gen_random_uuid(),
  community_id  uuid references communities (id) on delete cascade,
  author_id     uuid references profiles (id) on delete cascade,
  body          text not null,
  created_at    timestamptz default now()
);

-- Comments encourage conversation, the substance of real relationships.
create table if not exists comments (
  id            uuid primary key default gen_random_uuid(),
  post_id       uuid references posts (id) on delete cascade,
  author_id     uuid references profiles (id) on delete cascade,
  body          text not null,
  created_at    timestamptz default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table profiles    enable row level security;
alter table communities enable row level security;
alter table memberships enable row level security;
alter table posts       enable row level security;
alter table comments    enable row level security;

-- Profiles: anyone signed in can discover people; you edit only your own.
create policy "profiles are viewable by authenticated users"
  on profiles for select to authenticated using (true);
create policy "users insert their own profile"
  on profiles for insert to authenticated with check (auth.uid() = id);
create policy "users update their own profile"
  on profiles for update to authenticated using (auth.uid() = id);

-- Communities: discoverable by all; any member can create one.
create policy "communities are viewable by authenticated users"
  on communities for select to authenticated using (true);
create policy "authenticated users create communities"
  on communities for insert to authenticated with check (auth.uid() = created_by);

-- Memberships: visible to all; you join/leave only as yourself.
create policy "memberships are viewable"
  on memberships for select to authenticated using (true);
create policy "users join as themselves"
  on memberships for insert to authenticated with check (auth.uid() = profile_id);
create policy "users leave as themselves"
  on memberships for delete to authenticated using (auth.uid() = profile_id);

-- Posts: visible to members of the community; authored as yourself.
create policy "posts viewable by community members"
  on posts for select to authenticated using (
    exists (
      select 1 from memberships m
      where m.community_id = posts.community_id and m.profile_id = auth.uid()
    )
  );
create policy "members post as themselves"
  on posts for insert to authenticated with check (
    auth.uid() = author_id and exists (
      select 1 from memberships m
      where m.community_id = posts.community_id and m.profile_id = auth.uid()
    )
  );

-- Comments: same visibility as the post's community.
create policy "comments viewable by community members"
  on comments for select to authenticated using (
    exists (
      select 1 from posts p
      join memberships m on m.community_id = p.community_id
      where p.id = comments.post_id and m.profile_id = auth.uid()
    )
  );
-- INSERT must verify community membership (mirrors the posts policy) — without
-- this, any authenticated user could inject comments into a community they
-- never joined.
create policy "members comment as themselves"
  on comments for insert to authenticated with check (
    auth.uid() = author_id and exists (
      select 1 from posts p
      join memberships m on m.community_id = p.community_id
      where p.id = comments.post_id and m.profile_id = auth.uid()
    )
  );

-- Authors can edit and delete their own posts and comments — so content can be
-- corrected or removed (and so report-driven takedown is possible, not theater).
create policy "authors edit their posts"
  on posts for update to authenticated using (auth.uid() = author_id);
create policy "authors delete their posts"
  on posts for delete to authenticated using (auth.uid() = author_id);
create policy "authors edit their comments"
  on comments for update to authenticated using (auth.uid() = author_id);
create policy "authors delete their comments"
  on comments for delete to authenticated using (auth.uid() = author_id);

-- ============================================================================
-- Auto-create a blank profile when a user signs up.
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    -- temporary unique username; user picks a real one during onboarding
    'user_' || substr(new.id::text, 1, 8),
    coalesce(new.raw_user_meta_data ->> 'display_name', 'New member')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
