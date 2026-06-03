# Paperclip-native control plane workflow v0.1

Status: canonical workflow for new projects
Date: 2026-06-03

Grounding: this document is a normative workflow for this kit. The local pilot
readback that supports the Paperclip-owned decision is in
`docs/paperclip-native-pilot-readback-v0.1.md`.

## Target state

Paperclip is the operating system for the digital organization.

It owns:

- company, project, goals, agents, and reporting lines;
- issues, statuses, blockers, dependencies, and comments;
- active checkouts and heartbeat runs;
- scheduler-driven heartbeats and watchdog runs;
- evidence, review, verification, UAT, handoff, and archive records.

Codex is one runtime provider. A Codex session can do the work, but it does not
own the durable lease. The Paperclip issue and heartbeat run own the lease.

## Setup checklist

```yaml
setup:
  project_prefix: short_code_max_3_chars
  paperclip_company: required
  paperclip_project: required
  agents:
    - chief_orchestrator
    - project_orchestrator
    - feature_or_unit_orchestrator_optional
    - worker
    - reviewer
    - verifier
    - watchdog
    - auditor
  provider:
    default: codex_local
    requires:
      - PAPERCLIP_API_URL
      - PAPERCLIP_RUN_ID
      - PAPERCLIP_API_KEY_or_equivalent_injected_auth
  authority_profile:
    public_actions: user_gated_by_default
    db_mutation: user_or_profile_gated
    deploy: user_or_profile_gated
    spending: user_gated_by_default
    task_closure: verifier_or_project_orchestrator_after_evidence
    uat_acceptance: user_gated_by_default
```

## Stage machine

```yaml
stages:
  intake:
    owner: project_orchestrator
    durable_surface: Paperclip project or kickoff issue
  context_loading:
    owner: project_orchestrator
    durable_surface: Paperclip comment with source map links
  source_of_truth_map:
    owner: project_orchestrator
    durable_surface: project issue or control issue
  planning:
    owner: project_orchestrator
    durable_surface: Paperclip issues and plan comment
  second_opinion_no_magic_review:
    owner: reviewer_or_critic
    durable_surface: review issue or comment
  decomposition:
    owner: project_orchestrator
    durable_surface: child issues
  leases_ownership:
    owner: Paperclip checkout and heartbeat run
    durable_surface: issue.checkoutRunId and heartbeat_runs
  execution:
    owner: worker_agent_run
    durable_surface: worker issue, run log, artifacts, evidence comment
  worker_to_worker_blockers:
    owner: blocking issue owner
    durable_surface: linked issue or blocker comment
  user_question_blockers:
    owner: user_or_project_orchestrator
    durable_surface: issue with first description line starting `Question:`
  review:
    owner: reviewer_agent_run
    durable_surface: review issue/comment
  qa:
    owner: worker_or_qa_agent_run
    durable_surface: QA evidence comment
  verification:
    owner: verifier_agent_run
    durable_surface: verifier issue/comment
  uat:
    owner: user
    durable_surface: blocked or approval issue
  reporting_consolidation:
    owner: project_orchestrator
    durable_surface: status issue/comment/project update
  handoff_archival_worker_shutdown:
    owner: project_orchestrator
    durable_surface: final report and zero-active-run readback
```

## Issue model

Every issue should have:

```yaml
issue_contract:
  prefix: task id starts with project prefix
  goal: one concrete outcome
  stage: explicit in status or structured description
  scope: files, systems, accounts, runtime surfaces in bounds
  out_of_scope: forbidden actions and surfaces
  authority: allowed actions and required approvals
  owner_policy: assigned Paperclip agent or unassigned blocker
  evidence_required: commands, files, screenshots, DB readback, run ids, comments
  blocker_policy: user | peer | runtime-owner | credentials | unclear-spec | stale-loop
  done_policy: evidence plus review/verification where required
```

Question issues in this kit must put the operator action at the top:

```text
Question: Should this pilot treat Paperclip heartbeat_runs/checkouts/issues as
the primary source of truth?
```

Do not bury the user question under a long task description.

## Lease and heartbeat model

For this workflow, decide whether work is alive from Paperclip state, not chat
memory.

```yaml
lease_model:
  active_lease:
    source: issue.checkoutRunId or live heartbeat run
    holder: heartbeat_run.agentId
    started_at: heartbeat_run.startedAt
    ttl_policy: role_specific
  stale_lease:
    detects:
      - live run silent beyond policy
      - issue active but checkoutRunId missing
      - checkoutRunId points to terminal run
      - agent status error without recovery note
  recovery:
    - inspect issue, run, comments, and artifact evidence
    - cancel or mark stale terminal runs
    - preserve task status unless it is falsely active
    - assign a new agent only after scope and authority are explicit
```

Assignee alone is not the lease. A done issue can still show an assignee. The
lease is active only when there is an active checkout or live run.

## Watchdogs

For active work, configure at least one watchdog run or equivalent watchdog
check.

```yaml
watchdog_checks:
  - active issues without active checkout or live run
  - live runs without matching active issue
  - terminal runs still referenced by active issues
  - stale output silence
  - blocked issues without clear owner
  - user-question blockers whose first line is not actionable
  - verification-ready work without reviewer or verifier
  - repeated activity without material progress
  - authority violations
```

Watchdog output should stay compact: what moved, what is blocked, what is
orphaned, and what the system will do next.

## Linear and fallback board

Paperclip-native mode has one canonical state owner: Paperclip.

Linear can mirror:

- external stakeholder status;
- high-level milestones;
- public project reporting;
- customer-facing request intake.

The fallback board can mirror or replace Paperclip only when Paperclip is not
available. Do not run Linear and Paperclip as competing canonical task pools.

## Handoff and archive

Before calling a project complete:

```yaml
completion_requires:
  - all required issues done, blocked for user, or explicitly deferred
  - no live heartbeat runs
  - no active checkout on a terminal issue
  - reviewer and verifier evidence present where required
  - UAT state explicit
  - watchdog or auditor pass completed
  - final readback saved from Paperclip API or export
  - runtime state intentionally stopped or intentionally left running
```

## Legacy fallback

If Paperclip is unavailable, this kit falls back to
`docs/thread-first-project-workflow-v0.1.md`. In that fallback, real Codex
threads can hold leases. In Paperclip-native mode, this kit treats Codex threads
as provider sessions only.
