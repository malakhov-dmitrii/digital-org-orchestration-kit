# Canonical task schema and stage machine v0.1

## 0. grounding

This document is grounded in:

- the user's requested target: a digital organization that manages goals, hierarchy, tasks, teams, leases, blockers, evidence, verification, UAT, reporting, handoff, and worker shutdown;
- the prior artifact `outputs/org-operating-model-v0.1.md`;
- the local `agent-orchestrator-pool` skill contract for task pools, worker leases, verifier loops, evidence sync, and durable state;
- the local `no-magic-design-review` skill contract for source-of-truth, authority, stale-data, degradation, and double-count checks.

Rules in this document are proposed operating rules for v0.1. They are not claims about an existing deployed system.

## 1. purpose

This document defines the portable task record and lifecycle rules for the digital organization model.

The schema must work in two surfaces:

- Linear adapter: projects, issues, labels, comments, cycles, milestones.
- Fallback board: `.org/tasks.yaml` as canonical state, with optional Markdown digest generated from it.

The schema is tool-neutral. Linear, GBrain, Codex threads, Superpowers, GStack, Forge-style execution loops, browser agents, and runtime tools are adapters around this record.

## 2. v0.1 decisions

```yaml
decisions:
  canonical_fallback_state: YAML
  markdown_role: summaries_and_reports_only
  linear_role: durable_task_pool_when_available
  dual_surface_rule: mark_one_surface_as_canonical
  state_model:
    stage: lifecycle_position
    status: operational_condition
  worker_closure_rule:
    may_mark_ready_for_review: true
    may_mark_ready_for_verification: true
    may_close_own_task: false
    exception: explicit_low_risk_self_verification
  memory_rule:
    gbrain_and_second_brain: historical_context_sources
    current_task_state: task_pool
```

## 3. concepts

```yaml
concepts:
  goal:
    meaning: user_or_organization_facing_outcome
    may_contain:
      - project
      - workstream
  project:
    meaning: bounded_mission
    includes:
      - durable_source_of_truth
      - authority_rules
      - domain_packs
      - reporting_cadence
  workstream:
    meaning: branch_of_work_inside_project
    owner_roles:
      - project_orchestrator
      - feature_or_unit_orchestrator
  task:
    meaning: smallest_unit_that_can_receive_one_active_lease
  lease:
    meaning: temporary_ownership_of_task_scope_by_one_agent
  evidence:
    meaning: checkable_receipt_linked_to_claim
  blocker:
    meaning: stateful_reason_work_cannot_progress
    required_fields:
      - owner
      - next_action
  organizational_agent:
    meaning: Codex_thread_that_can_own_work
    can_hold_lease: true
    durable_identity_source: thread_id_plus_task_pool_record
  subagent:
    meaning: internal_tool_call_inside_an_organizational_agent_thread
    can_hold_lease: false
    evidence_role: secondary_not_canonical
```

## 4. canonical board shape

Fallback board path:

```text
.org/tasks.yaml
```

Top-level shape:

```yaml
schema_version: digital-org-task-pool/v0.1
canonical_surface: fallback_yaml
organization:
  id: org-default
  name: Digital Organization
projects:
  - id: project-agent-orchestration
    name: Agent Hierarchy Orchestration
    canonical_surface: fallback_yaml
    source_of_truth:
      current_work: .org/tasks.yaml
      memory: GBrain / Second Brain / Codex memory
      project_docs: outputs/
      runtime_evidence: task evidence records
    authority_profile: default-human-gated
    reporting:
      cadence: on_checkpoint
      format: compact_digest
    workstreams: []
tasks: []
agents: []
```

## 5. task record

Minimal complete task:

