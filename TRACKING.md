# Neegma Analytics & Funnel Reference

This doc is the single source of truth for what we track across `tryneegma.com`
(main app, App + Pages Router) and `blog.tryneegma.com` (this repo). If you
add or rename an event, update this file, `lib/events.ts` in both repos, and
register any new parameters as Custom Dimensions in GA4 before the next
deploy. An unregistered parameter is silently dropped by GA4 reports.

The matching app-side helpers live at `src/lib/events.ts` in the neegma repo
and `lib/events.ts` in the blog repo. Both call into `lib/gtag.ts` which
auto-attaches a `site` parameter (`app` or `blog`) and a `timestamp`.

## 1. Architecture

- **One GA4 Measurement ID** powers both sites (`NEXT_PUBLIC_GOOGLE_ANALYTICS`).
- Both sites set `cookie_domain: '.tryneegma.com'` so the `_ga` client id is
  shared automatically across subdomains. No more action needed for same-root
  subdomains.
- The `linker` config also decorates outbound URLs with `_gl` as belt-and-
  suspenders, so if we ever move the app to a different root domain it keeps
  working.
- Every event ships with `site: 'app' | 'blog'`. Use this dimension to split
  reports per surface without spinning up a second data stream.
- GA4 User-ID is set via `gtag('config', GA_ID, { user_id })` from
  `AnalyticsIdentity.tsx` (main app) the moment Supabase resolves a user.

## 2. GA4 admin setup checklist

Do these once in the GA4 console, before relying on any funnel:

### 2.1 Cross-domain config

1. Admin → Data Streams → pick the Web stream → Configure tag settings
2. Configure your domains → add `tryneegma.com` and `blog.tryneegma.com`,
   match type "Exactly matches"
3. Verify: open the blog in an incognito tab, click any "Visit Neegma"
   button, confirm the destination URL includes `?_gl=` in the query string.
4. In Realtime, a single user should show up moving across both sites.

### 2.2 Custom Dimensions to register

Admin → Custom Definitions → Create custom dimension. Match the parameter
name **exactly** (GA is case-sensitive):

| Parameter           | Scope | Example values                                                                      | Why                                                                          |
| ------------------- | ----- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `site`              | Event | `app`, `blog`                                                                       | Split every report by surface                                                |
| `game_type`         | Event | `unscramble`, `chameleon`, `find-the-mole`, ...                                     | Per-game funnels                                                             |
| `user_role`         | Event | `host`, `guest_host`, `player`                                                      | Host vs player journeys                                                      |
| `plan_name`         | Event | `Free`, `Party`, `Enterprise`                                                       | Revenue by plan                                                              |
| `plan_type`         | Event | `free`, `party`, `enterprise`                                                       | Same as above, raw id                                                        |
| `billing_cycle`     | Event | `monthly`, `yearly`, `one_off`                                                      | Cycle splits                                                                 |
| `team_mode_enabled` | Event | `true`, `false`                                                                     | Feature usage                                                                |
| `player_count`      | Event | integer                                                                             | Game size                                                                    |
| `num_teams`         | Event | integer                                                                             | Team mode size                                                               |
| `total_rounds`      | Event | integer                                                                             | Round configuration                                                          |
| `custom_game`       | Event | `true`, `false`                                                                     | Custom vs Neegma dataset                                                     |
| `method`            | Event | `email`, `google`, `magic_link`, `qr`, `code`, `link`, `rejoin`, `existing_session` | Sign-up + join attribution                                                   |
| `source_page`       | Event | `/pricing`, `/`, `/post-slug`                                                       | Origin of any click                                                          |
| `source_post`       | Event | post slug                                                                           | Content attribution for blog clicks                                          |
| `cta_text`          | Event | label string                                                                        | Which CTA converted                                                          |
| `link_url`          | Event | URL                                                                                 | Click destination                                                            |
| `destination_url`   | Event | URL                                                                                 | Outbound destination                                                         |
| `depth_percentage`  | Event | `25`, `50`, `75`, `100`                                                             | Scroll depth bucket                                                          |
| `device_type`       | Event | `mobile`, `tablet`, `desktop`                                                       | Player device split                                                          |
| `is_guest`          | Event | `true`, `false`                                                                     | Guest vs signed-up host                                                      |
| `scope`             | Event | `round`, `session`, `final`                                                         | Leaderboard view scope                                                       |
| `currency`          | Event | `GBP`, `USD`, ...                                                                   | For revenue formatting                                                       |
| `value`             | Event | number                                                                              | Monetary value (also goes into GA4 revenue automatically when on `purchase`) |
| `transaction_id`    | Event | string                                                                              | Required by GA4 for `purchase`                                               |
| `user_id`           | User  | UUID                                                                                | Cross-session same-user stitching                                            |

