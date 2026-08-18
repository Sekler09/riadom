# Riadom — Agent Context

## The idea, in one paragraph

Riadom is an app where people meet new people by **joining real-world
activities together** — a pickup game, a hike, a study session, a concert
meetup — instead of swiping through profiles first. You discover activities
on a map, request or instantly join one, get approved, and meet offline.
There's no in-app chat: once approved, people can see each other's social
handles (Telegram, Instagram, WhatsApp, Discord — whatever they've listed)
and take the conversation to whichever platform they actually use. A
persistent Friends list keeps track of people you've met this way across
different activities.

**It should never feel like a dating app.** No swiping, no profile-photo
carousels, no DM-first browsing. The whole point is that the activity is the
reason people talk to each other, not a profile.

## Who it's for

Roughly 15–30 year olds. The product and design should feel fast, modern,
and social — but the trust and safety model has to be taken seriously given
the age range (see the product rules below and the Trust & Safety section of
the architecture doc).

## How it's built (short version)

A standalone, mobile-first web app (React + Vite frontend, NestJS backend,
Postgres, monorepo). Not a native app, not embedded in another
platform. Sign-in is Better Auth with Telegram OIDC today; Google/Apple OAuth
may follow.

Architecture follows [Bulletproof React](https://github.com/alan2207/bulletproof-react/)
conventions — feature-based modules, unidirectional imports, shared contracts.
See [docs/architecture.md](docs/architecture.md) for folder layout and import
rules. For structural work (new features, API modules, file placement), use
[`.agents/skills/riadom-architecture/SKILL.md`](.agents/skills/riadom-architecture/SKILL.md).

## The five things that make Riadom, Riadom

If a change would violate one of these, stop and flag it rather than
proceeding — these are the product's actual identity, not incidental
implementation details:

1. **Map-first discovery.** The map is the home screen, not a settings-menu
   feature.
2. **No in-app chat, ever** (unless explicitly told otherwise). Contact
   happens off-platform, after approval.
3. **Contact info is gated, not public.** A user's social handles are only
   visible to people they share an _approved_ activity with — never
   browsable up front.
4. **Location is masked until approval.** Exact coordinates are never shown
   to someone who hasn't been approved onto an activity.
5. **Trust & safety (reporting, blocking, verification) is core, not a later add-on.** Any new user-facing feature should be checked against it.
