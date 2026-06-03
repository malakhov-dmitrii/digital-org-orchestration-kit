# Portable skill specs v0.1

## 0. grounding

This spec is grounded in:

- `outputs/org-operating-model-v0.1.md`
- `outputs/canonical-task-schema-and-stage-machine-v0.1.md`
- `outputs/control-plane-policies-and-synthetic-pilot-v0.1.md`
- existing local skills: `agent-orchestrator-pool`, `agent-pool-worker`, `agent-pool-verifier`, `no-magic-design-review`, `anti-slop-editor`

```yaml
artifact_scope:
  defines_installable_skill_behavior: true
  creates_linear_issues: false
  creates_worker_threads: false
```

## 1. skill package set

```yaml
skills:
  - name: digital-org-project-activation
    folder: ~/.codex/skills/digital-org-project-activation
    role: portable_project_onboarding_setup_discovery_kickoff
  - name: digital-org-orchestrator
    folder: ~/.codex/skills/digital-org-orchestrator
    role: chief_project_feature_orchestrator
  - name: digital-org-worker
    folder: ~/.codex/skills/digital-org-worker
    role: scoped_execution_worker
  - name: digital-org-reviewer
    folder: ~/.codex/skills/digital-org-reviewer
    role: quality_and_scope_reviewer
  - name: digital-org-verifier
    folder: ~/.codex/skills/digital-org-verifier
    role: independent_claim_verifier
  - name: digital-org-auditor
    folder: ~/.codex/skills/digital-org-auditor
    role: orgops_health_and_improvement_auditor
  - name: digital-org-domain-orgops
    folder: ~/.codex/skills/digital-org-domain-orgops
    role: orgops_domain_pack
  - name: digital-org-domain-development
    folder: ~/.codex/skills/digital-org-domain-development
    role: development_domain_pack
```

## 2. shared contract

Every digital-org skill uses the same control rules.

```yaml
shared_rules:
  durable_task_pool_primary: Linear
  fallback_task_board: .org/tasks.yaml
  current_task_state_source: task_pool
  memory_role: historical_context_and_reusable_lessons
  organizational_agent_surface: Codex_thread
  subagent_surface: internal_tool_call_inside_thread
  subagent_can_hold_lease: false
  subagent_can_be_runtime_owner: false
  subagent_can_accept_uat: false
  subagent_evidence_role: secondary_not_canonical
  one_active_lease_per_task: true
  one_active_runtime_owner_per_shared_surface: true
  worker_self_close_default: false
  verifier_or_orchestrator_closes_done: true
  public_actions_default: user_gated
  spend_money_default: user_gated
  goal_or_scope_change_default: user_gated
  uat_acceptance_default: user_gated
  prod_deploy_and_db_mutation: autonomy_profile_gated
  anti_slop_for_outward_text: required
```

## 3. shared inputs

Each role should try to identify these fields before acting:

```yaml
shared_inputs:
  - project_id
  - task_id
  - goal
  - domain
  - role_lane
  - stage
  - status
  - autonomy_profile
  - authority_grants
  - lease
  - acceptance_criteria
  - required_evidence
  - blockers
  - handoff
```

```yaml
missing_input_policy:
  first_action: recover_from_linear_or_fallback_board
  if_unrecoverable: create_blocker_with_owner_and_next_action
```

## 4. `digital-org-project-activation`

### 4.1. trigger

Use when a new project needs digital-org onboarding, setup, discovery, research, kickoff, Linear or fallback task pool setup, source-of-truth map, thread registry, capacity governor, and first task slices.

### 4.2. workflow

```yaml
workflow:
  - intake
  - setup
  - discovery
  - research
  - source_of_truth_map
  - kickoff
  - planning
  - no_magic_review
  - decomposition
  - thread_registry
  - first_lease_policy
  - watchdog_baseline
```

### 4.3. output

```text
Project:
Goal:
Activation mode:
Task pool:
Authority profile:
Source of truth:
Thread registry:
Capacity:
First milestone:
Ready tasks:
Questions:
Risks:
Next gate:
```

## 5. `digital-org-orchestrator`

### 5.1. trigger

