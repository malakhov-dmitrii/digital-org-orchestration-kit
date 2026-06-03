# Gas Town pattern implementation roadmap v0.1

## 0. scope

```yaml
artifact_type: implementation_roadmap
source_inspiration:
  - outputs/gastown-inspiration-notes-v0.1.md
  - https://github.com/steveyegge/gastown
  - https://docs.gastownhall.ai/
decision:
  copy_gastown_runtime: false
  adopt_patterns_selectively: true
  primary_task_pool: Linear
  organizational_agent_surface: Codex_thread
  subagent_surface: secondary_internal_tool
```

## 1. roadmap summary

```yaml
sequence:
  - thread_registry_plus_linear_lease_schema
  - handoff_mailbox_protocol
  - auditor_watchdog_scan
  - capacity_governor
  - real_codex_thread_pilot
  - development_domain_verification_release_queue
```

## 2. pattern slices

### 2.1. worker identity registry

```yaml
gastown_inspiration: Polecats
digital_org_name: thread_registry
goal: every durable agent has a persistent identity even if its session stops
canonical_surface: Linear_control_issue_or_project_level_registry
minimum_fields:
  - agent_id
  - thread_id
  - role
  - domain
  - active_task_id
  - active_lease_id
  - heartbeat_due_at
  - last_seen_at
  - status
  - handoff_issue_id
first_slice:
  - create_registry_block_template
  - require_thread_id_for_active_lease
  - add_registry_readback_check
acceptance_evidence:
  - registry_has_orchestrator_worker_verifier_auditor_entries
  - active_lease_points_to_registry_thread_id
  - stopped_thread_can_be_marked_stale_or_orphaned
```

### 2.2. work ledger through Linear

```yaml
gastown_inspiration: Beads_and_Convoys
digital_org_name: linear_work_ledger
goal: keep durable work state outside hidden chats
mapping:
  project_container: Linear_project
  workstream: parent_issue_or_milestone
  task: child_issue
  issue_group: convoy_like_workstream
required_fields:
  - run_instance_id
  - canonical_task_id
  - linear_issue_id
  - canonical_stage
  - canonical_status
  - owner_thread_id
  - evidence_ids
first_slice:
  - add_canonical_task_id_to_issue_description_template
  - create_canonical_task_id_to_linear_issue_id_table
  - validate_stage_status_surface_split
acceptance_evidence:
  - every_active_issue_has_run_instance_id
  - every_active_issue_has_canonical_task_id
  - no_task_has_two_canonical_issue_ids
```

### 2.3. handoff and mailbox protocol

```yaml
gastown_inspiration: handoff_mailbox
digital_org_name: thread_mailbox
goal: make agent-to-agent communication durable and inspectable
canonical_surface: Linear_comments_or_handoff_blocks
message_types:
  - Agent Handoff
  - Agent Evidence
  - Agent Blocker
  - Agent Verification
  - User Decision
minimum_handoff_fields:
  - from_thread_id
  - to_role_or_thread_id
  - task_id
  - done
  - evidence
  - remaining_work
  - blocker
  - next_action
first_slice:
  - create_comment_templates
  - require_handoff_before_worker_shutdown
  - add_worker_to_worker_blocker_template
acceptance_evidence:
  - worker_can_handoff_to_verifier_without_chat_context
  - verifier_can_act_from_linear_only
  - unresolved_handoff_has_owner_and_next_action
```

### 2.4. watchdog and orphan recovery

```yaml
gastown_inspiration: Witness_Deacon_Dogs
digital_org_name: auditor_watchdog
goal: detect stopped_or_stale_work_before_user_notices
first_version: manual_auditor_thread_scan
scan_inputs:
  - active_leases
  - heartbeat_due_at
  - last_seen_at
  - tasks_in_progress
  - Questions_labels
  - Deferred_labels
  - runtime_owner_fields
flags:
  - active_lease_without_live_thread
  - heartbeat_overdue
  - Deferred_plus_active_lease
  - Questions_with_peer_or_runtime_blocker
  - verification_ready_without_verifier
  - runtime_surface_without_owner
first_slice:
  - build_auditor_checklist
  - run_checkpoint_scan_on_synthetic_project
  - write_findings_to_control_issue
acceptance_evidence:
  - scan_finds_known_synthetic_bad_states
  - scan_produces_next_action_for_each_flag
  - scan_does_not_close_tasks_without_verification
```

