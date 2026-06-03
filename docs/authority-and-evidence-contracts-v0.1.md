# Authority And Evidence Contracts v0.1

## 0. Grounding

```yaml
grounded_in:
  - outputs/control-plane-policies-and-synthetic-pilot-v0.1.md
  - outputs/canonical-task-schema-and-stage-machine-v0.1.md
  - user_decisions_from_architecture_discussion
scope:
  defines_authority_profiles: true
  defines_evidence_contracts: true
  grants_real_authority: false
```

## 1. Authority Profiles

```yaml
profiles:
  observe_only:
    read_context: true
    create_tasks: false
    edit_local_files: false
    run_workers: false
    deploy_prod: false
    mutate_db: false
    public_action: false
    spend_money: false
  local_execution:
    read_context: true
    create_tasks: true
    edit_local_files: true
    run_checks: true
    run_workers: false
    deploy_prod: false
    mutate_db: false
    public_action: false
    spend_money: false
  managed_runtime:
    read_context: true
    create_tasks: true
    edit_local_files: true
    run_checks: true
    run_workers: true
    mutate_runtime: true
    deploy_staging: true
    deploy_prod: false
    mutate_db: false
    public_action: false
    spend_money: false
  full_project_autonomy:
    read_context: true
    create_tasks: true
    edit_local_files: true
    run_checks: true
    run_workers: true
    mutate_runtime: true
    deploy_staging: true
    deploy_prod: true
    mutate_db: true
    public_action: false
    spend_money: false
    goal_or_scope_change: false
    uat_acceptance: false
  public_action_gated:
    inherits: full_project_autonomy
    public_action: user_approval_required
    spend_money: user_approval_required
    goal_or_scope_change: user_approval_required
    uat_acceptance: user_approval_required
```

## 2. Authority Invariants

```yaml
authority_invariants:
  user_final_authority: true
  missing_grant: denied
  technical_capability_implies_authority: false
  public_action_default: user_gated
  spend_money_default: user_gated
  goal_scope_change_default: user_gated
  uat_acceptance_default: user_gated
  prod_deploy: profile_gated
  db_mutation: profile_gated
  shared_runtime_requires_runtime_owner: true
  bulk_issue_creation: discuss_first
```

## 3. Authority Check Record

```yaml
authority_check:
  task_id:
  action:
  requested_by_agent_id:
  autonomy_profile:
  grant_required:
  grant_present:
  runtime_owner_required:
  runtime_owner:
  user_approval_required:
  user_approval_record:
  decision: allowed | denied | blocked
  reason:
```

## 4. Provenance Contract

```yaml
provenance_channels:
  chat:
    role: control_channel
    user_inputs:
      - command
      - approval
      - rejection
      - kill_switch
      - scope_change
      - clarification
  linear:
    role: durable_task_state
    stores:
      - task
      - status
      - labels
      - lease
      - blocker
      - evidence
      - handoff
  linear_comment:
    role: local_task_input_or_agent_update
    user_prefixes:
      - "User Decision:"
      - "User Correction:"
      - "Approval:"
      - "Reject:"
      - "Kill Switch:"
    agent_prefixes:
      - "Agent Update:"
      - "Agent Evidence:"
      - "Agent Handoff:"
      - "Agent Verification:"
```

```yaml
provenance_record:
  actor_type: user | agent | system
  actor_id:
  source_thread_id:
  requested_by:
  authority_source: chat | linear_comment | autonomy_profile | system_policy
  action_type: create_issue | update_issue | add_label | change_status | create_project | create_milestone | comment | verify | close
  target:
  timestamp:
  user_visible: true
```

```yaml
provenance_rules:
  agent_linear_update_requires_prefix: true
  agent_linear_update_requires_provenance_record: true
  user_authority_requires_explicit_record: true
  ambiguous_linear_comment_action: create_blocked_user_or_blocked_unclear_spec
  delete_request_default: cancel_or_defer_unless_delete_tool_and_authority_exist
```

## 5. Evidence Contract By Gate

```yaml
evidence_by_gate:
  execution:
    requires:
      - worker_claim
      - changed_artifacts_or_actions
      - checks_run_or_skipped_with_reason
      - known_gaps
      - next_action
  review:
    requires:
      - review_verdict
      - findings_or_pass_reason
      - scope_check
      - authority_check
      - evidence_gap_check
  qa:
    requires:
      - scenarios_checked
      - pass_fail_result
      - reproduction_details_for_failures
      - artifacts_when_visual_or_runtime
  verification:
    requires:
      - acceptance_criteria_to_evidence_map
      - independent_check_or_inspection
      - accepted_evidence
      - rejected_or_missing_evidence
      - final_verdict
  uat:
    requires:
      - user_or_authorized_acceptor
      - accepted_scope
      - accepted_gaps_or_deferred_gaps
      - rejection_reason_if_rejected
  reporting:
    requires:
      - compact_digest
      - known_gaps
      - next_checkpoint
      - orphan_state
      - kill_switch_state
  archive:
    requires:
      - final_summary
      - evidence_index
      - lessons_or_no_lessons_record
      - no_active_lease_without_handoff
```

## 6. Evidence Record

```yaml
evidence_record:
  id:
  task_id:
  kind:
  claim:
  source:
  command:
  result:
  artifact:
  created_at:
  by_agent_id:
  checked_by:
  known_gaps:
  provenance:
    actor_type:
    actor_id:
    source_thread_id:
    authority_source:
    action_type:
```

## 7. Evidence Kinds

```yaml
evidence_kinds:
  - artifact
  - command
  - test
  - build
  - typecheck
  - lint
  - static_analysis
  - browser_screenshot
  - runtime_log
  - deploy_receipt
  - db_receipt
  - external_link
  - user_acceptance
  - grounding_check
  - reviewer_finding
  - verifier_check
  - known_gap
```

## 8. Rejection Rules

```yaml
reject_claim_when:
  - evidence_missing
  - evidence_does_not_match_claim
  - acceptance_criterion_unmapped
  - required_check_skipped_without_reason
  - authority_grant_missing
  - runtime_state_undocumented
  - uat_required_but_missing
  - active_lease_without_handoff
```

## 9. No-Magic Review

```yaml
verdict: usable_as_contract_v0.1
open_gaps:
  - project_specific_authority_profiles_needed
  - exact_uat_acceptor_rules_by_project_needed
  - evidence_validator_not_created_yet
double_count_risks:
  - review_evidence_counted_as_verification
  - worker_claim_counted_as_evidence_without_receipt
  - user_feedback_counted_as_uat_without_acceptance_record
degraded_states:
  missing_authority: blocked_authority
  missing_evidence: verification_failed
  missing_uat: ready_for_uat
```
