# LYNK — Product Plan & MVP Definition
*Generated via multi-agent research workflow · 2026-06-19*

## 1. Vision Recap
LYNK exists to **reduce loneliness** by helping people find their people — friends, hobby circles, volunteering, civic orgs — and feel understood. Every feature passes one test: does it help someone *belong*, or just *perform*? **No follower counts, no likes, no popularity rankings** — ever. Center of gravity: **recurring, small-group, in-person co-presence** (the thing research says actually turns strangers into friends), wrapped in a **consent-first, harassment-resistant** safety model.

## 2. Feature Catalog by Area
Legend: `[HAVE]` in web app · `[REF]` in mobile reference · `[NEW]` proposed addition.

### Identity & Profile
- `[HAVE]` Profile (username, bio, location, interests, values) — identity from interests+values, not metrics
- `[HAVE]*` Edit profile — **currently broken (see corrections)**
- `[HAVE]` Deterministic avatar tint from name
- `[NEW]` "Who I am" prompt answers ("a perfect Sunday is…") — personality over looks
- `[NEW]` Light "real human" badge (no legal ID)
- `[NEW]` Belonging context ("member of 3 circles") framed as participation, never a leaderboard

### Onboarding
- `[HAVE]` Email/password signup + display name
- `[HAVE]` Profile setup (interests, values, location)
- `[REF]` Splash + 3-slide mission carousel
- `[NEW]` Pick-your-rooms: newcomer dropped into 1–2 matching circles immediately (arrival = belonging)
- `[NEW]` Guaranteed first reciprocated interaction (a greeter replies)
- `[NEW]` Guidelines-before-posting gate

### Discovery & Matching
- `[HAVE]` Discover browser (search, Groups/Institutions toggle)
- `[HAVE]` Categories (hobby/volunteering/support/local/identity)
- `[HAVE]` Interest-based people suggestions
- `[NEW]` "Why you matched" rationale on every suggestion
- `[NEW]` Hyper-local geo-filtering (neighborhood/language)
- `[NEW]` Recurring-group surfacing (cadence = the friendship engine)

### Groups (informal communities)
- `[HAVE]` Community detail page · `[HAVE]*` Join/leave · `[HAVE]*` Creation form · `[HAVE]*` Posts · `[HAVE]*` Comments (schema only)
- `[REF]` Group tabs (Posts/Events/Photos) · `[REF]` Member cap ("group full")
- `[NEW]` Functional host/greeter/moderator roles (contribution, not status)
- `[NEW]` Dunbar-aware sub-circles (~40) so belonging doesn't dilute
- `[NEW]` Between-events momentum (group chat + photo recaps)

### Institutions (formal orgs / nonprofits / civic)
- `[HAVE]` Groups vs Institutions distinction (`kind`)
- `[REF]` Institution detail + programs · `[REF]` Request-to-join + admin review
- `[NEW]` Cause-area browsing (skill & schedule filters)
- `[NEW]` Volunteering shift posting · `[NEW]` Verified-staff moderation

### People & Friends
- `[HAVE]` Your circle · `[HAVE]` Connection requests
- `[NEW]` Weekly "people you'd click with" digest (quality over infinite scroll)
- `[NEW]` Nurture-existing-connections nudges

### Messaging (the safety backbone)
- `[HAVE]` Inbox · Requests tab · 2-msg limit · Accept/silent-ignore · Chat UI
- `[HAVE]*` Persistence — **demo-only, not real (see corrections)**
- `[NEW]` Either party can message (friendship, not dating dynamics)
- `[NEW]` AI icebreaker openers (v1, not MVP)
- `[NEW]` Quarantine/blur unwanted explicit content

### Events & IRL Meetups
- `[REF]` Event discovery + RSVP · Events within groups
- `[NEW]` Recurring series with "regulars" · Small-group formats · Capacity+waitlist · "Who's coming" · RSVP reminders · In-person icebreaker prompts

### Safety & Trust
- `[HAVE]` No popularity metrics (named principle) · Privacy-first messaging
- `[REF]` Block & report (6-reason menu)
- `[NEW]` One-tap block/mute everywhere · Abuse quarantine · Report that follows up · Community moderation · Privacy-preserving verification

