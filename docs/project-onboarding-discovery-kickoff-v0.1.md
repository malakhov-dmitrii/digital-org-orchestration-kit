# Project onboarding discovery kickoff v0.1

## 0. scope

```yaml
artifact_type: workflow
purpose: start_any_project_with_digital_org_orchestration
starts_before:
  - worker_threads
  - implementation
  - deployment
ends_with:
  - kickoff_record
  - first_task_pool
  - thread_launch_ready_or_blocked
```

## 1. intake

```yaml
intake:
  goal:
    prompt: what outcome should exist when this project is done
    required: true
  non_goals:
    prompt: what should not be changed or attempted
    required: true
  success_criteria:
    prompt: how the user will accept the work
    required: true
  authority:
    prompt: who can approve plans, UAT, deploys, DB changes, public actions, spend
    required: true
  risks:
    prompt: runtime, DB, auth, secrets, users, money, legal, public channels
    required: true
  existing_state:
    prompt: current repo, docs, Linear, deployments, logs, dashboards, known blockers
    required: true
```

Output:

```yaml
intake_record:
  project_name:
  project_goal:
  non_goals:
  acceptance_criteria:
  authority_profile:
  known_risks:
  known_sources:
  open_questions:
```

## 2. setup

```yaml
setup:
  task_pool:
    if_linear_available:
      - create_or_select_project
      - create_control_issue
      - create_project_namespace_label
      - create_role_domain_blocker_proof_labels
    if_linear_unavailable:
      - create_fallback_board
      - mark_adapter_health_degraded
  working_surface:
    - identify_repo_or_workspace
    - identify_worktree_policy
    - identify_runtime_owner_policy
  reporting:
    - choose_digest_surface
    - choose_checkpoint_cadence
    - create_kill_switch_state
```

Output:

```yaml
setup_record:
  task_pool_surface:
  control_issue_or_board_path:
  namespace:
  labels_or_fields:
  digest_surface:
  kill_switch_state:
  adapter_health:
```

## 3. discovery

Discovery is project-specific mapping before plans are trusted.

```yaml
discovery:
  sources:
    - repo_structure
    - docs
    - existing_tasks
    - current_runtime
    - user_provided_context
    - prior_memory_as_historical_context
  questions:
    - what is current truth
    - what is historical or stale
    - what systems can be touched
    - what systems are observe_only
    - what credentials or authority are missing
    - what would prove progress
```

Output:

```yaml
discovery_record:
  current_truth:
  historical_context:
  source_of_truth_map:
  runtime_surfaces:
  credentials:
  authority_gaps:
  evidence_surfaces:
  blockers:
```

## 4. research

Research is used when the domain, SDK, product context, market, user, or runtime is not clear enough.

```yaml
research:
  trigger_if:
    - unfamiliar_domain
    - unfamiliar_sdk_or_api
    - unclear_product_requirements
    - competitive_or_marketing_context_needed
    - legal_or_financial_risk
    - external_current_facts_needed
  rules:
    - use_primary_sources_for_technical_claims
    - keep_memory_as_context_not_current_truth
    - record_sources_and_dates
    - separate_fact_from_inference
```

Output:

```yaml
research_record:
  questions_answered:
  sources:
  facts:
  inferences:
  open_questions:
  impact_on_plan:
```

## 5. source-of-truth map

```yaml
source_of_truth_map:
  project_goal: user_or_project_brief
  current_task_state: Linear_or_fallback_board
  code_truth: repository_and_tests
  runtime_truth: logs_dashboards_browser_db_as_authorized
  memory_truth: historical_context_only
  acceptance_truth: user_or_authorized_acceptor
  reporting_truth: digest_surface
```

Rules:

```yaml
rules:
  one_current_task_pool: true
  memory_is_not_current_task_state: true
  status_surface_must_be_canonical: true
  stale_source_must_be_labeled: true
```

## 6. kickoff

Kickoff is the first durable project commitment.

```yaml
kickoff_record:
  project_name:
  goal:
  non_goals:
  activation_mode:
  authority_profile:
  source_of_truth_map:
  milestones:
  first_workstreams:
  thread_registry_policy:
  capacity_governor:
  evidence_contract:
  watchdog_policy:
  first_tasks:
  user_questions:
  next_checkpoint:
```

Kickoff may not start execution if these are missing:

```yaml
kickoff_blockers:
  - no_acceptance_criteria
  - no_task_pool
  - no_authority_profile
  - no_source_of_truth_map
  - runtime_or_db_action_needed_without_owner
  - public_action_needed_without_user_authority
```

## 7. first task slicing

```yaml
first_task_slices:
  - intake_and_goal_lock
  - source_of_truth_map
  - plan_and_no_magic_review
  - thread_registry_setup
  - first_worker_task
  - reviewer_or_verifier_gate
  - auditor_watchdog_scan
  - uat_or_user_decision
```

Each task must include:

```yaml
task_minimum:
  - goal
  - scope
  - out_of_scope
  - owner_role
  - required_evidence
  - authority
  - blocker_route
  - handoff
```
