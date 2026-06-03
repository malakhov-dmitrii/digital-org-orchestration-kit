# Control loops: heartbeats, watchdogs, auditors v0.1

```yaml
artifact_type: control_loop_spec
applies_to:
  - chief_orchestrator
  - project_orchestrator
  - watchdog
  - auditor
  - worker
primary_task_pool: Linear
fallback_task_pool: local_task_board
```

## 1. purpose

```yaml
control_loop_goal:
  - prove_work_is_still_moving
  - prove_work_is_moving_toward_the_goal
  - detect_tasks_without_workers
  - detect_workers_without_valid_tasks
  - detect_stale_leases
  - detect_lease_registry_control_divergence
  - detect_agents_looping_without_material_delta
  - route_user_questions_and_blockers_quickly
  - create_improvement_proposals_after_work
```

## 2. heartbeat lanes

```yaml
heartbeat_lanes:
  worker_heartbeat:
    owner: worker_thread
    writes_to: task_issue_or_fallback_task
    default_due_policy: before_ttl_and_after_material_change
    content:
      - current_action
      - material_delta_since_last_heartbeat
      - evidence_added
      - blocker_state
      - next_action
      - heartbeat_due_at
  orchestrator_heartbeat:
    owner: project_orchestrator
    writes_to: control_issue_or_project_digest
    content:
      - active_tasks
      - active_threads
      - blocked_tasks
      - orphaned_tasks
      - goal_progress
      - next_checkpoint
  watchdog_heartbeat:
    owner: watchdog_thread_or_automation
    writes_to: watchdog_state_section
    content:
      - scan_time
      - stale_leases
      - orphaned_active_tasks
      - workers_without_valid_task
      - lease_registry_control_divergence
      - loop_suspicions
      - escalations_created
```

## 3. watchdog roles

```yaml
watchdogs:
  liveness_watchdog:
    checks:
      - active_task_has_worker_or_orphan_marker
      - active_worker_has_valid_task
      - lease_heartbeat_not_overdue
      - task_lease_thread_registry_and_control_record_agree
      - active_lease_holder_thread_id_equals_current_thread_id
      - no_deferred_task_has_active_lease
    allowed_actions:
      - mark_lease_stale
      - mark_orphan_needs_worker
      - request_worker_handoff
      - escalate_to_project_orchestrator
  goal_drift_watchdog:
    checks:
      - current_work_maps_to_project_goal
      - current_task_has_acceptance_criteria
      - heartbeat_has_material_delta
      - repeated_actions_are_not_replacing_progress
    allowed_actions:
      - mark_stale_or_looping_blocker
      - request_replan
      - escalate_goal_drift_to_orchestrator
  blocker_router:
    checks:
      - question_tasks_have_user_question_first
      - peer_blockers_are_not_in_Questions
      - credentials_and_authority_blockers_have_owner
    allowed_actions:
      - move_to_Questions_when_user_input_required
      - keep_peer_or_runtime_blocker_in_work_status_or_Deferred
      - add_unblock_condition
  retrospective_auditor:
    checks:
      - completed_work_has_evidence
      - verification_matched_claim
      - handoff_was_written_before_shutdown
      - process_failure_or_improvement_opportunity
      - bounded_stop_policy_was_followed
    allowed_actions:
      - propose_skill_update
      - propose_template_update
      - propose_validator_update
      - write_audit_digest
```

## 4. loop detection

```yaml
loop_detection:
  material_delta_examples:
    - task_state_changed_with_reason
    - evidence_added
    - blocker_reduced_or_routed
    - code_or_artifact_changed
    - verification_result_added
  loop_signals:
    - repeated_planning_without_new_decision
    - repeated_search_without_new_source
    - repeated_test_runs_without_fix_or_hypothesis_change
    - active_task_without_evidence_delta_after_multiple_heartbeats
    - worker_reports_progress_but_acceptance_criteria_do_not_move
  response:
    - mark_blocked_stale_or_looping
    - ask_for_specific_next_delta
    - escalate_to_project_orchestrator
```

## 4.1. bounded stop policy

```yaml
bounded_stop_policy:
  applies_to:
    - worker
    - reviewer
    - verifier
    - watchdog
    - auditor
  trigger_examples:
    - no_artifact_after_multiple_material_updates
    - repeated_prose_or_review_loop_without_new_evidence
    - tool_failure_repeated_after_fallback_available
    - watchdog_reports_loop_suspicion
  required_response:
    - write_current_artifact_or_explicit_gap
    - update_task_record
    - release_extend_or_mark_lease_stale
    - handoff_to_orchestrator_with_next_smallest_action
```

## 5. escalation matrix

```yaml
escalation_matrix:
  task_in_active_status_without_worker:
    label: orphan:needs-worker
    status: current_status_or_Deferred
    owner: project_orchestrator
  worker_thread_stopped_with_active_lease:
    label: lease:stale
    status: current_status_or_Deferred
    owner: project_orchestrator
  lease_registry_control_divergence:
    status: current_status_or_Deferred
    label: lease:reconcile
    owner: project_orchestrator
    required_action: reconcile_task_lease_thread_registry_and_control_record_atomically
  user_input_required:
    status: Questions
    required_first_section: Question for user
    owner: user
  authority_or_credentials_required:
    status: Questions_when_user_owned_else_Deferred
    owner: authority_holder
  peer_or_runtime_blocker:
    status: current_status_or_Deferred
    owner: peer_or_runtime_owner
  goal_drift_or_looping:
    status: Planning_or_Deferred
    label: blocked:stale-or-looping
    owner: project_orchestrator
```

## 5.1. degraded tool fallback

```yaml
degraded_tool_fallback:
  context_or_helper_tool_unavailable:
    record:
      - tool_name
      - failure_summary
      - fallback_used
    continue_with:
      - bounded_direct_local_reads
      - compact_summary_scripts
      - smallest_needed_verification
    forbidden:
      - blocking_the_role_on_recoverable_tooling_failure
      - hiding_degraded_state_from_evidence
```

## 6. auditor cadence

```yaml
auditor_cadence:
  during_active_work:
    use: watchdog_scan
    output: compact_health_digest
  after_task_completion:
    use: retrospective_audit
    output: process_findings_and_improvement_candidates
  after_milestone:
    use: milestone_audit
    output: skill_template_validator_update_proposals
  after_incident_or_kill_switch:
    use: incident_audit
    output: root_cause_recovery_and_policy_update
```

## 7. status digest

```text
Goal:
Current checkpoint:
Active threads:
Active tasks:
Orphaned tasks:
Stale leases:
Lease/registry/control divergence:
Blocked user:
Blocked peer/runtime:
Loop suspicion:
Material progress since last scan:
Actions taken:
Escalations:
Next scan:
```
