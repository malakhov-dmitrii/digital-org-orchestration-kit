# Portable project activation kit v0.1

## 0. purpose

```yaml
artifact_type: entrypoint
goal: make_digital_org_orchestration_pluggable_into_any_project
project_sizes:
  - solo_small
  - startup_medium
  - multi_workstream_large
primary_task_pool: Linear
fallback_task_pool: local_task_board
organizational_agent_surface: Codex_thread
subagent_surface: secondary_internal_tool
```

Use this file as the first document when activating the digital-org operating model in a new project.

## 1. activation modes

```yaml
activation_modes:
  quick_start_30_min:
    use_when: project_is_small_or_timeboxed
    outcome:
      - one_control_issue
      - one_workstream
      - one_worker_thread_max
      - basic_lease_handoff_evidence
  standard_90_min:
    use_when: project_has_multiple_tasks_or_roles
    outcome:
      - Linear_project_or_parent_issue
      - source_of_truth_map
      - kickoff_record
      - thread_registry
      - capacity_governor
      - watchdog_scan
  full_program:
    use_when: project_has_multiple_workstreams_or_runtime_risk
    outcome:
      - project_orchestrator_thread
      - feature_or_unit_orchestrators
      - worker_threads
      - reviewer_verifier_auditor_threads
      - release_or_runtime_owner_policy
```

## 2. plug-in sequence

```yaml
sequence:
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
  - lease_assignment
  - execution
  - review
  - qa
  - verification
  - uat
  - reporting
  - archival
```

## 3. required artifacts

```yaml
must_read:
  - outputs/thread-first-project-workflow-v0.1.md
  - outputs/project-onboarding-discovery-kickoff-v0.1.md
  - outputs/project-setup-and-linear-template-v0.1.md
  - outputs/templates-and-checklists-v0.1.md
  - outputs/linear-reconciliation-rules-v0.1.md
  - outputs/authority-and-evidence-contracts-v0.1.md

supporting:
  - outputs/org-operating-model-v0.1.md
  - outputs/canonical-task-schema-and-stage-machine-v0.1.md
  - outputs/linear-adapter-spec-v0.1.md
  - outputs/fallback-board-spec-v0.1.md
  - outputs/gastown-pattern-implementation-roadmap-v0.1.md
```

## 4. installable skills

```yaml
required_skills:
  activation:
    - digital-org-project-activation
  roles:
    - digital-org-orchestrator
    - digital-org-worker
    - digital-org-reviewer
    - digital-org-verifier
    - digital-org-auditor
  domains:
    - digital-org-domain-orgops
    - digital-org-domain-development
optional_domain_packs:
  - marketing
  - design
  - product
  - research
  - ops
```

## 5. activation checklist

```yaml
activation_checklist:
  before_work:
    - identify_project_name
    - identify_user_goal
    - identify_owner_and_final_authority
    - identify_primary_task_pool_or_fallback
    - identify_runtime_db_deploy_public_action_risks
    - choose_activation_mode
  setup:
    - create_or_select_linear_project_or_control_issue
    - create_project_namespace_label
    - create_source_of_truth_map
    - create_thread_registry_block
    - set_capacity_governor
    - set_kill_switch_state
  kickoff:
    - record_goal
    - record_non_goals
    - record_authority_profile
    - record_acceptance_criteria
    - record_evidence_contract
    - record_first_milestone
  before_threads:
    - create_task_slices
    - choose_thread_roles
    - assign_or_deny_leases
    - require_thread_id_for_active_lease
    - start_watchdog_scan
  done_condition:
    - all_active_leases_have_handoff_or_heartbeat
    - no_questions_without_user_question_section
    - no_deferred_active_lease
    - verification_claims_have_evidence
    - uat_state_is_explicit
```

## 6. default project policy

```yaml
default_policy:
  max_active_worker_threads: 1
  max_active_worker_threads_after_watchdog_proven: 3
  subagents_as_primary_workers: false
  subagents_as_secondary_tools: true
  user_silence_means_approval: false
  public_actions_default: user_gated
  prod_deploy_default: denied_unless_profile_grants
  db_mutation_default: denied_unless_profile_grants
  project_update_surface:
    preferred: Linear_project_update
    fallback: control_issue_digest
```

## 7. use in a new chat

```text
Use digital-org-project-activation.
Project: <name>
Goal: <goal>
Known constraints: <constraints>
Primary task pool: Linear or fallback board
Activation mode: quick_start_30_min | standard_90_min | full_program
Start with intake, setup, discovery, research, and kickoff before assigning work.
```
