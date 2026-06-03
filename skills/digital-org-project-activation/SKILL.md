---
name: digital-org-project-activation
description: "Use when activating the digital-org orchestration model in any new project, including Paperclip-native setup, onboarding, discovery, research, kickoff, source-of-truth map, authority profile, capacity policy, and first task slices."
---

# Digital org project activation

Use this skill before assigning workers in a new or newly adopted project.

## inputs

```yaml
required_inputs:
  - project_name
  - user_goal
  - known_constraints
  - primary_control_plane_or_fallback
  - activation_mode
optional_inputs:
  - autonomy_profile
  - authority_grants
  - existing_repo_or_runtime
  - existing_paperclip_company_or_project
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
  - paperclip_company_project_agent_setup
  - discovery
  - research
  - source_of_truth_map
  - kickoff
  - planning
  - no_magic_review
  - decomposition
  - paperclip_issue_and_agent_registry
  - first_lease_policy
  - watchdog_baseline
  - ready_for_worker_assignment
```

## activation modes

```yaml
activation_modes:
  quick_start_30_min:
    max_active_worker_runs: 1
    required_surface: Paperclip_project_or_fallback_board
  standard_90_min:
    max_active_worker_runs: 1
    required_surface: Paperclip_company_project
    unlock_to_3_requires_watchdog_pass: true
  full_program:
    max_worker_runs_initial: 1
    max_worker_runs_after_controls: 3
    max_worker_runs_large_project_default: 6
    requires_feature_or_unit_orchestrators: context_dependent
```

## Paperclip-native rules

```yaml
paperclip_native:
  primary_control_plane: Paperclip
  organizational_agent_surface: Paperclip_agent_run
  runtime_provider_surface: Codex_local
  codex_chat_is_durable_state: false
  paperclip_owns:
    - company
    - project
    - agents
    - issues
    - checkouts
    - heartbeat_runs
    - scheduler_state
    - comments_and_evidence
  subagent_surface: secondary_internal_tool
  subagent_can_hold_lease: false
  subagent_can_be_runtime_owner: false
  subagent_can_accept_uat: false
  real_worker_requires_paperclip_agent_run: true
  role_agent_name_required: true
  title_pattern: "<TASK_ID_OR_SCOPE> <ROLE> <SHORT_SCOPE>"
  project_prefix_max_chars: 3
  task_id_must_start_with_project_prefix: true
```

Do not call a subagent run a worker, reviewer, verifier, or auditor pilot. Label
it as a secondary validation pass.

In this kit, use `docs/thread-first-project-workflow-v0.1.md` only as a legacy
fallback when Paperclip is unavailable.

## setup outputs

Produce or update these records:

```yaml
setup_outputs:
  - project_goal
  - non_goals
  - authority_profile
  - source_of_truth_map
  - paperclip_company_id
  - paperclip_project_id
  - paperclip_agent_ids
  - project_prefix
  - issue_stage_policy
  - role_agent_naming_convention
  - capacity_governor
  - kill_switch_policy
  - digest_surface
  - first_milestone
  - first_task_slices
```

Thread registry entries must include `thread_id`, `thread_title`, `project_prefix`, `task_id_or_scope`, `role`, and `short_scope`. Keep `project_prefix` to 1-3 characters and embed it in the task id. Role kickoff prompts must distinguish `source_thread_id` from `current_thread_id`; active `holder_thread_id` must equal `current_thread_id`.

## source of truth map

Map these surfaces before planning:

```yaml
source_of_truth_map:
  user_goal: chat_or_approved_task_record
  current_task_state: Paperclip_issues_and_runs
  optional_external_status: Linear_readonly_or_mirror
  repo_state: git_worktree
  runtime_state: named_runtime_owner
  DB_state: authority_profile_gated
  public_actions: user_gated_by_default
  memory: historical_context_not_current_task_state
  digest: Paperclip_project_status_issue_or_comment
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
  default_active_worker_runs: 1
  increase_requires:
    - paperclip_agent_registry_exists
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
Paperclip company/project:
Paperclip agents:
Issue naming pattern:
Capacity:
First milestone:
Ready tasks:
Questions:
Risks:
Next gate:
```
