# Digital org orchestration kit

Run a small AI organization without losing track of who owns what.

This kit is for projects where one agent is no longer enough. It gives you a
repeatable way to set up orchestrators, workers, reviewers, verifiers,
watchdogs, auditors, tasks, leases, blockers, evidence, UAT, and final handoff.

The default control plane is Paperclip. Paperclip owns the durable state:
company, project, agents, issues, checkouts, heartbeat runs, scheduler state,
comments, blockers, and recovery. Codex plugs in as a runtime provider through
`codex_local`. Codex chats or sessions are execution logs and evidence pointers,
not the durable source of truth.

The older Codex-thread workflow remains in this repo as a fallback for projects
without Paperclip.

## Why this exists

Once several agents work on the same goal, chat history is not enough. You need
quick answers to operational questions:

- What is the goal?
- Which tasks exist?
- Which Paperclip agent or run owns each task?
- Is the lease still alive?
- What is blocked by the user, another agent, credentials, or runtime ownership?
- What evidence proves the work is done?
- Who reviewed and verified it?
- What happens if a worker stops?

The workflow turns those questions into explicit project stages and handoff
rules.

## What is included

- `docs/` - the operating model, Paperclip workflow, stage machine, authority
  rules, evidence contract, watchdog policy, Linear mirror rules, and fallback
  board rules.
- `skills/` - installable local Codex skills for activation, orchestration,
  worker, reviewer, verifier, auditor, and domain packs.
- `templates/` - kickoff prompts, task records, control records, watchdog
  digests, final reports, and audit proposals.
- `examples/` - a Paperclip-native pilot plus the older safe tutorial pilot.
- `validators/` - local checks for package completeness and key invariants.

## Contract

```yaml
kit_version: v0.1
updated_at: 2026-06-03T17:30:00+02:00
primary_surface: Paperclip
mirror_surface: Linear_optional
fallback_surface: local_task_board
organizational_agent_surface: Paperclip_agent_run
runtime_provider_surface: Codex_local
subagent_surface: secondary_internal_tool
```

Grounding: the Paperclip-native policy is based on the local pilot summarized in
`docs/paperclip-native-pilot-readback-v0.1.md` and
`examples/paperclip-native-pilot/pilot-report.md`.

## Quick start

1. Start or connect a Paperclip instance.
2. Create one Paperclip company for the project or program.
3. Create one Paperclip project with a short prefix, max 3 characters, for
   example `PCP`.
4. Create role agents from this kit: chief/project orchestrator, worker,
   reviewer, verifier, watchdog, and auditor. Use `codex_local` or another
   provider as the runtime adapter.
5. Create tasks as Paperclip issues. The issue id/title should carry the short
   project prefix, for example `PCP-001`.
6. Run activation using `docs/paperclip-native-control-plane-workflow-v0.1.md`.
7. Keep current state in Paperclip. Mirror to Linear only if one system is
   declared canonical and the other is read-only or derived.

Then validate the package:

```bash
node validators/validate-kit.mjs
```

Skill install dry-run:

```bash
node scripts/install-skills.mjs
```

Skill install write mode:

```bash
node scripts/install-skills.mjs --write
```

The Codex skills are useful when Codex is the provider running a Paperclip agent
or when you use the legacy thread-first fallback. They are not a replacement for
Paperclip's task/run state.

## Directory layout

```yaml
layout:
  docs: canonical_specs_and_templates
  skills: installable_codex_skills
  scripts: local_helper_scripts
  validators: local_validation_scripts
  templates: copy_ready_agent_task_and_board_templates
  linear: reserved_for_linear_payloads_or_snapshots
  examples: safe_pilots_and_reference_runs
```

## Required reading order

