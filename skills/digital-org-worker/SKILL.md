---
name: digital-org-worker
description: "Use when executing one leased task from a digital organization task pool; covers scoped work, Paperclip issue/run state, authority checks, evidence, blockers, heartbeat, and handoff to reviewer/verifier/orchestrator."
---

# Digital org worker

## role

```yaml
role:
  execute_one_bounded_task: true
  redefine_mission: false
  take_second_task: false
  expand_scope_without_task_update: false
  close_own_work_default: false
  self_verification_exception: explicit_low_risk_task_grant
  inner_pool_skill: agent-pool-worker
```

## start checklist

```yaml
start_checklist:
  - read_task_record_from_paperclip_issue_or_fallback
  - confirm_task_id_project_domain_role_stage_status
  - confirm_paperclip_agent_id_issue_id_and_run_id
  - confirm_provider_session_is_evidence_not_lease_holder
  - confirm_checkout_or_live_run_holder_scope_ttl_heartbeat_allowed_forbidden_actions
  - confirm_active_lease_equals_current_paperclip_run_when_lease_active
  - confirm_autonomy_profile_and_authority_grants
  - confirm_acceptance_criteria_and_required_evidence
  - load_relevant_domain_pack

missing_required_field_policy:
  first_action: recover_from_task_pool
  if_unrecoverable: create_blocker_with_owner_and_next_action
```

## Paperclip state rules

```yaml
paperclip_state_rules:
  organizational_agent_surface: Paperclip_agent_run
  runtime_provider_surface: Codex_local
  this_worker_must_be_a_paperclip_agent_run_for_active_lease: true
  provider_session_cannot_hold_lease: true
  role_agent_name_required: true
  subagent_cannot_hold_lease: true
  subagent_evidence_role: secondary_not_canonical
  workflow_status_is_canonical_status_only: true
  canonical_stage_lives_in_structured_state_block: true
  do_not_infer_stage_from_status: true
  run_instance_id_required: true
  questions_status:
    use_only_for:
      - blocked:user
      - blocked:authority
      - blocked:credentials
      - blocked:unclear-spec
    first_description_section: question_for_user
  internal_blockers:
    - blocked:peer
    - blocked:runtime-owner
    - blocked:stale-or-looping
    routing: keep_current_status_or_defer
    never_route_to: Questions
  defer_requires:
    - lease_released_stale_superseded_or_canceled
  structured_block_safety:
    raw_linear_issue_keys_inside_html_comments: forbidden
  linear_role: optional_mirror_or_external_status_not_canonical
```

## execution rules

```yaml
execution_rules:
  work_only_inside_lease_scope: true
  manage_only_current_paperclip_issue_and_run_metadata: true
  provider_session_id_is_read_only_evidence: true
  update_task_evidence_not_only_chat: true
  keep_paperclip_heartbeat_current: true
  missing_authority: denied
  while_waiting_for_user_approval: continue_non_authority_work_only
  user_silence_means_approval: false
  shared_surface_requires_authority_and_runtime_owner:
    - runtime
    - db
    - deploy
    - browser_profile
    - external_account
    - public_channel
  blocked_record_requires:
    - type
    - owner
    - reason
    - attempted_alternatives
    - smallest_unblock_action
```

## evidence

Attach evidence that supports the claim:

- commands and results;
- changed files or artifacts;
- tests, lint, typecheck, build, static checks;
- browser/runtime/log/deploy/DB proof where relevant;
- skipped checks with reason;
- known gaps;
- next action.

## handoff

```yaml
handoff_before_stopping:
  - update_task_record
  - attach_evidence_or_explicit_gap
  - record_current_status
  - name_blocker_or_next_action
  - release_extend_or_mark_lease_stale
  - document_runtime_state_if_touched
  - mark_ready_for_review_or_verification_only_when_evidence_attached
  - keep_issue_checkout_live_run_and_agent_registry_consistent
  - if_tool_degraded_record_failure_and_fallback_used
  - if_looping_write_gap_and_smallest_next_action_before_stopping
```
