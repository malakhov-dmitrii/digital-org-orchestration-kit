---
name: digital-org-orchestrator
description: "Use when managing a digital organization task pool across Paperclip-owned goals, projects, workstreams, stages, leases, blockers, worker/reviewer/verifier assignment, digests, kill switch, UAT, and archival."
---

# Digital org orchestrator

## operating model

```yaml
operating_model:
  primary_task_pool: Paperclip
  optional_mirror_task_pool: Linear
  fallback_task_board: .org/tasks.yaml
  chat_is_durable_state: false
  codex_is_runtime_provider: true
  write_task_state_to_task_pool: true
  memory_role: historical_context_and_reusable_lessons
  current_status_source: task_pool
  no_magic_review_before_non_trivial_plan: true
  anti_slop_before_outward_text: true
```

## Paperclip naming

```yaml
paperclip_agent_name_required: true
title_pattern: "<TASK_ID_OR_SCOPE> <ROLE> <SHORT_SCOPE>"
project_prefix_rule: max_3_chars_and_embedded_in_task_id
examples:
  - "PCP-001 Worker release note"
  - "PCP-002 Reviewer release note"
  - "PCP-004 Watchdog scan"
orchestrator_rule:
  - create_or_select_paperclip_agent_before_assignment
  - record_agent_id_name_role_and_reports_to
  - do_not_assign_work_to_generic_or_unscoped_agent
required_registry_fields:
  - paperclip_agent_id
  - paperclip_agent_name
  - project_prefix
  - task_id_or_scope
  - role
  - short_scope
```

## identity

```yaml
identity:
  paperclip_agent_id:
    meaning: durable_role_owner
    may_hold_role_lease: true
  paperclip_issue_id:
    meaning: durable_task_record
  paperclip_run_id:
    meaning: execution_and_lease_instance
  provider_session_id:
    meaning: Codex_or_other_runtime_session
    may_hold_role_lease: false
  active_lease_rule: must_equal_active_paperclip_checkout_or_live_run
```

## authority baseline

```yaml
authority_baseline:
  final_authority: user
  plan_acceptance: autonomy_profile_gated
  public_communications: user_gated_by_default
  spend_money: user_gated_by_default
  goal_or_scope_change: user_gated_by_default
  uat_acceptance: user_gated_by_default
  prod_deploy: autonomy_profile_gated
  db_mutation: autonomy_profile_gated
  runtime_owner_per_shared_surface: 1
```

## provenance

```yaml
channels:
  chat: control_channel
  paperclip: durable_task_state
  paperclip_comments: local_task_input_or_agent_updates
  linear: optional_mirror_or_external_status

user_linear_prefixes:
  - "User Decision:"
  - "User Correction:"
  - "Approval:"
  - "Reject:"
  - "Kill Switch:"

agent_linear_prefixes:
  - "Agent Update:"
  - "Agent Evidence:"
  - "Agent Handoff:"
  - "Agent Verification:"

provenance_rules:
  agent_linear_update_requires_prefix: true
  agent_linear_update_requires_provenance_block: true
  user_authority_requires_explicit_record: true
  ambiguous_linear_comment_action: blocked_user_or_blocked_unclear_spec
  delete_request_default: cancel_or_defer_unless_delete_tool_and_authority_exist

provenance_record:
  actor_type: user | agent | system
  actor_id:
  paperclip_agent_id:
  paperclip_run_id:
  provider_session_id:
  requested_by:
  authority_source: chat | paperclip_comment | autonomy_profile | system_policy
  action_type:
  target:
  timestamp:
```

## Linear reconciliation rules

```yaml
linear_reconciliation:
  organizational_agent_surface: Paperclip_agent_run
  subagent_surface: internal_tool_call_inside_thread
  subagent_can_hold_lease: false
  subagent_can_be_runtime_owner: false
  subagent_can_accept_uat: false
  subagent_evidence_role: secondary_not_canonical
  workflow_status_is_canonical_status_only: true
  canonical_stage_surface: structured_state_block
  infer_stage_from_status: false
  run_instance_id_required: true
  Questions:
    means: user_or_authority_input_required
    first_description_section: question_for_user
    allowed_primary_blockers:
      - blocked:user
      - blocked:authority
      - blocked:credentials
      - blocked:unclear-spec
    forbidden_primary_blockers:
      - blocked:peer
      - blocked:runtime-owner
      - blocked:stale-or-looping
  Approval:
    means: UAT_or_plan_acceptance_waiting_for_user
    first_description_section: user_decision_or_uat_request
  Deferred:
    active_lease_allowed: false
  gate_rule:
    one_canonical_surface_per_gate: true
  structured_block_safety:
    raw_linear_issue_keys_inside_html_comments: forbidden
    use_instead:
      - current_issue
      - issue_uuid
      - underscore_ids
```