### 2.3 Key Events (formerly Conversions)

Admin → Events → toggle "Mark as key event" on these:

- `sign_up`
- `purchase`
- `begin_checkout` (lets you build paid-funnel drop-off explorations)
- `create_game_session`
- `complete_game`
- `newsletter_signup` (once the blog newsletter ships)

### 2.4 User-ID

Admin → Data Streams → Configure tag settings → Activate User-ID. The main
app already calls `gtag('config', GA_ID, { user_id })` from
`AnalyticsIdentity.tsx` whenever the Supabase user changes.

### 2.5 DebugView while wiring up

For each new event, open Admin → DebugView, then visit the page with
`?gtm_debug=1` or use the GA Debugger Chrome extension. Confirm the event
appears with the expected parameters before declaring the feature "tracked".

## 3. Event Catalog

Every event automatically carries `site` and `timestamp` (added by
`lib/gtag.ts`). For events fired from the main app via `useLogEvent`, the
hook also enriches with `user_id`, `user_email`, `user_name` when a Supabase
user is resolved.

### 3.1 Awareness

| Event                | Surface | Fires when                                                                                           | Parameters                                                            |
| -------------------- | ------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `page_view`          | both    | Every route load (gtag config on initial, `AppRouterPageview` / `routeChangeComplete` on client nav) | `page_path`                                                           |
| `blog_view`          | blog    | Post page mounts (`PostViewTracker`)                                                                 | `post_title`, `post_slug`, `author`, `category`, `tags`, `word_count` |
| `scroll_depth`       | blog    | User crosses 25/50/75/100 percent of a post                                                          | `depth_percentage`, `page_path`, `post_slug`                          |
| `use_case_view`      | app     | Use-case landing page mounts                                                                         | `page_name`                                                           |
| `view_pricing`       | app     | Pricing page mounts                                                                                  | `currency`, `source_page`                                             |
| `help_article_view`  | app     | Help article opens                                                                                   | `article_title`, `slug`                                               |
| `help_center_search` | app     | Help center search submitted                                                                         | `search_term`, `results_count`                                        |

### 3.2 Lead-gen (cross-domain bridge)

| Event               | Surface | Fires when                                                            | Parameters                                                   |
| ------------------- | ------- | --------------------------------------------------------------------- | ------------------------------------------------------------ |
| `click_cta`         | both    | Any wrapped link/button click via `TrackedLink`                       | `cta_text`, `link_url`, `source_page`, `source_post?`        |
| `outbound_click`    | blog    | `TrackedLink` click where the destination is not `blog.tryneegma.com` | `destination_url`, `source_page`, `cta_text`, `source_post?` |
| `share_post`        | blog    | (Reserved) Social share button on a post                              | `platform`, `post_title`, `post_slug`                        |
| `newsletter_signup` | blog    | (Reserved) Newsletter form submit                                     | `location`, `source_page`                                    |

> `outbound_click` is the **critical bridge event** for blog → app
> attribution. Every link from the blog to `tryneegma.com` fires it. Pair
> with `page_view` on the app side, filtered by referrer, when building the
> awareness funnel.

### 3.3 Activation (auth)

| Event        | Surface | Fires when               | Parameters                                                                       |
| ------------ | ------- | ------------------------ | -------------------------------------------------------------------------------- |
| `sign_up`    | app     | Supabase signup succeeds | `method` (`email`, `google`, `magic_link`), `email`                              |
| `login`      | app     | Supabase login succeeds  | `method` (`email`, `google`, `magic_link`, `existing_session`), `email`          |
| `auth_error` | app     | Any auth flow throws     | `type` (`signup`, `login`, `magic_link`, `social`, `forgot_password`), `message` |

### 3.4 Host / game

