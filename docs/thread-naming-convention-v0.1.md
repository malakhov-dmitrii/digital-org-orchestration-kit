# Thread naming convention v0.1

```yaml
artifact_type: operating_rule
applies_to:
  - Codex_thread
  - worker
  - reviewer
  - verifier
  - watchdog
  - auditor
```

## rule

Every organizational Codex thread must be titled before or immediately after assignment.

```yaml
title_pattern: "<TASK_ID_OR_SCOPE> <ROLE> <SHORT_SCOPE>"
examples:
  - "TUT-001 Worker release note"
  - "TUT-002 Reviewer release note"
  - "TUT-004 Watchdog scan"
```

## required fields

```yaml
required_title_fields:
  project_prefix: short_stable_project_code_max_3_chars
  task_id_or_scope: task_id_when_available_else_scope
  task_id_rule: task_id_must_start_with_project_prefix
  role:
    - Orchestrator
    - Worker
    - Reviewer
    - Verifier
    - Watchdog
    - Auditor
  short_scope: human_readable_3_to_6_words
```

## registry rule

```yaml
thread_registry_entry:
  thread_id:
  thread_title:
  project_prefix:
  task_id:
  role:
  short_scope:
```

This rule comes from the 2026-06-03 tutorial pilot requirement: the operator must understand who owns what from the Codex chat list without opening each chat. If a thread title is missing or generic, the orchestrator must rename it before assigning new work.

## identity rule

Rule source: `examples/tutorial-pilot/audit/retrospective-audit.md` records the `source_thread_id` vs role-thread confusion from the tutorial pilot. Do not infer the current role thread from parent provenance.

```yaml
thread_identity:
  source_thread_id:
    meaning: parent_or_orchestrator_provenance
    may_hold_role_lease: false
    role_thread_may_rename: false
  current_thread_id:
    meaning: this_codex_thread
    required_for:
      - worker
      - reviewer
      - verifier
      - watchdog
      - auditor
  holder_thread_id:
    meaning: active_lease_holder
    active_lease_rule: must_equal_current_thread_id
```

Role threads may rename or update metadata only for `current_thread_id`. They must not rename, archive, pin, or otherwise manage `source_thread_id`.

## assignment gate

```yaml
before_work_assignment_requires:
  - project_prefix_selected_max_3_chars
  - task_id_starts_with_project_prefix
  - thread_title_matches_pattern
  - thread_registry_entry_created_or_updated
  - current_thread_id_recorded
  - holder_thread_id_matches_current_thread_id_when_lease_active
```

If the title cannot be set by tool, record the intended title in the task pool and mark `thread_title_state: tool_unavailable`.

## title hygiene

```yaml
title_hygiene:
  keep_under_80_chars: true
  use_short_project_prefix_max_3_chars: true
  do_not_duplicate_project_prefix_outside_task_id: true
  prefer_task_id_when_available: true
  avoid_generic_titles:
    - Worker
    - Reviewer
    - Verifier
    - New chat
  avoid_sensitive_data: true
```
