# Paperclip control plane integration brief v0.1

Status: decision brief, not an implementation commitment
Date: 2026-06-03

Grounding:

- This kit's current task surfaces are declared in `manifest.json` as
  `primary_task_pool: Linear` and `fallback_task_pool: local_task_board`.
- This kit's current organizational agent surface is declared in `manifest.json`
  as `organizational_agent_surface: Codex_thread`.
- The adapter rules below are local acceptance criteria for this kit. They are
  not claims about current Paperclip behavior.

## Decision

Treat this kit as a portable operating pack, not as a replacement for Paperclip.

The kit owns the role model, stage machine, lease discipline, evidence contract,
review/verification/UAT gates, thread-first Codex ownership, and project
activation workflow.

The durable control plane can be swapped:

- Linear, because this kit already declares it as the primary task pool;
- local fallback task board, because this kit already ships that fallback;
- Paperclip, only after a compatibility spike proves it can preserve this
  kit's authority and evidence contracts.

Do not migrate the kit wholesale to Paperclip yet. Build a Paperclip adapter
profile first, then decide whether Paperclip becomes a preferred control plane
for projects that need a dashboard, org chart, scheduled heartbeats, budgets,
and multi-company isolation.

## Why Paperclip is close

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

Primary references:

- https://github.com/paperclipai/paperclip/blob/master/README.md
- https://github.com/paperclipai/paperclip/blob/master/doc/SPEC-implementation.md
- https://github.com/paperclipai/paperclip/blob/master/doc/plugins/PLUGIN_SPEC.md
- https://github.com/paperclipai/paperclip/blob/master/docs/companies/companies-spec.md
- https://github.com/paperclipai/paperclip/blob/master/ROADMAP.md

## Architecture shape

```text
Digital Org Operating Pack
  roles, stages, leases, authority, evidence, UAT, reporting, skills
        |
        v
Control Plane Adapter
  Linear adapter | fallback board adapter | Paperclip adapter candidate
        |
        v
Agent Runtime Adapter
  Codex thread adapter | bounded subagent helper adapter
        |
        v
Knowledge / Memory Adapter
  GBrain, project docs, repo discovery, audit learnings
```

Local policy for this kit: the operating pack stays vendor-neutral. The
control-plane adapter stores and displays task state. The role contracts remain
in this kit.

## Source-of-truth map

| Concept | Source of truth | Created by | Edited by | Risk if unclear |
| --- | --- | --- | --- | --- |
| Project goal | control plane project/company goal record | user or chief/project orchestrator after approval | user or approved orchestrator | agents optimize for different goals |
| Task identity | control plane issue/task id | project orchestrator | project orchestrator | duplicate work or broken reporting |
| Project prefix | task id prefix, max 3 chars | project orchestrator | user-approved orchestrator change only | unreadable thread/task nomenclature |
| Role thread identity | Codex thread id and title stored on task/lease | assigning orchestrator | runtime owner or orchestrator | active work becomes untraceable |
| Lease holder | task lease record | assigning orchestrator | current owner or recovery authority | two agents mutate same scope |
| Stage/status | control plane task state | orchestrator or role owner | role owner within authority boundary | false progress or hidden blocker |
| Evidence | task comments, artifacts, repo paths, verification notes | worker/reviewer/verifier | append-only preferred | unverifiable completion claims |
| User question | task blocker field/comment pinned near top | role owner | user answers, orchestrator routes | user-blocked work looks idle |
| Runtime authority | authority profile and runtime-owner field | user/project orchestrator | user or runtime owner | unsafe deploy/DB/public actions |
| Memory learning | milestone/audit memory update | auditor or orchestrator | memory hygiene process | stale or duplicated organizational memory |

## Paperclip adapter gate

These are proposed acceptance criteria for this kit. They are not current-state
claims about Paperclip.

1. A real Codex thread remains the durable role owner for orchestrators,
   workers, reviewers, verifiers, watchdogs, and auditors.
2. Subagents can help with bounded research or validation, but cannot hold a
   project lease, own runtime authority, or accept UAT.
3. Every active task can be queried with task id, stage, lease owner, thread id,
   thread title, TTL, blockers, evidence, reviewer, verifier, and UAT state.
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

## Recommended spike

Run a local Paperclip compatibility spike before changing the default workflow.

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

Exit criteria for the proposed spike:

- `PCP-*` task ids remain readable and include the project prefix.
- Active work can be inspected from Paperclip without opening every Codex
  thread.
- A stopped worker can be detected and recovered.
- A user-question task shows the question at the top of the task surface.
- Evidence, review, verification, and UAT are separable states.
- No public/deploy/DB action can happen without the authority profile allowing
  it.
- The final report identifies which facts came from Paperclip, Codex threads,
  files, Linear, or manual user input.

## No-magic review

Verdict: needs spike before migration.

Top blockers:

- Paperclip's roadmap describes priorities as directional, so docs and runtime
  behavior must be checked against the installed version.
- The plugin spec explicitly lists current deployment and trust-model caveats:
  trusted same-origin plugin UI, self-hosted filesystem-persistent practical
  deployment, and no cloud-ready dynamic plugin distribution yet.
- The current kit has proven local tutorial artifacts; Paperclip compatibility
  has not yet been proven with real Codex role threads.
- Dual-writing to Linear and Paperclip would create split authority unless one
  system is declared read-only or derived.

Stale-data risks:

- Control-plane task state can drift from live Codex thread state.
- Heartbeat records can look healthy while the task is not moving toward the
  goal.
- Memory updates can preserve obsolete process decisions.

Required degraded states:

- `control_plane_unverified`;
- `thread_owner_missing`;
- `lease_stale`;
- `evidence_missing`;
- `dual_authority_risk`;
- `plugin_runtime_untrusted`;
- `paperclip_adapter_experimental`.

Implementation may start only as a sandboxed adapter spike. A full migration
should wait until the spike report proves the adapter contract.
