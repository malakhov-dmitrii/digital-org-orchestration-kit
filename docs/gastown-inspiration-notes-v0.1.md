# Gas Town inspiration notes v0.1

## 0. scope

```yaml
artifact_type: inspiration_review
source:
  repo: https://github.com/gastownhall/gastown
  readme_raw: https://raw.githubusercontent.com/gastownhall/gastown/main/README.md
review_date: 2026-06-02
decision_mode: adopt_adapt_defer_reject
implementation_plan: false
purpose: concept_review_for_thread_first_orchestration
```

## 1. useful parallels

```yaml
parallels:
  Mayor:
    gastown_role: primary_AI_coordinator
    digital_org_candidate: chief_or_project_orchestrator_thread
    decision: adapt
  Rigs:
    gastown_role: project_containers_wrapping_git_repos
    digital_org_candidate: Linear_project_plus_workspace_or_worktree_boundary
    decision: adapt
  Polecats:
    gastown_role: worker_agents_with_persistent_identity_and_ephemeral_sessions
    digital_org_candidate: Codex_worker_threads_with_durable_identity_in_Linear
    decision: adapt
  Hooks:
    gastown_role: git_worktree_based_persistent_storage
    digital_org_candidate: Linear_issue_blocks_plus_optional_worktree_state
    decision: adapt
  Beads:
    gastown_role: git_backed_issue_tracking_structured_data
    digital_org_candidate: Linear_issues_or_fallback_task_board_records
    decision: adapt
  Convoys:
    gastown_role: work_tracking_units_bundling_multiple_issues
    digital_org_candidate: Linear_parent_issue_milestone_or_workstream
    decision: adapt
  Witness_Deacon_Dogs:
    gastown_role: watchdog_and_supervisor_chain
    digital_org_candidate: auditor_monitor_plus_maintenance_worker_threads
    decision: adapt_after_thread_pilot
  Refinery:
    gastown_role: merge_queue_with_verification_gates
    digital_org_candidate: release_or_merge_gate_for_development_domain
    decision: defer_to_development_domain
  Escalation:
    gastown_role: severity_routed_blocker_escalation
    digital_org_candidate: blocker_severity_and_routing_policy
    decision: adopt
  Scheduler:
    gastown_role: capacity_governor_for_worker_dispatch
    digital_org_candidate: max_active_thread_leases_and_dispatch_queue
    decision: adopt_minimal
  Seance:
    gastown_role: session_discovery_and_predecessor_query
    digital_org_candidate: thread_handoff_archive_and_recovery_protocol
    decision: adapt
  Wasteland:
    gastown_role: federated_work_coordination
    digital_org_candidate: cross_project_or_cross_org_marketplace
    decision: defer
```

## 2. concepts to adopt now

```yaml
adopt_now:
  thread_first_worker_identity:
    rule: organizational_agent_is_a_Codex_thread
    reason: durable_lease_heartbeat_handoff_and_recovery_need_thread_identity
  capacity_governor:
    rule: max_active_thread_leases_per_project
    initial_value: 1_until_heartbeat_and_orphan_recovery_are_proven
  escalation_severity:
    levels:
      - P0_user_or_authority_blocker
      - P1_runtime_or_db_owner_blocker
      - P2_peer_or_external_blocker
  session_recovery:
    rule: closed_thread_recovered_from_Linear_lease_handoff_and_evidence
```

## 3. concepts to adapt later

```yaml
adapt_later:
  watchdog_chain:
    digital_org_names:
      witness: project_auditor_thread
      deacon: cross_project_health_orchestrator
      dogs: maintenance_worker_threads
    prerequisite: heartbeat_events_and_thread_registry
  merge_queue:
    digital_org_name: development_release_refinery
    prerequisite: development_domain_pack_and_worktree_policy
  formulas_or_molecules:
    digital_org_name: portable_workflow_templates
    prerequisite: validator_for_stage_transitions_and_evidence
```

## 4. do not copy blindly

```yaml
do_not_copy_blindly:
  git_backed_hooks_as_single_truth:
    reason: current_model_prefers_Linear_as_durable_task_pool_when_available
  high_worker_counts:
    reason: current_pilot_has_not_proven_heartbeat_or_orphan_recovery
  federation:
    reason: cross_org_work_marketplace_is_not_needed_for_v0_1
```

## 5. immediate spec changes from this review

```yaml
spec_changes:
  - real_worker_reviewer_verifier_auditor_means_Codex_thread
  - subagent_output_is_secondary_evidence
  - thread_registry_needed_before_scaling
  - next_pilot_should_be_real_codex_thread_pilot
next_artifact:
  - outputs/gastown-pattern-implementation-roadmap-v0.1.md
```