```yaml
id: TASK-0001
title: Define canonical task schema
goal_id: GOAL-0001
project_id: project-agent-orchestration
workstream_id: workstream-control-plane
domain: orgops
role_lane: worker
stage: execution
status: in_progress
priority: p1
risk: moderate
run_instance_id: digital-org-synthetic-tutorial/live-linear-2026-06-02
surface_mode: live_linear
side_effect_policy: linear_workspace_only

summary:
  goal: Define the portable task record and stage machine.
  acceptance_criteria:
    - Task schema has required fields, enums, and invariants.
    - Stage machine has allowed transitions and owners.
    - Lease, blocker, authority, evidence, review, QA, verification, UAT, and archive fields are represented.
  out_of_scope:
    - Creating Linear issues.
    - Spawning worker threads.

owner:
  agent_id: leader
  thread_id: current-thread
  role: chief_orchestrator
  domain_pack: orgops

lease:
  state: active
  holder_agent_id: leader
  holder_thread_id: current-thread
  scope: outputs/canonical-task-schema-and-stage-machine-v0.1.md
  started_at: "2026-06-02T00:00:00+02:00"
  expires_at: "2026-06-02T02:00:00+02:00"
  heartbeat_due_at: "2026-06-02T00:30:00+02:00"
  stale_policy: recover_to_orchestrator
  allowed_actions:
    - write_spec
    - run_grounding_check
  forbidden_actions:
    - create_linear_issues
    - spawn_worker_threads

authority:
  profile: default-human-gated
  grants:
    read_context: true
    edit_local_files: true
    run_tests_or_checks: true
    mutate_runtime: false
    deploy_staging: false
    deploy_prod: false
    mutate_db: false
    public_action: false
    spend_money: false
    close_task: false
    accept_uat: false

blockers: []

evidence:
  required:
    - kind: artifact
      description: Saved schema document.
    - kind: grounding_check
      description: Anti-slop or manual grounding pass.
  provided: []

review:
  state: not_requested
  reviewer_agent_id: null
  findings: []

qa:
  state: not_required
  scenarios: []

verification:
  state: not_requested
  verifier_agent_id: null
  checks: []
  verdict: null

uat:
  state: not_requested
  requested_from: user
  accepted_by: null
  notes: null

handoff:
  next_action: Run grounding check and decide v0.2 agenda.
  known_gaps: []

archive:
  state: open
  final_summary: null
  closed_at: null
```

## 6. required fields

```yaml
required_task_fields:
  - id
  - title
  - goal_id
  - project_id
  - run_instance_id
  - surface_mode
  - side_effect_policy
  - domain
  - role_lane
  - stage
  - status
  - priority
  - summary.goal
  - summary.acceptance_criteria
  - owner
  - lease
  - authority
  - evidence.required
  - handoff.next_action
  - archive.state
```

## 7. enum values

### 7.1. domain

```yaml
domain:
  - orgops
  - development
  - marketing
  - product
  - design
  - research
  - ops
  - support
  - sales
  - finance
  - legal
  - admin
```

### 7.2. role lane

```yaml
role_lane:
  - chief_orchestrator
  - project_orchestrator
  - feature_orchestrator
  - worker
  - reviewer
  - verifier
  - auditor
  - runtime_owner
```

### 7.3. stage

```yaml
stage:
  - intake
  - context_loading
  - source_of_truth_map
  - planning
  - second_opinion_no_magic_review
  - decomposition
  - lease_assignment
  - execution
  - worker_to_worker_blocker
  - user_question_blocker
  - review
  - qa
  - verification
  - uat
  - reporting_consolidation
  - handoff_archival
  - worker_shutdown
  - archived
  - canceled
```

### 7.4. status

```yaml
status:
  - draft
  - ready
  - claimed
  - in_progress
  - blocked
  - waiting
  - ready_for_review
  - review_failed
  - ready_for_qa
  - qa_failed
  - ready_for_verification
  - verification_failed
  - ready_for_uat
  - uat_rejected
  - accepted
  - done
  - deferred
  - stale
  - canceled
```

### 7.5. priority

```yaml
priority:
  - p0
  - p1
  - p2
  - p3
```

### 7.6. risk

```yaml
risk:
  - low
  - moderate
  - high
  - critical
```

### 7.7. lease state

```yaml
lease.state:
  - none
  - requested
  - active
  - heartbeat_due
  - stale
  - released
  - superseded
  - canceled
```