| Event                    | Surface | Fires when                                                             | Parameters                                                                                                                   |
| ------------------------ | ------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `create_game_session`    | app     | Host creates a neeg-host session (`useFormSubmission`)                 | `title`, `is_guest`, `user_role` (`host`, `guest_host`)                                                                      |
| `join_game`              | app     | Player successfully joins via the channel (`ChannelJoin`)              | `neeg_host_id`, `method` (`qr`, `code`, `link`, `rejoin`), `device_type`                                                     |
| `start_game`             | app     | `useCreateNeegHostAttempt` resolves in `NeegHostGameSelect`            | `game_type`, `neeg_host_id`, `player_count`, `team_mode_enabled`, `num_teams?`, `total_rounds?`, `custom_game`, `attempt_id` |
| `complete_game`          | app     | `NeegHostCompletion` mounts                                            | `game_type`, `neeg_host_id`, `player_count`, `mode`, `rounds_played`                                                         |
| `play_again`             | app     | "Play Again" clicked in completion screen                              | `game_type`, `neeg_host_id`                                                                                                  |
| `view_leaderboard`       | app     | Leaderboard opened in session or at completion                         | `game_type?`, `neeg_host_id?`, `scope` (`round`, `session`, `final`)                                                         |
| `game_session_abandoned` | app     | (Reserved) Fire from `beforeunload` if attempt started but no complete | `game_type`, `reason`, `neeg_host_id`                                                                                        |

### 3.5 Monetization

| Event                | Surface | Fires when                                                                                                                                                                   | Parameters                                                                                  |
| -------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `select_plan`        | app     | User clicks Upgrade / Choose / Get on a pricing card                                                                                                                         | `plan_name`, `plan_type`, `billing_cycle`, `price`, `currency`, `source_page`               |
| `begin_checkout`     | app     | `ScheduleContent` resolves the Lemon Squeezy URL, just before `window.location.href = ...`                                                                                   | `plan_name`, `plan_type`, `value`, `currency`, `billing_cycle`, `starts_at`, `is_scheduled` |
| `add_payment_info`   | app     | (Reserved) Cannot fire client-side because Lemon Squeezy is hosted. If you want to capture this, run a webhook → GA4 Measurement Protocol call on the `order_created` event. |                                                                                             |
| `purchase`           | app     | `pages/payment.tsx` verifies the subscription is `active` or `scheduled`                                                                                                     | `transaction_id`, `value`, `currency`, `plan_name`, `plan_type`, `billing_cycle`            |
| `checkout_abandoned` | app     | User lands on `/payment?status=cancel` or `?status=failed`                                                                                                                   | `plan_name`, `last_step`                                                                    |

> **Note on `purchase` accuracy.** The amount and currency come from the
> latest subscription event payload (Lemon Squeezy). If `events[0]` is
> missing, we fall back to a hard-coded £5 for the Party Pass. To make this
> bullet-proof, send purchase events server-side via GA4 Measurement
> Protocol from the Lemon Squeezy webhook (`order_created`). That avoids
> client drop-off (closed tab, blocked tag) and gives you the true amount.

## 4. Funnels to build in GA4

Open **Explore → Funnel exploration** → New. Use these step sequences
exactly. Where a step is `(any of: X, Y)`, GA4 lets you OR multiple events
into one step.

### 4.1 Awareness → activation (the cross-domain funnel)

Goal: how many readers convert into active hosts.

1. `blog_view`
2. `outbound_click` where `destination_url` contains `tryneegma.com`
3. `sign_up`
4. `create_game_session`
5. `start_game`
6. `complete_game`

Settings: open funnel (so a user can drop in mid-funnel and still count),
session-scoped, 30-day lookback. Break down by `site` to confirm step 1 is
all `blog` and steps 3+ are all `app`.

### 4.2 Host first-time activation

Goal: of new sign-ups, how many actually finish a game.

1. `sign_up`
2. `create_game_session`
3. `start_game`
4. `complete_game`

Closed funnel, breakdown by `method` (which auth method correlates with
activation?) and by `game_type` (which first game keeps people engaged?).

### 4.3 Player activation

Goal: of players invited, how many complete a round.

1. `join_game`
2. `start_game` (host-fired, but happens in the same session id when same browser, otherwise filter by `neeg_host_id`)
3. `complete_game`

Closed funnel. Breakdown by `method` (`qr` vs `link` vs `code`) and
`device_type` (mobile usually dominates). If you want player-side
activation independent of the host, filter by `user_role = player` once
that dimension is populated on the channel side.

### 4.4 Monetization (paid plan funnel)

Goal: pricing visitor → paying customer.

1. `view_pricing`
2. `select_plan` where `plan_type = party`
3. `begin_checkout`
4. `purchase`

