---
name: digital-org-project-activation
description: "Use when activating the digital-org/thread-first orchestration model in any new project, including onboarding, setup, discovery, research, kickoff, Linear or fallback task pool setup, source-of-truth map, thread registry, capacity policy, and first task slices."
---

# Digital org project activation

Use this skill before assigning workers in a new or newly adopted project.

## inputs

```yaml
required_inputs:
  - project_name
  - user_goal
  - known_constraints
  - primary_task_pool_or_fallback
  - activation_mode
optional_inputs:
  - autonomy_profile
  - authority_grants
  - existing_repo_or_runtime
  - existing_linear_project_or_control_issue
  - project_prefix
```

```yaml
missing_input_policy:
  recover_from:
    - workspace
    - Linear
    - local_docs
    - user_provided_chat_context
  ask_user_when_missing_input_changes:
    - authority
    - public_action
    - spending
    - production_deploy
    - DB_mutation
    - goal_scope
```

## workflow

```yaml
workflow:
  - intake
  - setup
  - discovery
  - research
  - source_of_truth_map
  - kickoff
  - planning
  - no_magic_review
  - decomposition
  - thread_registry
  - first_lease_policy
  - watchdog_baseline
  - ready_for_worker_assignment
```

## activation modes

```yaml
activation_modes:
  quick_start_30_min:
    max_worker_threads: 1
    required_surface: control_issue_or_fallback_board
  standard_90_min:
    max_worker_threads: 1
    required_surface: Linear_project_or_control_issue
    unlock_to_3_requires_watchdog_pass: true
  full_program:
    max_worker_threads_initial: 1
    max_worker_threads_after_controls: 3
    max_worker_threads_large_project_default: 6
    requires_feature_or_unit_orchestrators: context_dependent
```

## thread-first rules

```yaml
thread_first:
  organizational_agent_surface: Codex_thread
  subagent_surface: secondary_internal_tool
  subagent_can_hold_lease: false
  subagent_can_be_runtime_owner: false
  subagent_can_accept_uat: false
  real_worker_requires_thread_id: true
  role_thread_title_required: true
  title_pattern: "<PROJECT_PREFIX> <TASK_ID_OR_SCOPE> <ROLE> <SHORT_SCOPE>"
```

Do not call a subagent run a worker, reviewer, verifier, or auditor pilot. Label it as a secondary validation pass.

## setup outputs

Produce or update these records:

```yaml
setup_outputs:
  - project_goal
  - non_goals
  - authority_profile
  - source_of_truth_map
  - task_pool_location
  - project_prefix
  - thread_registry
  - thread_title_convention
  - capacity_governor
  - kill_switch_policy
  - digest_surface
  - first_milestone
  - first_task_slices
```

Thread registry entries must include `thread_id`, `thread_title`, `project_prefix`, `task_id_or_scope`, `role`, and `short_scope`. Role kickoff prompts must distinguish `source_thread_id` from `current_thread_id`; active `holder_thread_id` must equal `current_thread_id`.

## source of truth map

Map these surfaces before planning:

```yaml
source_of_truth_map:
  user_goal: chat_or_approved_task_record
  current_task_state: Linear_or_fallback_board
  repo_state: git_worktree
  runtime_state: named_runtime_owner
  DB_state: authority_profile_gated
  public_actions: user_gated_by_default
  memory: historical_context_not_current_task_state
  digest: Linear_project_update_or_control_issue_digest
```

## no-magic gate

Before implementation planning, verify:

```yaml
no_magic_gate:
  authority_known: true
  provenance_known: true
  stale_data_behavior_known: true
  double_count_risk_handled: true
  reconciliation_policy_known: true
  degraded_states_known: true
```

```yaml
unknown_no_magic_field_policy:
  record_as: blocker_or_explicit_deferred_risk
  location: kickoff_record
```

## first worker policy

```yaml
first_worker_policy:
  default_active_worker_threads: 1
  increase_requires:
    - thread_registry_exists
    - lease_ttl_scan_exists
    - orphan_detection_exists
    - digest_surface_exists
    - runtime_owner_policy_exists
```

## output contract

Return or write a compact activation record:

```text
Project:
Goal:
Activation mode:
Task pool:
Authority profile:
Source of truth:
Thread registry:
Thread title pattern:
Capacity:
First milestone:
Ready tasks:
Questions:
Risks:
Next gate:
```