### 7.8. blocker type

```yaml
blocker.type:
  - blocked_user
  - blocked_peer
  - blocked_runtime_owner
  - blocked_credentials
  - blocked_authority
  - blocked_unclear_spec
  - blocked_external
  - stale_or_looping
```

### 7.9. evidence kind

```yaml
evidence.kind:
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

## 8. field rules

```yaml
field_rules:
  stage:
    meaning: lifecycle_position
    example: verification
  status:
    meaning: operational_condition
    example: ready_for_uat
  owner:
    meaning: current_accountable_agent
    max_current_owners: 1
    owner_must_be_organizational_agent_thread: true
    subagent_cannot_be_task_owner: true
  lease:
    required_unless:
      - archived
      - canceled
    max_active_leases: 1
    deferred_status_forbids_active_lease: true
    holder_thread_id_required_for_active_lease: true
    holder_subagent_id_forbidden_for_active_lease: true
  authority:
    required_before: execution
    missing_grant_value: false
  evidence:
    required_before: execution
    provided_evidence_must_support_claim: true
    full_worker_chat_required_for_inspection: false
    subagent_evidence_allowed_as_secondary_signal: true
    subagent_evidence_cannot_be_only_high_impact_verification: true
  handoff:
    required_for_non_archived_task: true
    blocked_next_action_requires_blocker_owner: true
  canonical_surfaces:
    status_surface: Linear workflow status when Linear is canonical
    stage_surface: structured state block
    infer_stage_from_status: false
  gates:
    one_canonical_surface_per_gate: true
    child_issue_gate_makes_comments_supplemental: true
```

## 9. blocker record

```yaml
blockers:
  - id: BLK-0001
    type: blocked_authority
    state: open
    primary: true
    owner: user
    reason: Production deploy requires explicit authority.
    question: May the deployment owner deploy this change to production?
    unblock_condition: User grants production deploy authority or scope moves to staging-only.
    created_at: "2026-06-02T00:00:00+02:00"
    expires_at: "2026-06-02T04:00:00+02:00"
    escalation:
      after_expiry: keep_non_authority_work_moving
      target: project_orchestrator
```

Blocker states:

```yaml
blocker.state:
  - open
  - waiting
  - escalated
  - resolved
  - superseded
  - canceled
```

## 10. evidence record

```yaml
evidence:
  provided:
    - id: EV-0001
      kind: command
      claim: Schema document exists and passed grounding check.
      command: anti-slop gate --allow-research outputs/canonical-task-schema-and-stage-machine-v0.1.md
      result: pass
      artifact: outputs/canonical-task-schema-and-stage-machine-v0.1.md
      created_at: "2026-06-02T00:00:00+02:00"
      by_agent_id: leader
      known_gaps: []
```

```yaml
evidence_rules:
  each_evidence_record_supports_a_claim: true
  completion_claim_requires_evidence_pointer: true
  evidence_can_include_known_gaps: true
  known_gaps_are_explicit_fields: true
```

## 11. authority profile

Default profile:

```yaml
authority_profiles:
  - id: default-human-gated
    grants:
      read_context: true
      edit_local_files: true
      run_tests_or_checks: true
      use_browser_readonly: true
      mutate_runtime: false
      deploy_staging: false
      deploy_prod: false
      mutate_db: false
      public_action: false
      spend_money: false
      close_task: false
      accept_plan: false
      accept_uat: false
    escalation_required_for:
      - mutate_runtime
      - deploy_prod
      - mutate_db
      - public_action
      - spend_money
      - close_task
      - accept_plan
      - accept_uat
```

```yaml
authority_rules:
  missing_grant: denied
  technical_capability_implies_authority: false
  public_action_requires_explicit_authority: true
  runtime_change_requires_owner_assignment: true
  db_change_requires_owner_assignment: true