Use when the agent is managing goals, projects, workstreams, stage transitions, task pools, leases, blockers, workers, reviewers, verifiers, auditors, digests, kill switch, or handoff/archive.

### 5.2. scope

```yaml
orchestrator_scope:
  can:
    - define_goal
    - create_or_update_task_records
    - assign_or_release_leases
    - route_blockers
    - request_review
    - request_verification
    - prepare_uat
    - produce_digest
    - run_kill_switch_policy
    - archive_or_handoff
    - use_subagents_for_secondary_critic_research_or_sanity_checks
  cannot_without_authority:
    - change_goal_or_scope
    - perform_public_action
    - spend_money
    - accept_uat_for_user
  cannot_delegate_to_subagent:
    - durable_task_ownership
    - active_lease_holder
    - runtime_owner
    - primary_high_impact_verifier
```

### 5.3. workflow

```yaml
workflow:
  - load_project_control_state
  - confirm_canonical_task_pool
  - load_source_of_truth_map
  - identify_autonomy_profile
  - identify_active_leases_and_runtime_owners
  - route_stale_or_orphaned_tasks
  - move_tasks_through_stage_machine
  - assign_workers_reviewers_verifiers_when_allowed
  - keep_digest_current
  - write_handoff_or_archive_records
```

### 5.4. output

```text
Project:
Goal:
Current stage:
Green:
At risk:
Blocked:
Needs user:
Orphaned tasks:
Ready for review:
Ready for verification:
Ready for UAT:
Recent evidence:
Next checkpoint:
Kill switch state:
```

## 6. `digital-org-worker`

### 6.1. trigger

Use when the agent receives one leased task from a digital-org task pool.

### 6.2. scope

```yaml
worker_scope:
  can:
    - execute_one_leased_task
    - update_task_evidence
    - report_blocker
    - request_review_or_verification
    - handoff_before_stopping
  cannot:
    - take_multiple_tasks
    - expand_scope_without_task_update
    - close_own_task_without_exception
    - change_project_goal
    - perform_restricted_action_without_grant
```

### 6.3. start checklist

```yaml
start_checklist:
  - read_task_record
  - confirm_this_is_a_codex_thread_not_only_a_subagent
  - confirm_lease_scope
  - confirm_authority_grants
  - confirm_forbidden_actions
  - confirm_acceptance_criteria
  - confirm_required_evidence
  - load_domain_pack
  - record_heartbeat_due
```

### 6.4. handoff

```yaml
handoff_requires:
  - current_status
  - evidence_added
  - checks_run_or_skipped_with_reason
  - blockers
  - next_action
  - lease_release_or_extension
  - runtime_state_if_changed
```

## 6. `digital-org-reviewer`

### 6.1. trigger

Use when checking a worker output for defects, scope drift, weak assumptions, quality gaps, or missing review evidence before QA/verification.

### 6.2. review lenses

```yaml
review_lenses:
  - scope_match
  - forbidden_actions
  - assumptions
  - correctness
  - maintainability_or_message_quality
  - domain_pack_requirements
  - evidence_gaps
  - regression_risk
  - handoff_quality
```

### 6.3. verdicts

```yaml
verdicts:
  pass: review_can_move_forward
  needs_fix: actionable_findings_required
  blocked: external_or_authority_blocker_required
```

```yaml
reviewer_verifier_boundary:
  reviewer_replaces_verifier: false
  review_pass_implies_verification_pass: false
```

## 7. `digital-org-verifier`

### 7.1. trigger

Use when independently checking whether a task claim is proven enough to move to UAT, reporting, or done.

### 7.2. verification rule

```yaml
verification_rule:
  check_claim_not_effort: true
  map_acceptance_criteria_to_evidence: true
  rerun_or_inspect_smallest_needed_proof: true
  reject_unsupported_claims: true
  close_done_only_when_allowed: true
```

### 7.3. verdicts

```yaml
verdicts:
  accepted:
    next_status: ready_for_uat_or_done
  needs_fix:
    next_status: verification_failed
  blocked:
    next_status: blocked
```

## 8. `digital-org-auditor`

### 8.1. trigger

Use for OrgOps health checks, milestone retrospectives, stale lease scans, blocker pattern analysis, memory hygiene, skill/template improvement proposals, and system-level reporting.

