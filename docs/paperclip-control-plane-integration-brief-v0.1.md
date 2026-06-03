# Paperclip control plane integration brief v0.1

Status: accepted default after local synthetic pilot
Date: 2026-06-03

Grounding: this is a kit decision brief. Runtime evidence from the local pilot
is summarized in `docs/paperclip-native-pilot-readback-v0.1.md`.

## Decision

Use Paperclip as the primary control plane for this kit.

Paperclip owns the durable organization state:

- company and project boundaries;
- role agents and reporting lines;
- issues, statuses, blockers, and comments;
- active checkouts and heartbeat runs;
- scheduler/heartbeat state;
- evidence, review, verification, UAT, and handoff records.

Codex is a runtime provider through `codex_local`. Codex chats, sessions, and
subagents are not the source of truth for leases or task ownership in the
Paperclip-native mode. They are execution logs and evidence pointers.

Linear remains useful as an optional mirror or external stakeholder surface.
The fallback task-board file remains useful when Paperclip is unavailable.
Neither should dual-write as canonical beside Paperclip.

## Why Paperclip fits

Paperclip describes itself as a Node.js server and React UI for managing teams
of AI agents, with org charts, goals, budgets, governance, heartbeats, task
tracking, and audit visibility.

The Paperclip V1 implementation spec lists concepts that this kit must test
before using Paperclip as a control plane:

- human board operator;
- company-scoped goals and work;
- org tree;
- heartbeat-driven agent execution;
- tasks and comments as the communication surface;
- single assignee and atomic checkout for `in_progress`;
- budget/cost controls;
- human intervention through pause or override workflows.

The plugin spec is useful for future adapters, but it also states current
deployment caveats: plugin UI should be treated as trusted same-origin code, the
practical model is self-hosted and filesystem-persistent, and dynamic plugin
install is not yet cloud-ready for horizontally scaled deployments.

The company package spec says it defines a markdown- and GitHub-native format
for companies, teams, agents, projects, tasks, and skills. This kit should
evaluate that format during the Paperclip spike, but does not adopt it here.

Primary references used for the original evaluation:

- https://github.com/paperclipai/paperclip/blob/master/README.md
- https://github.com/paperclipai/paperclip/blob/master/doc/SPEC-implementation.md
- https://github.com/paperclipai/paperclip/blob/master/doc/plugins/PLUGIN_SPEC.md
- https://github.com/paperclipai/paperclip/blob/master/docs/companies/companies-spec.md
- https://github.com/paperclipai/paperclip/blob/master/ROADMAP.md

## Architecture shape

```text
Paperclip
  company, project, org chart, agents, issues, checkouts,
  heartbeat runs, scheduler, comments, blockers, evidence
        |
        v
Digital Org Operating Pack
  role prompts, stage machine, authority, evidence contract,
  watchdog/auditor policy, onboarding, project activation
        |
        v
Agent Runtime Adapter
  Codex local provider | other provider adapters | bounded helper subagents
        |
        v
Knowledge / Memory Adapter
  GBrain, project docs, repo discovery, audit learnings
```

Local policy: Paperclip stores current control-plane state. This kit supplies
portable operating contracts, role instructions, templates, and validators.

## Source-of-truth map

| Concept | Source of truth | Created by | Edited by | Risk if unclear |
| --- | --- | --- | --- | --- |
| Project goal | control plane project/company goal record | user or chief/project orchestrator after approval | user or approved orchestrator | agents optimize for different goals |
| Task identity | control plane issue/task id | project orchestrator | project orchestrator | duplicate work or broken reporting |
| Project prefix | task id prefix, max 3 chars | project orchestrator | user-approved orchestrator change only | unreadable thread/task nomenclature |
| Role identity | Paperclip agent id, name, role, reports-to edge | project orchestrator | project orchestrator | active work becomes untraceable |
| Runtime session identity | Paperclip heartbeat run and provider session metadata | Paperclip runtime adapter | Paperclip runtime adapter | run logs cannot be mapped back to tasks |
| Lease holder | Paperclip checkout/heartbeat run record | Paperclip assignment or scheduler | current owner or recovery authority | two agents mutate same scope |
| Stage/status | control plane task state | orchestrator or role owner | role owner within authority boundary | false progress or hidden blocker |
| Evidence | task comments, artifacts, repo paths, verification notes | worker/reviewer/verifier | append-only preferred | unverifiable completion claims |
| User question | task blocker field/comment pinned near top | role owner | user answers, orchestrator routes | user-blocked work looks idle |
| Runtime authority | authority profile and runtime-owner field | user/project orchestrator | user or runtime owner | unsafe deploy/DB/public actions |
| Memory learning | milestone/audit memory update | auditor or orchestrator | memory hygiene process | stale or duplicated organizational memory |

