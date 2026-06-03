## Project goal

## Current checkpoint

## Source of truth map

| object | source of truth | owner | stale behavior |
| --- | --- | --- | --- |

## Authority profile

```yaml
profile:
  public_actions:
  DB_mutation:
  prod_deploy:
  spend_money:
  uat_acceptance: user_only
```

## Thread registry

| role | thread id | title | project prefix | task/scope | lease | heartbeat | notes |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Capacity governor

```yaml
max_active_worker_threads:
increase_requires:
  - thread_registry
  - lease_ttl_scan
  - orphan_detection
  - digest_surface
```

## Watchdog state

Lease/registry/control divergence:

```yaml
last_scan_at:
divergences: []
reconciled_at:
```

## Active questions

## Current digest

## Next checkpoint