### 2.5. capacity governor

```yaml
gastown_inspiration: Scheduler
digital_org_name: lease_capacity_governor
goal: prevent too_many_workers_from_creating_coordination_failure
initial_policy:
  max_active_worker_threads_per_project: 1
  max_after_heartbeat_and_orphan_recovery_proven: 3
  one_runtime_owner_per_surface: true
  one_db_owner_per_migration_chain: true
  one_deploy_owner_per_environment: true
lease_denial_reasons:
  - heartbeat_missing
  - stale_lease_open
  - runtime_owner_conflict
  - db_or_deploy_owner_conflict
  - unverified_claim_blocks_next_work
  - user_question_blocker_open
first_slice:
  - create_governor_rules_block
  - require_capacity_check_before_new_worker_thread
  - record_denied_lease_reason_in_linear
acceptance_evidence:
  - orchestrator_refuses_second_worker_when_limit_is_1
  - denied_lease_has_reason_and_reopen_condition
  - limit_can_raise_to_3_only_after_watchdog_pass
```

### 2.6. session recovery

```yaml
gastown_inspiration: Seance
digital_org_name: thread_recovery_protocol
goal: recover_work_from_linear_without_requiring_full_old_chat_context
recovery_inputs:
  - thread_registry_entry
  - active_or_stale_lease
  - evidence_blocks
  - handoff_blocks
  - latest_comments
  - acceptance_criteria
  - known_gaps
recovery_actions:
  - continue
  - verify
  - reassign
  - mark_stale
  - archive_with_reason
first_slice:
  - write_recovery_decision_tree
  - simulate_stopped_worker_thread
  - reassign_task_to_new_thread
acceptance_evidence:
  - new_thread_can_resume_from_linear_only
  - old_lease_is_released_or_superseded
  - recovery_action_is_recorded_in_control_issue
```

### 2.7. development verification and release queue

```yaml
gastown_inspiration: Refinery
digital_org_name: development_refinery
goal: prevent_code_work_from_skipping_review_verification_release_gates
defer_until:
  - thread_registry_exists
  - handoff_protocol_exists
  - watchdog_scan_exists
  - capacity_governor_exists
first_slice:
  - development_domain_release_gate_spec
  - worktree_owner_policy
  - verifier_required_before_merge_or_deploy
acceptance_evidence:
  - code_task_cannot_mark_done_without_verifier_gate
  - deploy_task_requires_runtime_owner_and_authority
  - merge_or_release_digest_has_evidence_index
```

## 3. immediate Linear task candidates

```yaml
linear_task_candidates:
  - title: "Thread registry: define worker identity block and readback check"
    role: project_orchestrator
    status: Ready
  - title: "Lease schema: require thread_id for active lease"
    role: worker
    status: Ready
  - title: "Mailbox: add handoff and worker-to-worker blocker templates"
    role: worker
    status: Ready
  - title: "Watchdog: run auditor scan on synthetic project"
    role: auditor
    status: Ready
  - title: "Capacity governor: enforce max active worker threads"
    role: project_orchestrator
    status: Ready
  - title: "Recovery: simulate stopped worker and reassignment"
    role: verifier
    status: Ready
```

## 4. not yet

```yaml
defer:
  - federation_or_marketplace
  - high_worker_counts
  - replacing_Linear_with_git_backed_storage
  - production_runtime_automation
  - cross_project_worker_market
```

## 5. first pilot shape

```yaml
real_codex_thread_pilot:
  threads:
    - orchestrator_thread
    - worker_thread
    - verifier_thread
    - auditor_or_reviewer_thread
  project: "[ORG] Digital Org Synthetic Tutorial"
  scope: thread_registry_plus_handoff_only
  max_active_worker_threads: 1
  success:
    - worker_thread_claims_lease
    - worker_thread_updates_heartbeat
    - worker_thread_handoffs_to_verifier
    - verifier_can_validate_from_Linear_only
    - auditor_detects_no_orphaned_work
```
