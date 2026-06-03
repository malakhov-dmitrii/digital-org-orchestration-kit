# No-magic review: portable kit v0.1

```yaml
artifact_type: no_magic_review
reviewed_artifacts:
  - outputs/portable-project-activation-kit-v0.1.md
  - outputs/thread-first-project-workflow-v0.1.md
  - outputs/project-onboarding-discovery-kickoff-v0.1.md
  - outputs/project-setup-and-linear-template-v0.1.md
  - outputs/templates-and-checklists-v0.1.md
  - digital-org-orchestration-kit/README.md
independent_claude_pass:
  attempted: true
  result: timeout_or_empty_output
  fallback: direct_hostile_review
verdict: ready_for_portable_packaging_with_open_gates
```

## 1. source of truth map

```yaml
source_of_truth:
  project_goal:
    source: user_chat_or_approved_control_issue
    stale_behavior: reconfirm_on_scope_change
  current_task_state:
    source: Linear_project_issue_or_fallback_board
    stale_behavior: watchdog_scan_and_reconciliation
  worker_ownership:
    source: thread_registry_and_lease_block
    stale_behavior: TTL_expiry_marks_stale_or_orphan
  role_thread_identity:
    source: thread_registry_task_lease_and_thread_title
    stale_behavior: watchdog_marks_lease_registry_control_divergence
  runtime_ownership:
    source: runtime_owner_policy_in_task_pool
    stale_behavior: no_public_action_without_active_owner
  verification_claim:
    source: verifier_record_with_evidence
    stale_behavior: reopen_or_fix_request_when_evidence_no_longer_supports_claim
  user_acceptance:
    source: explicit_user_comment_or_chat_decision
    stale_behavior: pending_until_user_accepts_or_rejects
```

## 2. authority review

```yaml
authority:
  user:
    can:
      - accept_uat
      - change_goal
      - grant_public_action
      - grant_spend
      - grant_prod_or_db_authority
  orchestrator:
    can:
      - plan
      - create_or_update_task_records
      - assign_leases
      - rename_role_threads_before_assignment
      - route_blockers
      - consolidate_reports
    cannot_without_grant:
      - accept_uat
      - change_goal
      - deploy_to_prod
      - mutate_db
      - perform_public_action
  worker:
    can:
      - execute_one_leased_task
      - write_evidence
      - manage_current_thread_metadata_only
      - request_review_or_verification
    cannot:
      - close_own_high_impact_task
      - take_unleased_work
      - expand_scope_silently
      - manage_parent_or_source_thread_metadata
  subagent:
    can:
      - assist_inside_a_thread
    cannot:
      - hold_lease
      - own_runtime
      - accept_uat
```

## 3. double-count and stale-state risks

```yaml
risks:
  duplicate_worker_ownership:
    control: one_active_lease_per_task
    remaining_gap: adapter_should_enforce_thread_registry_before_parallel_scale
  source_thread_id_used_as_role_thread:
    control: source_thread_id_is_parent_provenance_current_thread_id_is_role_thread
    remaining_gap: validator_should_reject_active_lease_when_holder_thread_id_differs_from_current_thread_id
  missing_or_generic_thread_title:
    control: required_title_pattern_PROJECT_PREFIX_TASK_ROLE_SCOPE
    remaining_gap: thread_tool_availability_must_be_recorded_when_title_cannot_be_set
  status_stage_conflation:
    control: Linear_status_is_status_only_stage_in_structured_block
    remaining_gap: adapter_should_validate_before_write
  stale_worker_after_closed_chat:
    control: heartbeat_due_at_TTL_orphan_marker
    remaining_gap: automated_thread_liveness_detection_not_yet_proven
  subagent_misclassified_as_worker:
    control: thread_first_invariant_and_validator
    remaining_gap: operator_discipline_until_adapter_enforces
  user_question_mixed_with_peer_blocker:
    control: Questions_status_only_for_user_authority_input
    remaining_gap: Linear_write_adapter_should_enforce_labels
```

## 4. degraded states

```yaml
degraded_states:
  Linear_unavailable:
    behavior: use_fallback_board
  project_update_backend_missing:
    behavior: use_control_issue_digest
  GitOM_adapter_missing:
    behavior: local_git_repo_plus_gbrain_sync_fallback
  no_thread_tool_available:
    behavior: keep_tasks_ready_or_deferred_do_not_claim_real_worker_pilot
  context_or_helper_tool_degraded:
    behavior: record_degraded_state_and_use_bounded_direct_reads_when_safe
  stale_lease_detected:
    behavior: mark_stale_or_orphan_then_reassign_or_defer
```

## 5. implementation permission

```yaml
implementation_plan_may_start: true
allowed_next_step: adapter_work_or_next_project_activation
must_not_skip:
  - real_thread_registry
  - thread_title_registry
  - current_thread_id_vs_source_thread_id_check
  - lease_TTL_validator
  - orphan_recovery
  - evidence_contract
  - explicit_user_UAT
```
