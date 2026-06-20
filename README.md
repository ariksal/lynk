# LYNK

**Find your people — belonging without the vanity metrics.**

LYNK is a community platform built on one belief: you should be valued for **who you are**, not the attention you attract. No follower counts. No likes. No popularity rankings — ever.

Today LYNK is focused on **young people in the Mexican Jewish community** — helping them connect with their *tnuot* (youth movements), schools, and groups, and find friends, causes, and a place where they feel understood.

> A community platform, not a stage.

## Why LYNK is different
- **No vanity metrics — ever.** No followers, no likes, no popularity scores.
- **Belonging over broadcasting.** Built for real relationships and recurring, in-person connection — what actually turns strangers into friends.
- **Consent-first & safe by design.** Request-gated messaging, and — because it serves minors — guardian consent and community-membership verification.

## Features
LYNK is in active development. Current and planned capabilities:
- **Discover** communities by category — youth movements (*tnuot*), schools, and groups
- **Profiles** built from interests and values, not metrics
- **Groups & institutions** with posts, members, events, and programs
- **People & Friends** — interest-based suggestions and a personal circle
- **Messaging** — a consent-first inbox with request gates (the safety backbone)
- **Events & IRL meetups** — the recurring co-presence that builds friendship

See [`docs/PRODUCT-PLAN.md`](docs/PRODUCT-PLAN.md) for the full product vision and MVP definition.

## Tech stack
LYNK is a real web app — **Next.js + React + Supabase** (Postgres/auth) **+ Tailwind** — with a companion mobile app (Expo). Schema in [`supabase/schema.sql`](supabase/schema.sql).

## How this was built
I'm a self-taught, non-coder builder. I built LYNK by **directing AI tools** (Claude and others) to design, implement, test, and iterate — while I own the product vision, the anti-vanity-metrics design decisions, the data model, and the safety model (guardian consent, request-gated messaging). The AI writes the code; I decide what gets built, verify it, and ship it.

## Getting started
```bash
npm install
npm run dev
```
Open http://localhost:3000. LYNK runs in demo mode until you connect Supabase — copy `.env.example` to `.env.local`, add your Supabase keys, and apply `supabase/schema.sql`.

## Team & status
**Arik Salinas — Co-Founder & Builder.** LYNK is co-founded (it has other co-founders). 🚧 Early-stage, in active development.