```

## 12. stage transition table

```yaml
stage_transitions:
  - from: intake
    to: context_loading
    allowed_by: [chief_orchestrator, project_orchestrator]
    requires: [goal_captured]
  - from: context_loading
    to: source_of_truth_map
    allowed_by: [orchestrator, worker]
    requires: [relevant_sources_identified]
  - from: source_of_truth_map
    to: planning
    allowed_by: [orchestrator]
    requires: [current_truth_separated_from_historical_memory]
  - from: planning
    to: second_opinion_no_magic_review
    allowed_by: [orchestrator]
    requires: [plan_draft_exists]
  - from: second_opinion_no_magic_review
    to: decomposition
    allowed_by: [orchestrator]
    requires:
      - source_of_truth_risks_recorded
      - authority_risks_recorded
      - stale_data_risks_recorded
      - double_count_risks_recorded
  - from: decomposition
    to: lease_assignment
    allowed_by: [orchestrator]
    requires: [tasks_have_acceptance_criteria, tasks_have_evidence_requirements]
  - from: lease_assignment
    to: execution
    allowed_by: [orchestrator]
    requires: [lease_exists, authority_explicit]
  - from: execution
    to: worker_to_worker_blocker
    allowed_by: [worker, orchestrator]
    requires: [needs_peer_worker_result]
  - from: execution
    to: user_question_blocker
    allowed_by: [worker, orchestrator]
    requires: [needs_user_only_decision_or_authority]
  - from: execution
    to: review
    allowed_by: [worker, orchestrator]
    requires: [worker_claim_recorded, worker_evidence_recorded]
  - from: review
    to: execution
    allowed_by: [reviewer, orchestrator]
    requires: [fixes_required]
  - from: review
    to: qa
    allowed_by: [reviewer, orchestrator]
    requires: [review_passed_or_qa_next_gate]
  - from: qa
    to: execution
    allowed_by: [qa, reviewer, orchestrator]
    requires: [qa_failure_requires_fix]
  - from: qa
    to: verification
    allowed_by: [qa, orchestrator]
    requires: [qa_passed_or_not_required]
  - from: verification
    to: execution
    allowed_by: [verifier, orchestrator]
    requires: [evidence_does_not_support_claim]
  - from: verification
    to: uat
    allowed_by: [verifier, orchestrator]
    requires: [verification_passed, user_acceptance_required]
  - from: verification
    to: reporting_consolidation
    allowed_by: [verifier, orchestrator]
    requires: [verification_passed, uat_not_required]
  - from: uat
    to: execution
    allowed_by: [user, orchestrator]
    requires: [user_rejected_or_requested_changes]
  - from: uat
    to: reporting_consolidation
    allowed_by: [user, orchestrator]
    requires: [user_accepted_or_deferred_gaps]
  - from: reporting_consolidation
    to: handoff_archival
    allowed_by: [orchestrator]
    requires: [final_summary_recorded, known_gaps_recorded]
  - from: handoff_archival
    to: worker_shutdown
    allowed_by: [orchestrator]
    requires: [no_active_lease_without_handoff]
  - from: worker_shutdown
    to: archived
    allowed_by: [orchestrator]
    requires: [workers_stopped_archived_or_reassigned]
