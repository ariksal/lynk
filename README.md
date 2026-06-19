# LYNK

**Reduce loneliness by helping people find their people.**

LYNK is a community platform built on one belief: *no one should miss out on friendship, community, or belonging simply because they didn't know where to start.* It connects you with people, groups, and causes that match your interests, values, and identity — and is deliberately designed to foster **belonging, not performance**.

> A community platform, not a stage.

## Why LYNK is different

Most social apps optimize for attention. LYNK refuses to.

- **No follower counts. No likes. No popularity rankings — ever.** You're valued for who you are, not the attention you attract.
- **Belonging over broadcasting.** The goal is real relationships and recurring, small-group, in-person connection — the thing that actually turns strangers into friends.
- **Consent-first & harassment-resistant by design.** Messaging uses request gates and limits so the experience stays safe.

### Three principles
1. **Authenticity over performance** — identity from interests and values, not metrics.
2. **Belonging over broadcasting** — find your people, not an audience.
3. **Real relationships over reach** — friends, a social circle, a cause, or simply a place you feel understood.

## Features

LYNK is an MVP in active development. Current and planned capabilities:

- **Profiles** built from interests and values (no vanity metrics)
- **Discover** — search and browse communities by category (hobby, volunteering, support, local, identity)
- **Groups** — informal communities with posts, members, and events
- **Institutions** — formal orgs, nonprofits, and civic groups with programs and volunteering shifts
- **People & Friends** — interest-based suggestions and a personal circle
- **Messaging** — a consent-first inbox with request gates (the safety backbone)
- **Events & IRL meetups** — the recurring co-presence that builds friendship

See [`docs/PRODUCT-PLAN.md`](docs/PRODUCT-PLAN.md) for the full product vision, feature catalog, and MVP definition.

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Supabase** (Postgres, auth) — schema in [`supabase/schema.sql`](supabase/schema.sql)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

LYNK runs in **demo mode** with seed communities until you connect Supabase. To go live, copy `.env.example` to `.env.local` and add your Supabase project credentials (Settings → API):

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Then apply the database schema in `supabase/schema.sql` to your Supabase project.

## Project structure

```
src/
  app/          # Next.js App Router pages
  components/   # UI components (nav, buttons, toast)
  lib/          # categories, demo data, helpers
supabase/       # Postgres schema
docs/           # product plan & MVP definition
```

## Status

🚧 **Work in progress.** The vision and core flows are in place; several features are still being built out and hardened. Built solo by **Arik Salinas** as an AI-assisted product-and-engineering project.

---

*LYNK — reduce loneliness by helping people find their people.*