### Notifications
- `[REF]` Typed notifications (All/Unread) · Inline Accept/Ignore · Granular prefs
- `[NEW]` Gentle re-engagement (events/people, never streaks/guilt) · Greeter alert for newcomers

### Belonging Mechanics
- `[NEW]` Warm welcome + buddy/greeter · Low-stakes "new here" spaces · Recurring question rituals · Group memory · Multiple room types · Private "this helped me" appreciation (no counts)

### Settings / Account
- `[REF]` Profile visibility · Messages-allowed toggle · Deactivate/delete
- `[HAVE]` Session management
- `[NEW]` Data export/revoke · "We measure connections, never time-on-app" framing

## 3. MoSCoW
- **Must:** real auth + route guard · profile create/edit (real) · live Discover + join/leave · posts + comments UI · **persisted+enforced** messaging · block/report · no-metrics everywhere
- **Should:** events + RSVP · welcome ritual + greeter · icebreakers · geo-filter · moderation tooling · notification prefs
- **Could:** small-group IRL formats · audio/video rooms · volunteering shifts · question rituals · verification badge · sub-circles
- **Won't (now):** document/biometric verification · paid deposits · ANY like/follower/reach metric · native mobile

## 4. Differentiators
1. **The scoreboard is gone — on purpose, and named.** No likes/followers/rankings in UI or schema.
2. **Consent is the architecture, not a setting.** Requests + 2-msg cap + truly silent ignore.
3. **Optimize for completed connections, not time-on-app.** Success = friend made / meetup attended.
4. **Built for recurring, small, in-person co-presence.**
5. **Matching on who you are, with the reason shown.**

---

# 5. ⚠️ Critical Corrections (Adversarial Review)
The review found **real bugs and unsafe gaps** in the current build. These reshape the MVP — fix/include before anything fancy.

### Real bugs in current code
1. **2-message cap is BACKWARDS** — `ChatRoom.tsx`: `atLimit = !pending && sentCount >= LIMIT` caps *accepted friends*, not unsolicited strangers. Invert it; the cap must throttle a stranger *before* the recipient replies.
2. **Messaging is cosmetic** — 100% client `useState` over demo data; the cap resets on refresh, "silent ignore" stores nothing. The named safety backbone *doesn't actually exist*.
3. **Block / report / mute don't exist** — zero code or schema. Shipping stranger-messaging without them is a safety failure, not a "Should."
4. **Comments RLS hole** — `comments` INSERT only checks `author_id`, **not membership**; any user can inject comments into communities they never joined. Mirror the posts policy.
5. **Profile "Edit" silently wipes data** — Edit → blank `/onboarding`; `saveProfile` overwrites interests/values with empty. Build a real pre-filled edit form.
6. **Demo-mode = prod security trap** — missing Supabase env ⇒ any-password login + every route open. Gate demo behind non-production.
7. **No UPDATE/DELETE policies** — nothing can be edited, deleted, or moderated; report-without-takedown is theater.

### Table-stakes the MVP was MISSING (vulnerable-population product)
- **18+ age gate** at signup (cheap, no biometrics).
- **Coarse city-level location only** (never address) + "your location is visible to X" disclosure — stranger-messaging + findable location is a stalking vector.
- **Crisis-resource surface** reachable from report/profile (users in acute distress *will* appear).
- **Real content-removal path** so reporting isn't theater.

### Thesis leaks already live (contradict the mission)
- Visible **reply counts** ("11 replies") are a popularity signal → show as a link / last-repliers, not a number.
- **Unread-count + online green-dot** create presence/notification pressure → make presence opt-in.
- Quantified **"regular at 2 meetups"** is a status score → use non-counted phrasing.
- The **dopaminemax amber palette** maximizes engagement against the anti-attention thesis (`globals.css.bak` restores calm blue).

### Corrected MVP scope
**Cut:** ML matching (a "you both like X" string suffices) · events/RSVP (→ v1.1) · greeter notifications.
**Keep + make real:** auth + route guard · real profile edit · persisted join/leave + posts/comments with **correct RLS** · **DB-enforced** consent messaging (2-cap + silent ignore in RLS, not useState) · block/report with real takedown · age gate + coarse location + crisis resources.

**Build FIRST:** the persisted, **database-enforced** messaging + safety layer (and fix the inverted cap). It's what LYNK stakes its identity on, what lets a lonely user reach out safely, and the area most dangerously fake today.
