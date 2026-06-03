# Control plane policies and synthetic pilot v0.1

## 0. grounding

This document records user decisions from the architecture discussion and connects them to:

- `outputs/org-operating-model-v0.1.md`
- `outputs/canonical-task-schema-and-stage-machine-v0.1.md`
- the local `agent-orchestrator-pool` skill
- the local `no-magic-design-review` skill

It does not create Linear issues, worker threads, or runtime actions.

## 0.1. execution surface taxonomy

```yaml
execution_surface_taxonomy:
  organizational_agent:
    canonical_surface: Codex_thread
    applies_to:
      - chief_orchestrator
      - project_orchestrator
      - feature_or_unit_orchestrator
      - worker
      - reviewer
      - verifier
      - auditor
    can_hold_linear_lease: true
    can_be_runtime_owner: authority_gated
    can_be_orphaned_or_stale: true
    requires:
      - thread_id
      - linear_task_record
      - lease_or_explicit_observe_only_role
      - heartbeat_or_handoff
  subagent:
    canonical_surface: internal_tool_call_inside_a_Codex_thread
    can_hold_linear_lease: false
    can_be_runtime_owner: false
    can_close_uat: false
    can_be_primary_verifier_for_high_impact_work: false
    allowed_uses:
      - critic_pass
      - small_research_slice
      - local_sanity_check
      - comparison_of_options
      - secondary_verification_signal
    evidence_classification: secondary_not_canonical
```

## 1. confirmed direction

```yaml
final_target:
  includes:
    - architecture_specs
    - portable_skill_specs
    - installable_codex_skills
    - linear_first_task_pool
    - fallback_task_board
    - synthetic_dry_run_pilot_without_real_workers
    - pilot_with_real_codex_threads_after_dry_run

durable_task_pool:
  primary: Linear
  fallback: local_task_board
  fallback_role: backup_and_portability
  file_risk: file_boards_can_fragment_or_get_lost

skill_packaging:
  codex_install_location: ~/.codex/skills
  specs_location: project_outputs
  portability_target:
    - Codex
    - Claude_Code
    - OpenCode
    - other_agent_runtimes

initial_domain_packs:
  - orgops
  - development

first_pilot:
  type: synthetic_tutorial_project
  real_codex_threads: false
  subagents_as_primary_workers: false
  purpose: run_every_stage_and_role_before_live_project_use
```

## 2. authority model

The user is final authority.

Chief/project orchestrators may accept plans and act autonomously when the project profile grants that authority. Public communications, spending money, goal/scope changes, and UAT acceptance remain user-gated unless the user explicitly changes that for a project.

Prod deploy and DB mutation are not globally forbidden. They are allowed only when the active autonomy profile grants `deploy_prod` or `mutate_db`.

```yaml
authority_baseline:
  final_authority: user
  chief_orchestrator_can_accept_plans: true
  project_autonomy_profiles_allowed: true
  public_communications_default: user_approval_required
  spending_money_default: user_approval_required
  goal_or_scope_change_default: user_approval_required
  uat_acceptance_default: user_approval_required
  prod_deploy_default: denied_unless_profile_grants
  db_mutation_default: denied_unless_profile_grants
  task_issue_creation_default: allowed
  bulk_issue_creation_default: discuss_first
```

## 3. autonomy profiles v0.1

```yaml
autonomy_profiles:
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
    read_context: true
    create_tasks: true
    edit_local_files: true
    run_checks: true
    run_workers: true
    mutate_runtime: true
    deploy_staging: true
    deploy_prod: true
    mutate_db: true
    public_action: user_approval_required
    spend_money: user_approval_required
    goal_or_scope_change: user_approval_required
    uat_acceptance: user_approval_required
```

## 4. kill switch policy

Kill switch must exist at three scopes:

```yaml
kill_switch_scopes:
  - project
  - workstream
  - whole_system
```

Kill switch action:

```yaml
kill_switch_action:
  stop_new_leases: true
  stop_or_interrupt_active_workers: true
  forbid_runtime_actions: true
  forbid_public_actions: true
  gather_emergency_digest: true
  mark_control_state: paused_by_user
  preserve_task_stage: true
  preserve_task_status: true
  run_orphan_detection: true
```

```yaml
paused_state_policy:
  rewrite_all_task_statuses_to_paused: false
  preserve_task_stage: true
  preserve_task_status: true
  record_control_plane_pause_state: true
  run_orphan_detection_after_pause: true

orphan_detection:
  detects:
    - task_status_in_progress_but_no_active_worker
    - active_lease_but_worker_thread_missing
    - runtime_owner_missing_for_runtime_task
    - blocker_expired_without_owner_action
    - verification_ready_but_no_verifier_assigned
  recovery_options:
    - explicitly_pause_task
    - assign_new_worker
    - assign_reviewer_or_verifier
    - release_stale_lease
    - request_user_decision
```