## Paperclip-native acceptance gate

These are this kit's acceptance criteria for using Paperclip as the primary
surface.

1. A Paperclip agent/run remains the durable role owner for orchestrators,
   workers, reviewers, verifiers, watchdogs, and auditors.
2. Codex and subagents can help with bounded execution, research, or validation,
   but cannot hold a
   project lease, own runtime authority, or accept UAT.
3. Every active task can be queried with task id, stage, checkout/run owner,
   TTL policy, blockers, evidence, reviewer, verifier, and UAT state.
4. One task has one active assignee/lease holder at a time.
5. Stale lease detection can produce an orphan digest without reading every
   role chat.
6. User-question blockers are separate from peer-agent blockers, credential
   blockers, unclear-spec blockers, and runtime-owner blockers.
7. Authority gates for deploys, DB writes, public actions, task closure, and
   plan acceptance are explicit and auditable.
8. Evidence survives round-trip export or backup.
9. Cross-project isolation is enforced by company/project boundaries, task id
   prefixes, worktrees, labels/tags, and runtime-owner records.
10. The final report can be generated from control-plane state plus evidence,
    not from memory of the current chat.

## Completed local spike

The local synthetic spike ran against Paperclip `0.3.1` on 2026-06-03.

```yaml
spike:
  project_prefix: PCP
  source_of_truth_during_spike: Paperclip_local_sandbox
  linear_mode: off_or_read_only
  max_workers_before_watchdog: 1
  required_roles:
    - project_orchestrator
    - worker
    - reviewer
    - verifier
    - watchdog
    - auditor
  tasks:
    PCP-001: set up local Paperclip sandbox and record version/capabilities
    PCP-002: model the tutorial project as company/project/tasks/agents
    PCP-003: map Codex thread ids and titles into Paperclip task/agent records
    PCP-004: prove single active lease and stale lease recovery
    PCP-005: prove watchdog heartbeat and compact digest
    PCP-006: prove worker evidence, review, verification, and UAT round trip
    PCP-007: audit Linear/Paperclip dual-authority risk
    PCP-008: write decision report
```

Exit criteria covered by the local spike readback:

- `PCP-*` task ids remained readable and included the project prefix.
- Active work was inspected from Paperclip without opening every Codex
  chat.
- A user-question task showed the question at the top of the task surface.
- Evidence, review, verification, and UAT were represented as separable states.
- No public/deploy/DB action can happen without the authority profile allowing
  it.
- The final report identifies which facts came from Paperclip runs,
  files, Linear, or manual user input.

The detailed readback is in `docs/paperclip-native-pilot-readback-v0.1.md`.

## No-magic review

Verdict: ready for sandboxed project activation, with documented control-plane
gaps.

Top blockers:

- Scheduler API paths must be discovered from the installed Paperclip version;
  hardcoded `/api/scheduler-heartbeats` and company-scoped scheduler paths failed
  in the pilot, while `/api/instance/scheduler-heartbeats` worked.
- Agent instructions must use provider-injected API auth. A run without
  `PAPERCLIP_AGENT_JWT_SECRET` produced board-authored comments and automation
  loops.
- In the local pilot, `blockedByIssueIds` behaved as a hard dependency rather
  than a review-target relation.
  Review tasks should link to the worker artifact without blocking on a
  non-`done` worker issue when the review is supposed to perform the transition.
- Finished issues can still show assignee fields. Lease status must be derived
  from active checkout/run state, not assignee alone.
- Dual-writing to Linear and Paperclip creates split authority unless one system
  is declared read-only or derived.

Stale-data risks:

- Control-plane task state can drift from provider session metadata.
- Heartbeat records can look healthy while the task is not moving toward the
  goal.
- Memory updates can preserve obsolete process decisions.

Required degraded states:

- `control_plane_unverified`;
- `paperclip_agent_owner_missing`;
- `lease_stale`;
- `evidence_missing`;
- `dual_authority_risk`;
- `plugin_runtime_untrusted`;
- `provider_session_unmapped`.

Implementation may start as a Paperclip-native project activation. Public,
production, DB, spending, and external communication actions still require the
authority profile to grant them explicitly.