Breakdown by `plan_name` and `billing_cycle`. Compare to step 4 ÷ step 1
for a top-of-funnel paid conversion rate. Drop-off between step 3 and step
4 is where Lemon Squeezy's hosted checkout is bleeding, which we cannot
instrument client-side. Add `checkout_abandoned` as a step-4 alternate to
see explicit cancels.

### 4.5 Content engagement to subscriber

Goal: identify which posts drive conversions (once newsletter ships).

1. `blog_view`
2. `scroll_depth` where `depth_percentage >= 75`
3. `newsletter_signup`

Breakdown by `post_slug`. Posts where the 2 → 3 conversion is high are the
ones to amplify. Run alongside funnel 4.1 to see if newsletter readers
also become hosts.

### 4.6 Re-engagement (use Cohort exploration, not Funnel)

Cohort definition: include users where `complete_game` fired. Return
criterion: `create_game_session` within 7 / 14 / 28 days. This tells you
host retention, which is the long-term health metric.

### 4.7 Drop-off triage funnel

When numbers look off, build this open funnel as a quick diagnostic:

1. `page_view` (any)
2. `sign_up` OR `login`
3. `create_game_session`
4. `start_game`
5. `complete_game`
6. `view_pricing`
7. `purchase`

It's not meant for clean conversion math, it's a "where do users disappear
in the journey" map. Open funnel, no breakdown, 7-day window.

## 5. Working with the helpers

### 5.1 Firing a tracked event

```ts
// Main app: src/lib/events.ts
import { trackStartGame } from "@/lib/events";

trackStartGame({
    game_type: "unscramble",
    neeg_host_id: host.id,
    player_count: 6,
    team_mode_enabled: false,
    total_rounds: 10,
    custom_game: false,
    attempt_id: attempt.id,
});
```

```ts
// Blog: lib/events.ts
import { trackBlogView } from "@/lib/events";

trackBlogView({
    post_title: "Title",
    post_slug: "title",
    tags: "tag1,tag2",
});
```

### 5.2 Wrapping a link so it auto-tracks (blog)

```tsx
import TrackedLink from "@/components/TrackedLink";

<TrackedLink
    href="https://tryneegma.com/pricing"
    ctaText="Pricing CTA in conclusion"
    sourcePage="/post-slug"
    sourcePost="post-slug"
>
    See pricing
</TrackedLink>;
```

`TrackedLink` automatically fires `click_cta` and adds a second
`outbound_click` when the destination leaves the blog. Use it for every
link on the blog that we care about.

### 5.3 Adding a new event

1. Add the constant to `Events` in `lib/events.ts` (both repos).
2. Export a `trackXxx` helper with a typed param object.
3. Add the parameters to the table in section 3 here.
4. Register any new parameter names as Custom Dimensions in GA4 (section 2.2).
5. Wire the helper into the actual code path.
6. Verify in GA4 DebugView before merging.

## 6. Cross-domain verification checklist

When you suspect cross-domain stitching is broken:

1. Incognito tab → load `blog.tryneegma.com`.
2. DevTools → Application → Cookies → `.tryneegma.com` → confirm `_ga`
   exists and is scoped to `.tryneegma.com` (not the subdomain).
3. Click any link to `tryneegma.com`. The destination URL should have
   `?_gl=` appended (the GA4 linker decoration).
4. On the destination page, DevTools cookies → `_ga` value should be the
   same as it was on the blog.
5. GA4 Realtime → "Users in the last 30 minutes" should show **one** user,
   not two, after the cross-domain navigation.

If step 4 fails, the linker isn't running. Check that `Analytics.tsx` in
the blog and `app/layout.tsx` in the app both include the same `linker.domains`
list, and that the GA Measurement ID env var resolves on both sites.

## 7. Files you'll touch when adding tracking

Blog:

- `lib/gtag.ts` — base helpers
- `lib/events.ts` — typed event functions
- `components/Analytics.tsx` — GA script + linker config
- `components/TrackedLink.tsx` — wrap any link/CTA
- `components/ScrollDepthTracker.tsx`, `components/PostViewTracker.tsx` — page-level trackers

Main app:

- `src/lib/gtag.ts` — base helpers
- `src/lib/events.ts` — typed event functions
- `src/hooks/useLogEvent.ts` — enriches events with the Supabase user
- `src/components/analytics/AnalyticsIdentity.tsx` — sets GA4 User-ID on user change
- `src/components/analytics/AppRouterPageview.tsx` — App Router page_view tracking
- `pages/_app.tsx` — Pages Router page_view tracking + identity mount
- `app/layout.tsx` — GA script + linker config
