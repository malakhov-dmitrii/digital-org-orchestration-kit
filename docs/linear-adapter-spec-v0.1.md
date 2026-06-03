# Linear adapter spec v0.1

## 0. grounding

```yaml
grounded_in:
  - outputs/org-operating-model-v0.1.md
  - outputs/canonical-task-schema-and-stage-machine-v0.1.md
  - outputs/control-plane-policies-and-synthetic-pilot-v0.1.md
  - outputs/portable-skill-specs-v0.1.md
scope:
  creates_linear_issues: false
  calls_linear_api: false
  defines_adapter_contract: true
```

## 1. adapter goal

```yaml
adapter_goal:
  primary_task_pool: Linear
  preserves_canonical_task_schema: true
  supports_fallback_export: true
  supports_project_digest: true
  supports_kill_switch_state: true
  supports_orphan_detection: true
```

## 2. Linear object mapping

```yaml
mapping:
  organization_goal:
    linear_surface: Initiative_or_Project
  project:
    linear_surface: Project
  workstream:
    linear_surface: Parent_issue_or_Milestone
  task:
    linear_surface: Issue
  stage:
    linear_surface: structured_state_block_only
    canonical_note: never infer canonical stage from Linear workflow status
  status:
    linear_surface: Workflow_status
    canonical_note: workflow status is the canonical operational status surface
  domain:
    linear_surface: domain_label
  role_lane:
    linear_surface: role_label
  lease:
    linear_surface: structured_issue_comment
  blocker:
    linear_surface: blocked_label_plus_structured_comment
  evidence:
    linear_surface: structured_issue_comment_or_linked_artifact
  review:
    linear_surface: one_canonical_gate_surface_per_task
  qa:
    linear_surface: one_canonical_gate_surface_per_task
  verification:
    linear_surface: one_canonical_gate_surface_per_task
  uat:
    linear_surface: structured_issue_comment_plus_uat_label
  archive:
    linear_surface: final_issue_comment_and_terminal_status
```

### 2.1. canonical surface invariants

```yaml
canonical_surface_invariants:
  issue_workflow_status:
    stores: canonical_status
    must_not_store: canonical_stage
  structured_state_block:
    stores:
      - canonical_stage
      - canonical_status_snapshot
      - stage_changed_at
      - status_changed_at
      - run_instance_id
      - surface_mode
      - side_effect_policy
  stage_status_divergence:
    allowed: true
    reason: Linear has fewer workflow statuses than the portable stage machine
    reporting_rule: digest_must_show_both_stage_and_status_when_they_differ
  organizational_agent_identity:
    canonical_agent_surface: Codex_thread
    lease_holder_requires: holder_thread_id
    subagent_id_can_be_recorded_as: secondary_evidence_actor
    subagent_id_cannot_be:
      - lease_holder
      - runtime_owner
      - uat_acceptor
      - primary_high_impact_verifier
```

## 3. project template

```yaml
project_template:
  name_pattern: "[ORG] <project name>"
  description_blocks:
    - goal
    - autonomy_profile
    - authority_boundaries
    - canonical_surface
    - source_of_truth_map
    - digest_cadence
    - kill_switch_state
    - runtime_owner_rules
```

## 4. workflow statuses

```yaml
portable_canonical_statuses:
  - Intake
  - Context
  - Planning
  - Review Plan
  - Ready
  - Claimed
  - In Progress
  - Blocked
  - Ready For Review
  - Ready For QA
  - Ready For Verification
  - Ready For UAT
  - Reporting
  - Done
  - Deferred
  - Canceled

agents_team_minimal_workflow_statuses:
  backlog:
    - Backlog
    - Deferred
  unstarted:
    - Todo
    - Ready
  started:
    - Research
    - Planning
    - Questions
    - Approval
    - Execution
    - Review
    - Verification
    - Claimed
    - QA
    - Reporting
  completed:
    - Done
  canceled:
    - Canceled
  duplicate:
    - Duplicate

agents_team_statuses_created_for_digital_org:
  - Ready
  - Claimed
  - QA
  - Reporting
  - Deferred

encoded_outside_issue_status:
  - Intake
  - Context
  - Review Plan
  - In Progress
  - Blocked
  - Ready For Review
  - Ready For QA
  - Ready For Verification
  - Ready For UAT
```

## 5. labels

```yaml
labels:
  role:
    - role:chief-orchestrator
    - role:project-orchestrator
    - role:feature-orchestrator
    - role:worker
    - role:reviewer
    - role:verifier
    - role:auditor
    - role:runtime-owner
  domain:
    - domain:orgops
    - domain:development
    - domain:marketing
    - domain:product
    - domain:design
    - domain:research
    - domain:ops
  blocker:
    - blocked:user
    - blocked:peer
    - blocked:runtime-owner
    - blocked:credentials
    - blocked:authority
    - blocked:unclear-spec
    - blocked:external
    - blocked:stale-or-looping
  proof:
    - proof-required
    - review-required
    - qa-required
    - verification-required
    - uat-required
  authority:
    - auth:observe-only
    - auth:local-execution
    - auth:managed-runtime
    - auth:full-project-autonomy
    - auth:public-action-gated
  control:
    - kill-switch:active
    - kill-switch:paused
    - orphan:needs-worker
    - lease:active
    - lease:stale
```

## 6. structured comment blocks

### 6.1. provenance block

```markdown
<!-- digital-org:provenance:v0.1
actor_type: agent
actor_id:
source_thread_id:
requested_by:
authority_source: chat
action_type:
target:
timestamp:
user_visible: true
-->
```

### 6.2. comment prefixes

