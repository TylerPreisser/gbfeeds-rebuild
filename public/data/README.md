# public/data/

## harvests.json

This file is the canonical data source for the `<LiveCount>` component, which
renders the total antler-inches figure across the site (home page hero, why-gb-feeds
pillars, twenty-two-inch-rule article).

### Fields

| Field | Type | Description |
|---|---|---|
| `total_inches` | number | Running total of antler inches harvested using GB Feeds products. Canonical value = **7,500**. |
| `updated_at` | string | ISO 8601 date of the last manual update. |
| `pins` | array | Reserved for future geo-pin data (Phase 9+). Currently empty. |

### Canonical value

The seed value of **7,500** was chosen as the single authoritative figure for all
site copy. Prior to this rebuild the live site inconsistently displayed three
different numbers (5,000 / 7,500 / 10,000 inches in different sections). All
copy in the rebuilt site references `harvests.json` via `<LiveCount>` — this
file is the only place Greg needs to update the number going forward.

### How to update

1. Edit `total_inches` in this file to reflect the new verified harvest total.
2. Update `updated_at` to today's date.
3. Redeploy — `<LiveCount>` reads this file at build time.

### Phase 8+

Phase 9 may replace the static `total_inches` with a live KV counter updated
after each verified harvest submission. Until then, Greg updates this file
manually and a new deploy publishes the new count.
