# Post-pilot system audit

```yaml
audit_id: digital-org/tutorial-pilot/post-pilot-system-audit/2026-06-03
scope: digital-org-orchestration-kit tutorial pilot and package controls
source_files:
  - examples/tutorial-pilot/.org/tasks.yaml
  - examples/tutorial-pilot/.org/control.md
  - examples/tutorial-pilot/pilot-report.md
  - examples/tutorial-pilot/audit/retrospective-audit.md
  - docs/control-loops-heartbeats-watchdogs-v0.1.md
  - templates/watchdog-digest.md
  - templates/control-issue.md
  - skills/digital-org-orchestrator/SKILL.md
  - skills/digital-org-auditor/SKILL.md
```

## Verdict

The local synthetic pilot is complete and useful as a package smoke test. It proves the thread-first workflow with real Codex role threads, released leases, role thread titles, review, verification, watchdog scan, and retrospective audit.

Always-on operations status: not exercised in this pilot. Evidence: `examples/tutorial-pilot/pilot-report.md` lists `production_runtime_policy`, `public_actions`, and `linear_project_update_backend` under known gaps. A local scan of `<codex-home>/automations` found no matching digital-org automation for this package and found two unrelated active ExampleProject heartbeats.

## Confirmed controls

```yaml
pilot_completion:
  tasks_done: 5
  missing_artifacts: 0
  role_thread_titles_recorded: 5
  title_registry_control_mismatch: 0
validation:
  validate_kit: pass
  validate_linear_reconciliation_fixture: pass
```

## Heartbeat status

```yaml
specified_in_package:
  worker_heartbeat: true
  orchestrator_heartbeat: true
  watchdog_heartbeat: true
  stale_lease_detection: true
  orphan_detection: true
  lease_registry_control_divergence: true
real_automation_for_this_project:
  status: not_found
  checked_surface: <codex-home>/automations
unrelated_active_heartbeats_found:
  - ExampleProject EX-49 observation retry
  - ExampleProject neighboring agent watch
```

## Findings

```yaml
findings:
  - id: AUD-001
    severity: high
    title: Heartbeat policy exists, but regular heartbeat automation is not installed for this package.
    evidence: docs/control-loops-heartbeats-watchdogs-v0.1.md defines worker, orchestrator, and watchdog heartbeat lanes; <codex-home>/automations has no matching digital-org automation.
    recommendation: Add a project activation step that creates or proposes a Codex heartbeat automation for active digital-org projects.
  - id: AUD-002
    severity: medium
    title: Watchdog template records divergence, but does not require degraded-tool or bounded-stop sections.
    evidence: templates/watchdog-digest.md has Lease/registry/control divergence, but no explicit bounded stop or degraded tools fields before the post-pilot audit.
    recommendation: Keep degraded tools and bounded-stop fields in watchdog digest output, not only in the long control-loop spec.
  - id: AUD-003
    severity: medium
    title: Context-mode remains a real operational dependency risk.
    evidence: context-mode batch execution failed again with a better-sqlite3 Node ABI mismatch.
    recommendation: Upgrade context-mode or keep degraded fallback as a required audit field until it is fixed.
  - id: AUD-004
    severity: medium
    title: GBrain full embedding sync is blocked by embedding quota.
    evidence: GITOM-SYNC.md records no_embed sync and full embedding sync blocked by OpenAI embedding quota.
    recommendation: Treat GBrain sync as metadata-only until embedding quota is restored or another embedder is configured.
  - id: AUD-005
    severity: low
    title: Pilot is local-only and does not prove Linear project update, runtime, or public-action behavior.
    evidence: examples/tutorial-pilot/pilot-report.md records linear_project_update_backend, production_runtime_policy, public_actions, and memory_hygiene_cleanup_policy as known gaps.
    recommendation: Run a second controlled pilot for Linear adapter and project updates before claiming always-on multi-project operations.
```

## Recommended next controls

```yaml
next_controls:
  - create_or_propose_project_heartbeat_automation_on_activation
  - add_watchdog_digest_fields_for_degraded_tools_and_bounded_stop
  - add_validator_for_real_automation_presence_when_project_status_is_active
  - add_memory_hygiene_cleanup_policy
  - run_linear_adapter_pilot_without_touching_unrelated_runtime_pools
```
