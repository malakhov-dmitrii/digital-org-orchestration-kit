# Fallback Board Spec v0.1

## 0. Grounding

```yaml
grounded_in:
  - outputs/canonical-task-schema-and-stage-machine-v0.1.md
  - outputs/control-plane-policies-and-synthetic-pilot-v0.1.md
scope:
  primary_surface: false
  fallback_and_portability_surface: true
  creates_runtime_actions: false
```

## 1. Board Files

```yaml
files:
  canonical_board: .org/tasks.yaml
  digest: .org/status.md
  archive_dir: .org/archive
  evidence_dir: .org/evidence
```

## 2. Canonical Header

```yaml
schema_version: digital-org-task-pool/v0.1
canonical_surface: fallback_yaml
linear_project_id: null
generated_from_linear_at: null
organization:
  id: org-default
  name: Digital Organization
projects: []
tasks: []
agents: []
```

## 3. Canonical Rules

```yaml
rules:
  one_canonical_surface_per_project: true
  if_linear_is_canonical_then_yaml_is_export: true
  if_yaml_is_canonical_then_linear_project_id_optional: true
  task_updates_target_canonical_surface: true
  digest_generated_from_canonical_state: true
  chat_not_canonical: true
```

## 4. Required Task Fields

```yaml
required_task_fields:
  - id
  - title
  - goal_id
  - project_id
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

## 5. Validation Rules

```yaml
validation:
  yaml_parse_required: true
  ids_unique: true
  one_active_lease_per_task: true
  one_runtime_owner_per_shared_surface: true
  stage_enum_required: true
  status_enum_required: true
  authority_missing_grant_value: false
  done_requires_verification_or_exception: true
  done_requires_no_active_lease: true
  blocked_requires_owner_and_next_action: true
```

## 6. Digest Shape

```markdown
# Project Status

Что сейчас делаем:
Что уже продвинулось:
Что идет не по плану:
Где нужно твое внимание:
Какие задачи без воркера:
Какие риски:
Следующий шаг системы:
Kill switch state:
```

## 7. Orphan Detection

```yaml
orphan_detection:
  task_in_progress_without_active_worker:
    detect_when:
      - status: in_progress
      - lease.state: active
      - worker_thread_missing_or_stopped: true
  active_lease_heartbeat_expired:
    detect_when:
      - lease.state: active
      - heartbeat_due_at_before_now: true
  ready_for_verification_without_verifier:
    detect_when:
      - status: ready_for_verification
      - verification.verifier_agent_id: null
  recovery_options:
    - pause_task
    - release_stale_lease
    - assign_new_worker
    - assign_verifier
    - request_user_decision
```

## 8. Export / Import

```yaml
linear_to_yaml_export:
  preserve_all_canonical_fields: true
  preserve_structured_comment_blocks: true
  mark_yaml_as_export_if_linear_canonical: true

yaml_to_linear_import:
  requires_user_or_profile_authority: true
  creates_or_updates_project: adapter_specific
  creates_or_updates_issues: adapter_specific
  preserves_task_ids_where_possible: true
```

## 9. No-Magic Review

```yaml
verdict: usable_as_fallback_spec_v0.1
open_gaps:
  - validator_script_not_created_yet
  - linear_import_export_not_implemented_yet
  - exact_archive_rotation_policy_missing
double_count_risks:
  - yaml_export_modified_while_linear_canonical
  - archived_task_reopened_without_new_lease
  - digest_manually_edited_out_of_sync
degraded_states:
  yaml_invalid: freeze_updates_until_fixed
  evidence_artifact_missing: mark_evidence_gap
  linear_unavailable: set_project_degraded_state
```