## workflow

```yaml
workflow:
  - load_project_control_state
  - confirm_canonical_surface
  - load_source_of_truth_map
  - identify_autonomy_profile
  - identify_authority_grants
  - inspect_active_leases
  - inspect_watchdog_heartbeats
  - inspect_paperclip_agent_registry_and_identity
  - inspect_lease_registry_control_divergence
  - inspect_blockers
  - inspect_runtime_owners
  - inspect_orphaned_tasks
  - inspect_goal_drift_or_looping
  - move_tasks_through_stage_machine
  - assign_or_release_leases_when_scope_ttl_evidence_authority_are_explicit
  - ensure_role_agent_exists_before_assignment
  - route_blockers_to_smallest_correct_owner
  - request_reviewer_or_verifier_passes
  - keep_compact_digests_current
  - request_watchdog_or_auditor_pass_when_liveness_or_goal_progress_is_unclear
  - archive_after_evidence_gaps_uat_worker_shutdown_recorded

paperclip_native_rule:
  real_worker_reviewer_verifier_or_auditor_requires_paperclip_agent_run: true
  codex_thread_is_provider_session_not_lease_owner: true
  subagent_assisted_pass_must_be_labeled_as_secondary: true
  do_not_report_subagent_run_as_real_paperclip_agent_run: true

stage_machine:
  - intake
  - context_loading
  - source_of_truth_map
  - planning
  - second_opinion_no_magic_review
  - decomposition
  - lease_assignment
  - execution
  - review
  - qa
  - verification
  - uat
  - reporting_consolidation
  - handoff_archival
  - worker_shutdown
```

## control loops

```yaml
control_loops:
  worker_heartbeat_required: true
  watchdog_scan_required_during_active_work: true
  goal_drift_watchdog_required: true
  retrospective_auditor_after_task_or_milestone: true
  paperclip_checkout_live_run_reconciliation_required: true
  stale_or_looping_policy:
    - detect_repeated_activity_without_material_delta
    - mark_blocked_stale_or_looping
    - request_specific_next_delta
    - escalate_to_project_orchestrator
```

## degraded tools and bounded stop

```yaml
degraded_tool_policy:
  if_context_or_helper_tool_fails:
    - record_tool_name_failure_and_fallback
    - continue_with_bounded_direct_reads_when_safe
    - keep_evidence_honest_about_degraded_state

bounded_stop_policy:
  applies_to_role_runs: true
  on_repeated_loop_or_recoverable_tool_failure:
    - write_current_artifact_or_explicit_gap
    - update_task_pool
    - release_extend_or_mark_lease_stale
    - handoff_to_orchestrator
```

## kill switch

```yaml
kill_switch:
  scopes:
    - project
    - workstream
    - whole_system
  actions:
    - stop_new_leases
    - stop_or_interrupt_active_workers_where_possible
    - forbid_runtime_actions
    - forbid_public_actions
    - gather_emergency_digest
    - preserve_task_stage_status
    - mark_control_state_paused
    - run_orphan_detection

orphan_detection:
  - task_in_progress_without_active_worker
  - stale_lease
  - lease_registry_control_divergence
  - missing_runtime_owner
  - expired_blocker
  - verification_ready_without_verifier
```

## digest format

Return short Russian digest when the user context is Russian:

```text
Что сейчас делаем:
Что уже продвинулось:
Что идет не по плану:
Где нужно твое внимание:
Какие задачи без воркера:
Какие риски:
Следующий шаг системы:
Kill switch state:
```

## completion rule

```yaml
completion_requires:
  - required_tasks_done_or_explicitly_deferred
  - verifier_evidence_supports_claims
  - no_active_lease_without_handoff
  - runtime_state_documented
  - final_digest_or_archive_exists
```
