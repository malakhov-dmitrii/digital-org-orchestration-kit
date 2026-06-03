# Thread-first project workflow v0.1

Status: legacy fallback. Use
`docs/paperclip-native-control-plane-workflow-v0.1.md` as the default workflow
when Paperclip is available.

## 0. scope

```yaml
artifact_type: operating_workflow
applies_to: any_project_using_digital_org_orchestration
primary_agent_surface: Codex_thread_when_paperclip_unavailable
secondary_agent_surface: Codex_subagent
primary_task_pool: Linear_or_fallback_board
fallback_task_pool: local_task_board
```

## 1. invariant

Paperclip-native mode supersedes this invariant. In Paperclip-native mode, a
Codex thread is a provider session and cannot hold the durable lease.

```yaml
thread_first_invariant:
  organizational_agent:
    required_surface: Codex_thread
    examples:
      - chief_orchestrator
      - project_orchestrator
      - feature_or_unit_orchestrator
      - worker
      - reviewer
      - verifier
      - auditor
  subagent:
    allowed_use:
      - bounded_research
      - second_opinion
      - local_review
      - draft_validation
    forbidden_use:
      - durable_task_owner
      - active_lease_holder
      - runtime_owner
      - primary_high_impact_verifier
      - uat_acceptor
```

## 2. stage flow

```yaml
stage_flow:
  intake:
    owner: project_orchestrator
    output: goal_non_goals_constraints_authority_profile
    exit_gate: user_goal_and_acceptance_are_explicit
  context_loading:
    owner: project_orchestrator
    output: project_map_and_known_context
    exit_gate: source_locations_and_missing_context_are_named
  source_of_truth_map:
    owner: project_orchestrator
    output: durable_state_map
    exit_gate: task_pool_runtime_repo_memory_and_user_authority_are_disjoint
  planning:
    owner: project_orchestrator
    output: staged_plan_with_acceptance_and_evidence
    exit_gate: no_magic_review_ready
  second_opinion_no_magic_review:
    owner: reviewer_or_critic
    output: blockers_risks_required_edits
    exit_gate: source_of_truth_authority_reconciliation_and_degraded_states_are_acceptable
  decomposition:
    owner: project_orchestrator
    output: bounded_tasks_and_role_lanes
    exit_gate: every_task_has_scope_evidence_and_owner_policy
  lease_assignment:
    owner: project_orchestrator
    output: active_or_denied_leases
    exit_gate: holder_thread_id_ttl_scope_and_forbidden_actions_are_recorded
  execution:
    owner: worker_thread
    output: changed_artifact_or_completed_deliverable
    exit_gate: evidence_added_and_task_moved_to_review_or_qa
  review:
    owner: reviewer_thread
    output: findings_or_acceptance
    exit_gate: blocking_findings_fixed_or_deferred
  qa:
    owner: qa_or_worker_thread
    output: executable_checks_and_manual_surface_checks
    exit_gate: failures_fixed_or_escalated
  verification:
    owner: verifier_thread
    output: claim_check_against_evidence
    exit_gate: verification_pass_or_fix_request
  uat:
    owner: user_or_user_delegate
    output: approval_rejection_or_change_request
    exit_gate: explicit_user_acceptance_or_explicit_next_task
  reporting_consolidation:
    owner: project_orchestrator
    output: compact_digest
    exit_gate: durable_digest_written
  handoff_archival:
    owner: project_orchestrator
    output: final_state_worker_shutdown_and_archive_record
    exit_gate: no_active_lease_without_handoff
```

## 3. thread registry

```yaml
thread_registry_entry:
  thread_id:
  role:
  project_slug:
  task_id:
  current_stage:
  lease_state:
  heartbeat_due_at:
  authority_profile:
  runtime_surface:
  last_digest_pointer:
```

Rules:

```yaml
registry_rules:
  one_thread_can_have_only_one_active_lease: true
  one_task_can_have_only_one_active_lease: true
  worker_without_task: idle_or_shutdown
  task_in_active_stage_without_worker: orphan_needs_worker_or_defer
  stopped_thread_with_active_lease: stale_after_ttl
```

## 4. blocker routing

```yaml
blocker_routing:
  user_question:
    status: Questions
    first_description_section: Question for user
    examples:
      - unclear_goal
      - authority_needed
      - credentials_needed_from_user
      - uat_decision
  peer_question:
    status: current_work_status_or_Deferred
    route_to: peer_task_or_handoff_comment
  runtime_owner:
    status: current_work_status_or_Deferred
    route_to: runtime_owner_thread
  missing_credentials:
    status: Questions_when_user_owned_else_Deferred
  unclear_spec:
    status: Questions_when_user_clarification_required_else_Planning
  stale_or_looping:
    status: Deferred_or_Replanning
    route_to: auditor_or_project_orchestrator
```

## 5. capacity governor

```yaml
capacity_governor:
  default_worker_threads: 1
  max_before_watchdog_proven: 1
  max_after_watchdog_proven: 3
  max_large_project_default: 6
  increase_requires:
    - active_thread_registry
    - lease_ttl_scan
    - orphan_detection
    - digest_surface
    - clear_runtime_owner_policy
```

## 6. kill switch

```yaml
kill_switch:
  when_active:
    - stop_issuing_new_leases
    - block_public_actions
    - block_db_mutations
    - ask_active_workers_for_handoff
    - mark_orphaned_active_tasks
    - produce_emergency_digest
  task_status_policy:
    default: keep_status_and_add_kill_switch_marker
    if_no_worker_and_active_stage: mark_orphan_needs_worker_or_defer
```

## 7. completion

```yaml
done_when:
  - acceptance_criteria_met_or_deferred
  - verification_evidence_supports_claims
  - uat_state_explicit
  - report_written_to_canonical_digest_surface
  - active_leases_released_or_handed_off
  - worker_shutdown_or_next_checkpoint_recorded
```