```

## 13. status transition rules

```yaml
status_transitions:
  draft:
    may_move_to: [ready, canceled]
    requires: [required_fields_exist]
  ready:
    may_move_to: [claimed, deferred, canceled]
    requires: [lease_can_be_assigned]
  claimed:
    may_move_to: [in_progress, stale, canceled]
    requires: [worker_accepts_scope]
  in_progress:
    may_move_to: [blocked, ready_for_review, ready_for_verification, stale, canceled]
    requires: [evidence_or_blocker_updated]
  blocked:
    may_move_to: [in_progress, waiting, deferred, canceled]
    requires: [blocker_owner_or_orchestrator_updates_path]
  waiting:
    may_move_to: [in_progress, stale, deferred, canceled]
    requires: [external_or_peer_action_resolved]
  ready_for_review:
    may_move_to: [review_failed, ready_for_qa, ready_for_verification]
    requires: [reviewer_verdict_recorded]
  review_failed:
    may_move_to: [in_progress, canceled]
    requires: [worker_receives_fixes]
  ready_for_qa:
    may_move_to: [qa_failed, ready_for_verification]
    requires: [qa_verdict_recorded]
  qa_failed:
    may_move_to: [in_progress, canceled]
    requires: [worker_receives_qa_failure]
  ready_for_verification:
    may_move_to: [verification_failed, ready_for_uat, done]
    requires: [verifier_verdict_recorded]
  verification_failed:
    may_move_to: [in_progress, canceled]
    requires: [worker_receives_verifier_rejection]
  ready_for_uat:
    may_move_to: [uat_rejected, accepted, deferred]
    requires: [user_or_authorized_acceptor_verdict_recorded]
  uat_rejected:
    may_move_to: [in_progress, canceled]
    requires: [orchestrator_converts_rejection_into_work]
  accepted:
    may_move_to: [done]
    requires: [final_report_ready]
  done:
    may_move_to: [stale]
    requires: [later_evidence_invalidates_closure]
  stale:
    may_move_to: [ready, claimed, canceled]
    requires: [orchestrator_recovery_decision]
  deferred:
    may_move_to: [ready, canceled]
    requires: [orchestrator_reopen_or_cancel_decision]
  canceled:
    may_move_to: []
    terminal: true
```

## 14. blocker transitions

### 14.1. worker-to-worker blocker

```text
execution -> worker_to_worker_blocker -> execution | deferred
```

```yaml
rules:
  blocking_task_id_required: true
  keep_blocked_task_lease_only_if_useful_work_can_continue: true
  linear_status: keep_current_work_status_or_deferred
  linear_questions_status_allowed: false
  primary_blocker_must_not_be_user_or_authority: true
  no_useful_work_action:
    - release_lease
    - pause_lease
```

### 14.2. user-question blocker

```text
execution -> user_question_blocker -> execution | planning | canceled
```

```yaml
rules:
  question_shape: one_concrete_question
  linear_status: Questions
  description_first_section: question_for_user
  primary_blocker_required: true
  allowed_primary_blocker_types:
    - blocked_user
    - blocked_authority
    - blocked_credentials
    - blocked_unclear_spec
  forbidden_open_primary_blocker_types:
    - blocked_peer
    - blocked_runtime_owner
    - stale_or_looping
  while_waiting: continue_non_authority_work_only
  silence_means_approval: false
```

### 14.3. credentials blocker

```text
execution -> user_question_blocker
```

```yaml
rules:
  linear_status: Questions
  description_first_section: question_for_user
  primary_blocker_required: true
  missing_credentials_as_task_failure: false
  continue_on_surfaces_without_missing_credential: true
```

### 14.4. authority blocker

```text
execution -> user_question_blocker
```

```yaml
rules:
  linear_status: Questions
  description_first_section: question_for_user
  primary_blocker_required: true
  unblock_paths:
    - explicit_approval
    - scope_reduction
  technical_ability_is_sufficient_authority: false
```

### 14.5. stale or looping blocker

```text
execution -> handoff_archival | lease_assignment | planning
```

```yaml
rules:
  evidence_exists: send_to_review_or_verification
  linear_questions_status_allowed: false
  no_evidence_exists:
    - replan
    - reassign
  dead_path: archive_with_reason
```

## 15. lease rules

### 15.1. lease TTL defaults

```yaml
lease_ttl_defaults:
  version: v0.1
  project_override_allowed: true
  research: 2h
  coding: 2h
  review: 1h
  verification: 1h
  marketing: 2h
  ops_readonly: 1h
  runtime_owner: 30m
  public_action_window: 15m
```

### 15.2. heartbeat defaults

```yaml
heartbeat_defaults:
  research: 30m
  coding: 30m
  review: 20m
  verification: 20m
  runtime_owner: 10m
```

### 15.3. lease recovery

```yaml
recovery_sequence:
  - mark_lease_stale
  - read_task_record
  - inspect_provided_evidence
  - inspect_handoff
  - if_evidence_supports_claim:
      move_to:
        - review
        - verification
  - if_evidence_incomplete:
      move_to:
        - ready
        - claimed_with_new_owner
  - if_runtime_may_have_changed:
      assign_before_reassignment:
        - reviewer
        - verifier
  - record_old_lease_as_superseded
