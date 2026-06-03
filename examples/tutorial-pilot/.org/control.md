# Tutorial pilot control

```yaml
project: digital-org-tutorial-pilot
goal: prove_thread_first_orchestration_on_safe_synthetic_work
task_pool: .org/tasks.yaml
authority_profile: local_files_only
public_actions: forbidden
runtime_actions: forbidden
linear_writes: forbidden_for_this_pilot
capacity_governor:
  max_active_worker_threads: 1
  increase_requires:
    - thread_registry
    - lease_ttl_scan
    - orphan_detection
    - digest_surface
kill_switch:
  state: inactive
```

## thread registry

| role | thread id | title | task | lease | heartbeat | notes |
| --- | --- | --- | --- | --- | --- | --- |
| worker | thread-tut-worker-001 | DOP-TUT TUT-001 Worker release note | TUT-001 | released |  | handed off ready for review |
| watchdog | thread-tut-watchdog-004 | DOP-TUT TUT-004 Watchdog scan | TUT-004 | released |  | watchdog digest complete |
| reviewer | thread-tut-reviewer-002 | DOP-TUT TUT-002 Reviewer release note | TUT-002 | released |  | review pass ready for verification |
| verifier | thread-tut-verifier-003 | DOP-TUT TUT-003 Verifier pilot claims | TUT-003 | released |  | verification complete |
| auditor | thread-tut-auditor-005 | DOP-TUT TUT-005 Auditor retrospective | TUT-005 | released |  | retrospective audit complete |

## current digest

TUT-001 leased to worker thread `thread-tut-worker-001`.
TUT-004 leased to watchdog thread `thread-tut-watchdog-004`.
TUT-001 lease reconciled as released by orchestrator at `2026-06-03T10:54:03Z`.
TUT-002 leased to reviewer thread `thread-tut-reviewer-002`.
TUT-004 lease reconciled as released by orchestrator at `2026-06-03T10:54:03Z`.
TUT-002 lease reconciled as released by orchestrator from task board handoff.
TUT-003 leased to verifier thread `thread-tut-verifier-003`.
TUT-005 leased to auditor thread `thread-tut-auditor-005`.
TUT-003 and TUT-005 leases reconciled as released by orchestrator after verifier/auditor handoff.
TUT-001 marked Done after review and verification pass.
All role thread titles use `DOP-TUT <task> <role> <scope>`.