```yaml
read_order:
  - docs/paperclip-native-control-plane-workflow-v0.1.md
  - docs/paperclip-native-pilot-readback-v0.1.md
  - docs/paperclip-control-plane-integration-brief-v0.1.md
  - docs/portable-project-activation-kit-v0.1.md
  - docs/project-onboarding-discovery-kickoff-v0.1.md
  - docs/templates-and-checklists-v0.1.md
  - docs/control-loops-heartbeats-watchdogs-v0.1.md
  - docs/authority-and-evidence-contracts-v0.1.md
  - docs/linear-reconciliation-rules-v0.1.md
  - docs/project-setup-and-linear-template-v0.1.md
  - docs/thread-first-project-workflow-v0.1.md
  - docs/thread-naming-convention-v0.1.md
  - docs/gastown-pattern-implementation-roadmap-v0.1.md
```

## Paperclip-owned invariant

```yaml
paperclip_native:
  company: durable_org_boundary
  project: durable_goal_boundary
  issue: durable_task_and_blocker_record
  checkout_run: active_lease_record
  heartbeat_run: execution_and_liveness_record
  scheduler: heartbeat_timer_owner
  comments: evidence_review_verification_and_handoff
  chief_orchestrator: Paperclip_agent
  project_orchestrator: Paperclip_agent
  feature_or_unit_orchestrator: Paperclip_agent
  worker: Paperclip_agent
  reviewer: Paperclip_agent
  verifier: Paperclip_agent
  watchdog: Paperclip_agent
  auditor: Paperclip_agent
  codex_role: runtime_provider_session
  subagent_role: bounded_secondary_tool
  subagent_can_hold_lease: false
  subagent_can_be_runtime_owner: false
  subagent_can_accept_uat: false
  active_lease_holder_must_equal_paperclip_checkout_owner: true
```

## Role naming rule

Paperclip issue ids and titles carry the project prefix. Keep the prefix to 1-3
characters, for example `PCP-001`. Paperclip agent names should also start with
that prefix or company short name, for example `PCP Worker`.

Codex thread titles are required only in the legacy thread-first fallback.

## Minimum safe activation

```yaml
minimum_safe_activation:
  required:
    - project_goal
    - source_of_truth_map
    - paperclip_company_project_and_agent_ids
    - authority_profile
    - issue_stage_policy
    - lease_ttl_policy
    - blocker_routing_policy
    - evidence_contract
    - digest_surface
  worker_count_before_watchdog: 1
  worker_count_after_watchdog: 3
```

## Validation

Run:

```bash
node validators/validate-kit.mjs
node validators/validate-linear-reconciliation-v0.1.mjs
```

The first script checks package completeness and key Paperclip-native
invariants. The second script checks the current Linear reconciliation fixture
where that fixture is available.

## Local sync status

If this checkout includes `GITOM-SYNC.md`, it records the local GitOM/GBrain
sync status. Public exports may omit that file.

## Paperclip pilot

The Paperclip-native pilot is summarized in:

- `docs/paperclip-native-pilot-readback-v0.1.md`
- `examples/paperclip-native-pilot/pilot-report.md`

It exercised a real local Paperclip instance with Paperclip company/project,
agents, issues, checkouts, heartbeat runs, scheduler readback, worker output,
review, verification, watchdog, auditor, and a synthetic user-question blocker.

## Known open gates

```yaml
open_gates:
  paperclip_native_pilot: completed_local_synthetic
  paperclip_company_package_import_export: not_completed
  paperclip_scheduler_endpoint_contract: discovered_runtime_gap
  codex_provider_session_metadata_readback: discovered_runtime_gap
  linear_project_update_backend: optional_mirror_degraded_or_ui_only
  memory_hygiene_spec: not_completed
  production_runtime_policy: profile_gated
```

## Legacy thread-first fallback

The old safe synthetic tutorial pilot is under `examples/tutorial-pilot/`. It
used separate Codex threads for worker, watchdog, reviewer, verifier, and
auditor roles. Keep it as a fallback pattern for environments where Paperclip is
not available.

```yaml
worker_count_gate:
  max_before_registry_ttl_orphan_digest_validation: 1
```