```

## 16. validation rules

```yaml
validation_rules:
  draft_to_ready:
    requires:
      - required_fields_exist
  move_to_execution:
    requires:
      - lease_holder_set
      - lease_scope_set
      - lease_ttl_set
      - authority_grants_set
      - forbidden_actions_set
  move_to_review_or_verification_or_done:
    requires:
      - required_evidence_listed
      - provided_evidence_supports_worker_claim
      - known_gaps_explicit
  restricted_actions:
    requires:
      - corresponding_grant_true
  move_to_done:
    requires:
      - verification_passed_or_low_risk_self_verification_exception
      - uat_passed_or_not_required
      - final_summary_exists
      - no_active_lease_remains
      - known_gaps_accepted_deferred_or_resolved
  move_to_approval_or_ready_for_uat:
    requires:
      - uat_question_or_acceptance_request_first_in_description
      - user_or_authorized_acceptor_named
      - silence_means_approval_false
  move_to_deferred:
    requires:
      - active_lease_released_stale_superseded_or_canceled
      - handoff_next_action_exists
  move_to_questions:
    requires:
      - primary_open_blocker_type_is_user_authority_credentials_or_unclear_spec
      - first_description_section_is_question_for_user
      - peer_runtime_or_stale_blockers_not_primary
```

## 17. Linear adapter mapping

| Canonical Field | Linear Surface |
| --- | --- |
| `project_id` | Linear Project |
| `workstream_id` | Parent issue or milestone |
| `id` | Linear issue id |
| `domain` | Label `domain:*` |
| `role_lane` | Label `role:*` |
| `stage` | Structured state block `canonical_stage` |
| `status` | Linear status |
| `priority` | Linear priority |
| `lease` | Issue fields/comment block |
| `authority` | Labels plus issue metadata/comment block |
| `blockers` | Labels `blocked:*` plus comment block |
| `evidence.provided` | Evidence comments or linked artifacts |
| `review` | Review comment or child issue |
| `qa` | QA comment or child issue |
| `verification` | Verification comment or child issue |
| `uat` | UAT comment/label |
| `archive` | Final comment and terminal status |

```yaml
linear_adapter_rules:
  preserve_every_canonical_field: true
  if_native_field_missing: store_in_structured_comment_block
  issue_status_is_canonical_status_only: true
  stage_is_never_inferred_from_issue_status: true
  each_gate_uses_one_canonical_surface: true
```

## 18. markdown digest

Markdown digest is generated from canonical state.

Digest shape:

```markdown
# Project Status

Goal:
Current stage:
Green:
At risk:
Blocked:
Needs user:
Ready for review:
Ready for verification:
Ready for UAT:
Stale leases:
Recent evidence:
Next checkpoint:
```

```yaml
markdown_digest_rules:
  human_readable: true
  canonical_state: false
  agent_updates_target: canonical_state
```

## 19. no-magic review

Verdict: usable as v0.1 schema, not final implementation spec.

Open gaps:

- The YAML schema still needs a validator.
- Linear structured comment format is not defined yet.
- TTL defaults need adjustment after a pilot.
- Domain packs need their own evidence templates.
- GBrain update policy needs a separate lifecycle rule.

Double-count risks:

- Same task stored as canonical in both Linear and YAML.
- Same runtime surface assigned to two owners.
- Same worker claim counted as review and verification.
- Historical memory treated as current task state.

Degraded states:

- Linear unavailable: use YAML fallback.
- YAML invalid: freeze task updates until validation passes.
- GBrain stale: use memory only as context.
- Verifier unavailable: keep task out of `done`.
- User unavailable: continue only actions that do not need user authority.

## 20. next spec slice

The next useful slice is `portable-skill-specs-v0.1`:

- `digital-org-orchestrator`
- `digital-org-worker`
- `digital-org-reviewer`
- `digital-org-verifier`
- `digital-org-auditor`
