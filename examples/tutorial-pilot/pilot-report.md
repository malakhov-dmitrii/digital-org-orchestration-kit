# Tutorial pilot report

```yaml
pilot_id: digital-org/tutorial-pilot/2026-06-03
project_prefix: DOP-TUT
task_pool: examples/tutorial-pilot/.org/tasks.yaml
control_record: examples/tutorial-pilot/.org/control.md
authority_profile: local_files_only
linear_writes: none
public_actions: none
runtime_actions: none
```

## Goal

Prove the portable digital-org kit on a safe synthetic project using real Codex role threads, task leases, evidence, watchdog scan, verification, and retrospective audit.

## Threads

| role | task | thread id | title | lease |
| --- | --- | --- | --- | --- |
| worker | TUT-001 | thread-tut-worker-001 | DOP-TUT TUT-001 Worker release note | released |
| watchdog | TUT-004 | thread-tut-watchdog-004 | DOP-TUT TUT-004 Watchdog scan | released |
| reviewer | TUT-002 | thread-tut-reviewer-002 | DOP-TUT TUT-002 Reviewer release note | released |
| verifier | TUT-003 | thread-tut-verifier-003 | DOP-TUT TUT-003 Verifier pilot claims | released |
| auditor | TUT-005 | thread-tut-auditor-005 | DOP-TUT TUT-005 Auditor retrospective | released |

## Artifacts

```yaml
source: source/customer-notes.md
worker_output: deliverables/tutorial-release-note.md
worker_evidence: evidence/TUT-001-worker-evidence.md
review: evidence/TUT-002-review.md
verification: evidence/TUT-003-verification.md
watchdog_digest: watchdog/watchdog-digest.md
audit: audit/retrospective-audit.md
```

## Result

```yaml
TUT-001: Done
TUT-002: Done
TUT-003: Done
TUT-004: Done
TUT-005: Done
leases: released
verdict: pass_for_local_synthetic_thread_first_pilot
```

The pilot proved the local thread-first path: a worker produced a grounded artifact, a reviewer checked scope and evidence, a verifier checked the full claim, a watchdog detected liveness/control issues, and an auditor produced process improvements.

## Lessons applied to the kit

```yaml
applied_improvements:
  - role_thread_titles_are_required
  - source_thread_id_is_parent_provenance_only
  - current_thread_id_is_the_role_thread
  - active_holder_thread_id_must_equal_current_thread_id
  - role_threads_must_not_manage_parent_thread_metadata
  - watchdog_checks_task_registry_control_divergence
  - degraded_context_tools_get_bounded_local_fallback
  - role_threads_use_bounded_stop_policy_before_handoff
```

## Known gaps

```yaml
known_gaps:
  linear_project_update_backend: degraded_or_ui_only
  production_runtime_policy: not_exercised
  public_actions: not_exercised
  memory_hygiene_cleanup_policy: still_open
```
