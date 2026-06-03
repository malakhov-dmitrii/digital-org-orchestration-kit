Use digital-org-auditor.

Source thread id: <parent/orchestrator thread id, read-only provenance>
Current thread id: <this watchdog/auditor Codex thread id>
Required thread title: <PROJECT_PREFIX> <TASK_ID_OR_SCOPE> <Watchdog|Auditor> <SHORT_SCOPE>
Audit mode: <watchdog_scan|retrospective_audit|milestone_audit|incident_audit>
Task pool: <Linear project/control issue/fallback board path>
Control record: <control issue/path>
Scope: <tasks/workstreams/surfaces to scan>
Out of scope: <forbidden surfaces/actions>
Required checks: <liveness, stale leases, orphaned work, lease registry control divergence, blocker routing, goal drift, evidence gaps>
Lease holder: current_thread_id only when a lease is assigned
Digest output: <watchdog digest/audit report path or issue comment>

Do not rename or manage source_thread_id. Record degraded tools and use bounded local fallback reads when available. Write the digest and handoff before stopping.
