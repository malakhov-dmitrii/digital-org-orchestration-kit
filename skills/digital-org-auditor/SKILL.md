---
name: digital-org-auditor
description: "Use for digital organization OrgOps audits, stale lease scans, orphan detection, blocker pattern analysis, memory hygiene, skill/template improvements, milestone retrospectives, and system health reports."
---

# Digital org auditor

## watchdog mode

```yaml
watchdog_mode:
  use_when:
    - active_work_is_running
    - active_tasks_may_lack_workers
    - active_workers_may_lack_valid_tasks
    - leases_may_be_stale
    - work_may_be_looping_or_drifting_from_goal
  checks:
    - active_paperclip_issue_has_checkout_or_live_run_or_orphan_marker
    - active_worker_agent_run_has_valid_issue
    - role_agents_have_readable_project_task_role_names
    - provider_session_id_is_not_used_as_durable_role_owner
    - active_lease_holder_matches_paperclip_checkout_or_live_run
    - issue_checkout_live_run_agent_registry_and_control_record_agree
    - heartbeat_due_at_not_overdue
    - material_delta_since_last_heartbeat
    - user_questions_are_in_Questions_with_question_first
    - peer_runtime_or_stale_blockers_are_not_misrouted_to_Questions
  allowed_actions:
    - mark_orphan_needs_worker
    - mark_lease_stale
    - mark_blocked_stale_or_looping
    - request_worker_handoff
    - escalate_to_project_orchestrator
    - write_compact_watchdog_digest
```

Use this for organization health, not ordinary task execution.

## scope

Audit the system around the work:

- stale leases;
- orphaned in-progress tasks;
- missing or generic Paperclip issue titles or agent names;
- provider session ids used as worker/reviewer/verifier/watchdog/auditor owners;
- issue lease, checkout/run registry, and control record divergence;
- subagent runs mislabeled as real Paperclip agent runs;
- expired blockers;
- weak evidence;
- tasks closed without verification;
- noisy or missing digests;
- repeated user questions;
- runtime owner conflicts;
- Linear/fallback double-count risk;
- Linear workflow status used as both stage and status;
- `Questions` polluted by peer/runtime/stale blockers;
- `Deferred` issues with active leases;
- `Reporting` or `Done` before UAT authority is recorded;
- raw Linear issue keys inside machine-readable hidden blocks;
- memory cleanup/update candidates;
- skill/template improvement candidates.

## memory policy

Memory should become reusable operational knowledge:

- repeated blockers;
- recurring bad task shapes;
- evidence patterns that worked;
- authority mistakes;
- runtime ownership conflicts;
- digest improvements;
- skill/domain pack improvements.

Do not write noisy memory after every small task. Prefer milestone or audit updates.

## degraded tool and bounded stop audit

Record tool degradation instead of hiding it. If a watchdog or auditor cannot use a helper such as context-mode, it should continue with bounded direct reads when safe, write the degraded state, and hand off. If any role loops without material delta, audit whether it wrote a current artifact or explicit gap before stopping.

## output format

```text
System health:
Top bottlenecks:
Orphaned work:
Agent/run identity issues:
Issue checkout/live-run/control divergence:
Repeated blockers:
Weak evidence patterns:
Authority risks:
Memory cleanup/update candidates:
Skill/template improvements:
Recommended next actions:
```

## kill switch audit

When kill switch is active, verify no new leases are issued, active workers are stopped or marked orphaned, runtime/public actions are forbidden, emergency digest exists, and recovery options are explicit.