```yaml
linear_comment_prefixes:
  user_inputs:
    - "User Decision:"
    - "User Correction:"
    - "Approval:"
    - "Reject:"
    - "Kill Switch:"
  agent_updates:
    - "Agent Update:"
    - "Agent Evidence:"
    - "Agent Handoff:"
    - "Agent Verification:"
```

### 6.3. state block

```markdown
<!-- digital-org:state:v0.1
run_instance_id:
surface_mode: dry_run | live_linear | fallback_yaml
side_effect_policy: none | local_only | linear_workspace_only | managed_runtime | public_action_gated
canonical_stage:
canonical_status:
stage_changed_at:
status_changed_at:
status_surface: linear_issue_workflow_status
stage_surface: structured_state_block
-->
```

### 6.4. lease block

```markdown
<!-- digital-org:lease:v0.1
state: active
holder_agent_id:
holder_thread_id:
holder_surface: Codex_thread
subagent_holder_allowed: false
scope:
started_at:
expires_at:
heartbeat_due_at:
stale_policy:
allowed_actions:
forbidden_actions:
-->
```

### 6.5. evidence block

```markdown
<!-- digital-org:evidence:v0.1
id:
kind:
claim:
command:
result:
artifact:
created_at:
by_agent_id:
known_gaps:
provenance_id:
-->
```

### 6.6. blocker block

```markdown
<!-- digital-org:blocker:v0.1
id:
type:
state:
primary: true | false
owner:
reason:
question:
unblock_condition:
created_at:
expires_at:
escalation_target:
provenance_id:
-->
```

### 6.7. verification block

```markdown
<!-- digital-org:verification:v0.1
state:
verifier_agent_id:
acceptance_criteria_checked:
evidence_accepted:
evidence_rejected_or_missing:
authority_uat_state:
known_gaps:
verdict:
next_status:
provenance_id:
-->
```

### 6.8. gate block

```markdown
<!-- digital-org:gate:v0.1
gate_type: review | qa | verification | uat
canonical_surface: child_issue | structured_comment
gate_issue_id:
state:
verdict:
evidence_ids:
known_gaps:
provenance_id:
-->
```

### 6.9. adapter rules

```yaml
adapter_rules:
  agent_created_or_updated_issue_requires_provenance_block: true
  agent_comment_requires_agent_prefix: true
  user_comment_input_requires_user_prefix_for_automatic_action: true
  ambiguous_user_comment: do_not_act_create_blocker
  destructive_request_without_delete_tool: move_to_canceled_or_deferred_with_record
  questions_status_reserved_for_user_or_authority_input: true
  peer_runtime_or_stale_blockers_do_not_use_questions_status: true
  issue_in_questions_status_must_start_with_question_for_user_section: true
  issue_in_approval_status_must_start_with_user_decision_or_uat_section: true
  canonical_stage_requires_structured_state_block: true
  workflow_status_is_canonical_status_only: true
  blocker_labels_require_structured_blocker_block: true
  exactly_one_primary_open_blocker_per_issue: true
  primary_blocker_user_or_authority_routes_to_questions: true
  primary_blocker_peer_runtime_or_stale_must_not_route_to_questions: true
  deferred_status_forbids_active_lease: true
  defer_requires_lease_state:
    - released
    - stale
    - superseded
    - canceled
  gate_surface_must_be_chosen_once_per_task: true
  child_gate_issue_makes_gate_comments_supplemental_only: true
  structured_blocks_must_not_embed_raw_linear_issue_keys: true
  structured_block_issue_references_use:
    - current_issue
    - issue_uuid
    - underscore_ids
  active_lease_requires_codex_thread_id: true
  subagent_may_not_hold_lease: true
  subagent_may_not_be_runtime_owner: true
  subagent_may_not_accept_uat: true
  subagent_verification_is_secondary_unless_low_risk_exception_is_explicit: true
```

## 7. digest update

```yaml
digest_update:
  surfaces:
    - chat
    - linear_control_issue
    - linear_project_update_when_backend_or_confirmed_ui_is_available
  degraded_surface:
    when: project_status_update_backend_unavailable
    canonical_digest_surface: EX-33_control_issue
    required_fields:
      - adapter_health
      - digest_surface
      - last_digest_at
  format:
    - what_now
    - progress
    - off_plan
    - needs_user_attention
    - orphaned_tasks
    - risks
    - next_system_step
    - kill_switch_state
```

## 8. kill switch in Linear

```yaml
kill_switch_linear:
  project_label: kill-switch:paused
  issue_label: kill-switch:paused
  active_worker_action: stop_or_mark_orphaned
  new_lease_action: forbidden
  runtime_action: forbidden
  public_action: forbidden
  emergency_digest_required: true
```

## 9. orphan detection query model

```yaml
orphan_detection_inputs:
  - status_in_progress
  - lease_active
  - heartbeat_due_at
  - worker_thread_id
  - runtime_owner_required
  - verifier_required
outputs:
  - orphan:needs-worker
  - lease:stale
  - blocked:runtime-owner
  - verification_required_without_verifier
```

## 10. no-magic review

```yaml
verdict: degraded_until_reconciliation_rules_are_enforced
open_gaps:
  - exact_linear_custom_field_support
  - exact_linear_api_mutation_shapes
  - team_specific_workflow_constraints
  - project_update_api_behavior
  - structured_block_parser_or_validator
double_count_risks:
  - linear_and_yaml_both_marked_canonical
  - status_and_stage_diverge
  - lease_comment_stale_after_status_change
  - project_digest_hides_issue_level_blocker
  - review_qa_verification_recorded_as_both_comment_and_child_issue
degraded_states:
  linear_unavailable: use_fallback_yaml_and_report_degraded_state
  structured_comment_parse_failure: freeze_task_update_until_repaired
  label_missing: use_comment_block_and_report_adapter_gap
  project_update_backend_missing: use_AI_33_control_issue_for_digest
```
