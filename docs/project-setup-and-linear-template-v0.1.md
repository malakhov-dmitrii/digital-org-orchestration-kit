# Project setup and Linear template v0.1

## 0. scope

```yaml
artifact_type: setup_template
primary_surface: Linear
fallback_surface: local_task_board
applies_to: any_project
```

## 1. Linear setup

```yaml
linear_project:
  name_pattern: "[ORG] <project name>"
  description_sections:
    - goal
    - source_of_truth_map
    - authority_profile
    - activation_mode
    - thread_registry
    - capacity_governor
    - digest_surface
    - kill_switch_state
```

Control issue:

```yaml
control_issue:
  title_pattern: "Control: <project name>"
  role: project_control_surface
  labels:
    - role:project-orchestrator
    - proof-required
    - auth:<profile>
  description_sections:
    - project_goal
    - current_checkpoint
    - source_of_truth_map
    - thread_registry
    - capacity_governor
    - watchdog_state
    - active_questions
    - next_checkpoint
```

## 2. minimal labels

```yaml
labels:
  namespace:
    - project:<slug>
  roles:
    - role:chief-orchestrator
    - role:project-orchestrator
    - role:feature-orchestrator
    - role:worker
    - role:reviewer
    - role:verifier
    - role:auditor
    - role:runtime-owner
  blockers:
    - blocked:user
    - blocked:peer
    - blocked:runtime-owner
    - blocked:credentials
    - blocked:authority
    - blocked:unclear-spec
    - blocked:external
    - blocked:stale-or-looping
  gates:
    - proof-required
    - review-required
    - qa-required
    - verification-required
    - uat-required
  authority:
    - auth:observe-only
    - auth:local-execution
    - auth:managed-runtime
    - auth:public-action-gated
  control:
    - lease:active
    - lease:stale
    - orphan:needs-worker
    - kill-switch:active
    - kill-switch:paused
```

## 3. minimal statuses

```yaml
preferred_statuses:
  backlog:
    - Backlog
    - Deferred
  unstarted:
    - Todo
    - Ready
  started:
    - Planning
    - Questions
    - Approval
    - Claimed
    - Execution
    - Review
    - QA
    - Verification
    - Reporting
  completed:
    - Done
  canceled:
    - Canceled
```

Rules:

```yaml
status_rules:
  Questions: user_or_authority_input_required_only
  Approval: UAT_or_plan_acceptance_waiting_for_user
  Deferred: no_active_lease_allowed
  workflow_status: canonical_status_only
  canonical_stage: structured_state_block
```

## 4. task issue template

```markdown
## Question for user
- Only when status is Questions.
- question:
- why this blocks work:
- accepted answer format:
- what happens after answer:

## User decision / UAT request
- Only when status is Approval.
- decision requested:
- accepted answer format:
- what happens after approval:
- what happens after rejection:

## Goal

## Scope

## Out of scope

## Stage / Status

<!-- digital-org:state:v0.1
run_instance_id:
surface_mode:
side_effect_policy:
canonical_stage:
canonical_status:
stage_changed_at:
status_changed_at:
status_surface: linear_issue_workflow_status
stage_surface: structured_state_block
-->

## Lease

<!-- digital-org:lease:v0.1
state:
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

## Authority

## Acceptance criteria

## Required evidence

## Blockers

<!-- digital-org:blocker:v0.1
id:
type:
state:
primary:
owner:
reason:
question:
unblock_condition:
created_at:
expires_at:
escalation_target:
provenance_id:
-->

## Provided evidence

## Handoff

## Known gaps
```

## 5. fallback board setup

```yaml
fallback_board:
  path: .org/tasks.yaml
  create_when:
    - Linear_unavailable
    - Linear_not_authorized
    - project_requires_file_portability
  required_top_level:
    - schema_version
    - canonical_surface
    - project
    - thread_registry
    - capacity_governor
    - tasks
    - evidence
    - blockers
  degraded_state_required: true
```

## 6. project setup acceptance

```yaml
setup_acceptance:
  - control_surface_exists
  - project_namespace_exists
  - source_of_truth_map_exists
  - authority_profile_exists
  - thread_registry_block_exists
  - capacity_governor_exists
  - digest_surface_exists
  - kill_switch_state_exists
  - first_tasks_have_acceptance_and_evidence
```