### 8.2. audit checklist

```yaml
audit_checklist:
  - stale_leases
  - orphaned_in_progress_tasks
  - expired_blockers
  - weak_evidence
  - tasks_closed_without_verification
  - noisy_or_missing_digests
  - repeated_user_questions
  - runtime_owner_conflicts
  - linear_fallback_double_count
  - memory_update_candidates
  - skill_update_candidates
```

### 8.3. output

```text
System health:
Top bottlenecks:
Orphaned work:
Repeated blockers:
Weak evidence patterns:
Authority risks:
Memory cleanup/update candidates:
Skill/template improvements:
Recommended next actions:
```

## 9. `digital-org-domain-orgops`

### 9.1. trigger

Use when the work is about the digital organization itself: task schema, stage machine, Linear setup, fallback board, skill specs, auditors, digests, kill switch, memory hygiene, or pilot operation.

### 9.2. evidence

```yaml
orgops_evidence:
  - spec_artifact
  - schema_or_transition_table
  - grounding_check
  - dry_run_task_record
  - digest_example
  - retrospective
```

### 9.3. checks

```yaml
orgops_checks:
  - source_of_truth_clear
  - authority_clear
  - stage_transition_valid
  - no_double_canonical_state
  - kill_switch_policy_present
  - orphan_detection_present
  - digest_understandable
```

## 10. `digital-org-domain-development`

### 10.1. trigger

Use when the task is software development, repo changes, tests, builds, runtime checks, deploys, DB migrations, code review, or development QA.

### 10.2. evidence

```yaml
development_evidence:
  - changed_files
  - test_output
  - typecheck_output
  - lint_output
  - build_output
  - static_analysis_output
  - browser_or_runtime_proof_when_user_visible
  - deploy_receipt_when_deployed
  - db_receipt_when_db_touched
  - skipped_checks_with_reason
```

### 10.3. authority

```yaml
development_authority:
  prod_deploy: autonomy_profile_gated
  db_mutation: autonomy_profile_gated
  runtime_owner_required: true
  user_visible_uat: user_gated_by_default
```

## 11. installable skill shape

Each skill folder should contain only:

```text
SKILL.md
```

```yaml
reference_policy:
  default_files:
    - SKILL.md
  add_references_when_skill_body_exceeds_budget: true
```

Frontmatter rules:

```yaml
frontmatter_required:
  - name
  - description
name_format: lowercase-hyphen-case
description_must_include:
  - trigger_context
  - role
  - key_surfaces
```

## 12. skill interaction rules

```yaml
skill_interactions:
  orchestrator_can_delegate_to:
    - digital-org-worker
    - digital-org-reviewer
    - digital-org-verifier
    - digital-org-auditor
  worker_should_use_domain_pack: true
  reviewer_should_use_domain_pack: true
  verifier_should_use_domain_pack: true
  auditor_uses_orgops_pack: true
  existing_agent_pool_worker_can_be_used_inside_digital_org_worker: true
  existing_agent_pool_verifier_can_be_used_inside_digital_org_verifier: true
```

## 13. synthetic pilot coverage

The skills are ready for first dry-run when they can cover:

```yaml
pilot_coverage:
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
  - kill_switch
  - orphan_detection
  - memory_retrospective
```

## 14. no-magic review

Verdict: ready to create v0.1 installable skills.

Open gaps:

- Linear API behavior still needs adapter verification before real Linear writes.
- Real worker pilot must wait until dry-run review.
- Dashboard and Telegram digest are later adapters.
- Memory cleanup/dedup needs a separate spec.

Double-count risks:

- Existing `agent-pool-worker` and new `digital-org-worker` could overlap. The new skill should reference the old one as an inner task-pool discipline.
- Existing `agent-pool-verifier` and new `digital-org-verifier` could overlap. The new skill should add stage/authority/UAT context rather than duplicate every verifier rule.
- Domain packs could mutate core stage machine. They must not.

Degraded states:

- Linear unavailable: fallback YAML.
- Worker thread stopped: orphan detection.
- Missing domain pack: use core role skill and mark domain evidence gaps.
- Skill missing after install: continue from specs and report install gap.
