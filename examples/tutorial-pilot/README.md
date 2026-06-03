# Tutorial pilot

```yaml
pilot_id: digital-org/tutorial-pilot/2026-06-03
task_pool: local_fallback_board
side_effect_policy: local_files_only
public_actions: forbidden
runtime_actions: forbidden
linear_writes: forbidden_for_this_pilot
goal: prove_thread_first_orchestration_on_safe_synthetic_work
```

## run goal

Use real Codex threads to run one safe work item through:

```yaml
stages:
  - intake
  - source_of_truth_map
  - planning
  - decomposition
  - lease_assignment
  - execution
  - review
  - verification
  - watchdog_scan
  - retrospective_audit
  - reporting
  - archival
```

## source of truth

```yaml
task_state: .org/tasks.yaml
control_record: .org/control.md
source_facts: source/customer-notes.md
deliverable: deliverables/tutorial-release-note.md
evidence: evidence/
watchdog_digest: watchdog/watchdog-digest.md
audit_digest: audit/retrospective-audit.md
```

## acceptance

```yaml
acceptance:
  - worker_thread_creates_deliverable_from_source_facts
  - worker_writes_evidence_and_handoff
  - reviewer_thread_checks_scope_and_quality
  - verifier_thread_checks_claim_against_files
  - watchdog_detects_liveness_goal_progress_orphans_and_stale_leases
  - auditor_proposes_process_improvements
```