## 5. digest policy

Digest v1 must be readable without reading chats.

Delivery:

```yaml
digest_delivery_v1:
  chat: required
  linear_project_update: required
  file_artifact: optional
  telegram_adapter: later
```

Tone:

```yaml
digest_tone:
  language: Russian_when_user_context_is_Russian
  style: short_human_plain
  audience: user_wants_clear_status_without_deep_context
```

Digest shape:

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

## 6. memory policy

Memory is not only storage. It must become reusable operational knowledge.

```yaml
memory_policy:
  orchestrator_lessons_after_completion: true
  auditor_memory_updates_after_milestones: true
  periodic_chat_extraction_jobs_exist: true
  memory_goal: reusable_rules_skills_templates
  avoid_operational_noise: true
  deduplication_required: true
  cleanup_required: true
  stale_memory_handling: mark_as_historical_context
```

Memory update candidates:

- repeated blockers;
- repeated bad task shapes;
- evidence patterns that worked;
- authority mistakes;
- runtime ownership conflicts;
- digest improvements;
- skill improvements;
- domain pack additions.

## 7. minimal Linear structure v0.1

Linear is the preferred durable task pool.

### 7.1. project shape

```yaml
linear_project:
  name_pattern: "[ORG] <project name>"
  description_contains:
    - goal
    - autonomy_profile
    - authority_boundaries
    - digest_cadence
    - kill_switch_state
    - source_of_truth_map
```

### 7.2. milestones / cycles

```yaml
milestones:
  - name: Intake And Context
  - name: Plan And No-Magic Review
  - name: Decomposition And Leases
  - name: Execution
  - name: Review QA Verification
  - name: UAT And Reporting
  - name: Archive And Retrospective
```

### 7.3. labels

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

### 7.4. statuses

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
  - Backlog
  - Deferred
  - Todo
  - Ready
  - Research
  - Planning
  - Questions
  - Approval
  - Execution
  - Review
  - Claimed
  - QA
  - Verification
  - Reporting
  - Done
  - Canceled
  - Duplicate

synthetic_pilot_status_mapping:
  ready_for_lease: Ready
  claimed_or_leased: Claimed
  context_loading: Research
  planning: Planning
  user_or_authority_question: Questions
  peer_or_runtime_blocker: Deferred
  waiting_for_user_acceptance: Approval
  execution: Execution
  review: Review
  qa: QA
  verification: Verification
  reporting: Reporting
  deferred_or_paused: Deferred
  complete: Done
  canceled: Canceled
```

Questions policy:

```yaml
questions_status_policy:
  questions_status_means: user_or_authority_input_required
  not_a_general_blocked_bucket: true
  user_attention_statuses:
    Questions: execution_blocker_needs_user_or_authority_input
    Approval: uat_or_plan_acceptance_needs_user_or_authorized_acceptor
  allowed_question_labels:
    - blocked:user
    - blocked:authority
    - blocked:credentials
    - blocked:unclear-spec
  not_for_questions_status:
    - blocked:peer
    - blocked:runtime-owner
    - blocked:stale-or-looping
  non_user_blocker_routing:
    blocked_peer: keep_current_work_status_or_defer
    blocked_runtime_owner: keep_current_work_status_or_defer
    blocked_stale_or_looping: defer_and_orphan_detect
  issue_description_rule:
    if_status_questions: first_section_must_be_question_for_user
    if_status_approval: first_section_must_be_user_decision_or_uat_request
  blocker_rule:
    exactly_one_primary_open_blocker: true
    questions_primary_blocker_allowed:
      - blocked:user
      - blocked:authority
      - blocked:credentials
      - blocked:unclear-spec
    questions_primary_blocker_forbidden:
      - blocked:peer
      - blocked:runtime-owner
      - blocked:stale-or-looping
  lease_rule:
    deferred_status_forbids_lease_active: true
```

### 7.5. issue template

```markdown
## question for user
- required when status is Questions or label is blocked:user / blocked:authority / blocked:credentials / blocked:unclear-spec.
- question:
- why this blocks work:
- acceptable answer format:
- what happens after answer:

## user decision / uat request
- required when status is Approval or UAT is waiting for the user.
- decision requested:
- accepted answer format:
- what will happen after approval:
- what will happen after rejection:

## goal

## scope

## out of scope

## stage / status

## lease
- owner:
- scope:
- started_at:
- expires_at:
- heartbeat_due_at:

## authority

## acceptance criteria

## required evidence

## blockers

## provided evidence

## handoff

