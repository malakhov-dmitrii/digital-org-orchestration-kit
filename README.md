# Digital org orchestration kit

```yaml
kit_version: v0.1
generated_at: 2026-06-03T13:07:35+02:00
primary_surface: Linear
fallback_surface: local_task_board
organizational_agent_surface: Codex_thread
subagent_surface: secondary_internal_tool
```

## Quick start

1. Install or copy the folders under `skills/` into `~/.codex/skills/`.
2. Start a new Codex chat with `digital-org-project-activation`.
3. Pick an activation mode from `docs/portable-project-activation-kit-v0.1.md`.
4. Create or select the Linear project/control issue using `docs/project-setup-and-linear-template-v0.1.md`.
5. Choose a short project prefix and thread title pattern from `docs/thread-naming-convention-v0.1.md`.
6. Complete intake, setup, discovery, research, source-of-truth map, and kickoff before assigning worker threads.
7. Keep task state in Linear or the fallback task board. Do not rely on chat history as durable state.

Skill install dry-run:

```bash
node scripts/install-skills.mjs
```

Skill install write mode:

```bash
node scripts/install-skills.mjs --write
```

## Directory layout

```yaml
layout:
  docs: canonical_specs_and_templates
  skills: installable_codex_skills
  scripts: local_helper_scripts
  validators: local_validation_scripts
  templates: copy_ready_linear_thread_and_board_templates
  linear: reserved_for_linear_payloads_or_snapshots
  examples: safe_pilots_and_reference_runs
```

## Required reading order

```yaml
read_order:
  - docs/portable-project-activation-kit-v0.1.md
  - docs/thread-first-project-workflow-v0.1.md
  - docs/project-onboarding-discovery-kickoff-v0.1.md
  - docs/project-setup-and-linear-template-v0.1.md
  - docs/templates-and-checklists-v0.1.md
  - docs/control-loops-heartbeats-watchdogs-v0.1.md
  - docs/thread-naming-convention-v0.1.md
  - docs/linear-reconciliation-rules-v0.1.md
  - docs/authority-and-evidence-contracts-v0.1.md
  - docs/gastown-pattern-implementation-roadmap-v0.1.md
```

## Thread-first invariant

```yaml
thread_first:
  chief_orchestrator: Codex_thread
  project_orchestrator: Codex_thread
  feature_or_unit_orchestrator: Codex_thread
  worker: Codex_thread
  reviewer: Codex_thread
  verifier: Codex_thread
  auditor: Codex_thread
  subagent_role: bounded_secondary_tool
  subagent_can_hold_lease: false
  subagent_can_be_runtime_owner: false
  subagent_can_accept_uat: false
  role_thread_title_required: true
  active_lease_holder_thread_id_must_equal_current_thread_id: true
```

## Role thread title rule

Every worker, reviewer, verifier, watchdog, auditor, and non-root orchestrator thread must be titled before or immediately after assignment:

```text
<PROJECT_PREFIX> <TASK_ID_OR_SCOPE> <ROLE> <SHORT_SCOPE>
```

Example: `DOP-TUT TUT-001 Worker release note`.

The task pool or control issue must record `thread_id`, `thread_title`, `project_prefix`, `task_id`, `role`, and `short_scope`.

## Minimum safe activation

```yaml
minimum_safe_activation:
  required:
    - project_goal
    - source_of_truth_map
    - task_pool_location
    - authority_profile
    - thread_registry
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
node validators/validate-kit.mjs
```

The first script checks package completeness. The second script checks the current Linear reconciliation fixture from this pilot.

## Public release note

See `PUBLICATION.md` for the public export note. This export removes or replaces local paths, real thread ids, and project-specific live fixtures before publication.

## Known open gates

```yaml
open_gates:
  real_codex_thread_pilot: completed_local_synthetic
  linear_project_update_backend: degraded_or_ui_only
  memory_hygiene_spec: not_completed
  production_runtime_policy: profile_gated
```

## Tutorial pilot

The safe synthetic tutorial pilot is under `examples/tutorial-pilot/`. It used separate Codex threads for worker, watchdog, reviewer, verifier, and auditor roles. The pilot made no Linear writes, public actions, runtime actions, or changes outside the example folder.

```yaml
worker_count_gate:
  max_before_registry_ttl_orphan_digest_validation: 1
```