## known gaps
```

## 8. synthetic tutorial pilot

Pilot name:

```text
digital-org-synthetic-tutorial
```

Run identity:

```yaml
run_identity_rules:
  run_instance_id_required: true
  dry_run_example: digital-org-synthetic-tutorial/dry-run-2026-06-02
  live_linear_example: digital-org-synthetic-tutorial/live-linear-2026-06-02
  surface_mode_required: true
  allowed_surface_modes:
    - dry_run
    - live_linear
    - fallback_yaml
  side_effect_policy_required: true
  allowed_side_effect_policies:
    - none
    - local_only
    - linear_workspace_only
    - managed_runtime
    - public_action_gated
  canonical_task_id_to_linear_issue_id_map_required_for_live_linear: true
```

Pilot purpose:

```yaml
purpose:
  - exercise_all_stages
  - exercise_all_core_roles
  - exercise_lease_and_orphan_detection
  - exercise_blocker_routing
  - exercise_review_qa_verification_uat
  - exercise_digest
  - exercise_kill_switch
  - avoid_real_runtime_or_public_actions
```

Synthetic project:

```yaml
project:
  name: Digital Org Tutorial Site
  goal: Produce a tiny static tutorial artifact and prove the organization can move it from intake to archive.
  domain_packs:
    - orgops
    - development
  autonomy_profile: local_execution
  runtime_actions: none
  public_actions: none
```

Synthetic tasks:

```yaml
tasks:
  - id: SYN-001
    role_lane: project_orchestrator
    stage: intake
    goal: Define tutorial project goal and acceptance criteria.
  - id: SYN-002
    role_lane: worker
    stage: context_loading
    goal: Build source-of-truth map from local specs.
  - id: SYN-003
    role_lane: feature_orchestrator
    stage: decomposition
    goal: Split tutorial into worker/reviewer/verifier tasks.
  - id: SYN-004
    role_lane: worker
    stage: execution
    goal: Create tiny tutorial artifact.
  - id: SYN-005
    role_lane: reviewer
    stage: review
    goal: Review tutorial artifact for scope and clarity.
  - id: SYN-006
    role_lane: worker
    stage: qa
    goal: Run QA checks on tutorial artifact.
  - id: SYN-007
    role_lane: verifier
    stage: verification
    goal: Verify evidence against acceptance criteria.
  - id: SYN-008
    role_lane: chief_orchestrator
    stage: uat
    goal: Present user acceptance summary.
  - id: SYN-009
    role_lane: auditor
    stage: handoff_archival
    goal: Produce retrospective and skill/template improvements.
```

Dry-run mode:

```yaml
dry_run:
  real_worker_threads: false
  actor_model: one_chat_simulates_roles
  linear_issues: not_created_unless_user_allows
  expected_output:
    - task_records
    - stage_transitions
    - leases
    - blocker_example
    - review_record
    - verification_record
    - digest
    - retrospective
```

Real Codex thread pilot mode:

```yaml
real_codex_thread_pilot:
  starts_after: dry_run_reviewed
  real_codex_threads: true
  real_worker_threads: true
  subagents_as_primary_workers: false
  subagents_allowed_as_internal_tools: true
  subagent_evidence_classification: secondary_not_canonical
  linear_issues: allowed_after_user_approval
  max_workers_initial: 1
  max_workers_after_heartbeat_and_orphan_recovery_proven: 3
  runtime_actions: safe_local_runtime_checks_only
  public_actions: safe_linear_workspace_actions_only
  kill_switch_required: true
  reporting_verdict_until_project_update_surface_works: degraded_pass
```

## 9. no-magic review

Verdict: usable as policy v0.1 only in degraded mode until Linear reconciliation rules are enforced.

Open gaps:

- Linear API capabilities and exact custom-field limitations still need verification before implementation.
- Installable skill file format needs a dedicated skill spec.
- Kill switch needs a concrete command or procedure per runtime.
- Digest cadence needs a default interval.
- Synthetic pilot needs a generated task board or Linear project after approval.
- Live Linear pilot needs a structured block validator before scaling beyond one worker.
- Project-level status updates are degraded until a working backend or confirmed UI posting path exists.

Double-count risks:

- Linear and fallback board both marked canonical.
- Kill switch pauses worker actions but task statuses still look active.
- Memory extraction records noisy session details instead of reusable rules.
- Autonomy profile grants deploy or DB rights without runtime owner coordination.
- Linear workflow status and canonical stage collapse into one ambiguous field.
- Review, QA, and verification appear as both comments and child issues without one canonical gate surface.

Degraded states:

- Worker stopped while task says `in_progress`: mark orphan and recover.
- Linear unavailable: use fallback board and report degraded state.
- Digest unavailable: write chat report and project update separately.
- Memory stale: treat as historical context until refreshed.
- Project update backend unavailable: use the control issue as the canonical digest surface and mark adapter health degraded.
- User input unavailable: keep UAT in Approval or blocker in Questions; do not treat silence as approval.

## 10. next build step

Next artifact:

```text
portable-skill-specs-v0.1.md
```

It should define installable skill behavior for:

- digital-org-orchestrator
- digital-org-worker
- digital-org-reviewer
- digital-org-verifier
- digital-org-auditor
