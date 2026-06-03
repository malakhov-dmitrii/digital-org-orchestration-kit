# Linear reconciliation rules v0.1

## 0. scope

```yaml
artifact_type: operating_rule
surface: Linear
run_instance_id_required: true
applies_to:
  - digital-org-orchestrator
  - digital-org-worker
  - digital-org-reviewer
  - digital-org-verifier
  - digital-org-auditor
```

## 1. canonical surfaces

```yaml
canonical_surfaces:
  issue.workflow_status:
    stores: canonical_status
    does_not_store: canonical_stage
  structured_state_block:
    stores:
      - canonical_stage
      - canonical_status_snapshot
      - run_instance_id
      - surface_mode
      - side_effect_policy
      - stage_changed_at
      - status_changed_at
  digest:
    preferred: linear_project_update
    degraded_fallback: EX-33_control_issue
```

## 2. blocker routing

```yaml
blocker_routing:
  primary_open_blockers_per_issue: 1
  Questions:
    means: user_or_authority_input_required
    allowed_primary_blockers:
      - blocked:user
      - blocked:authority
      - blocked:credentials
      - blocked:unclear-spec
    forbidden_primary_blockers:
      - blocked:peer
      - blocked:runtime-owner
      - blocked:stale-or-looping
    description_first_section: question_for_user
  peer_runtime_or_stale_blockers:
    route_to:
      - keep_current_work_status
      - Deferred
    never_route_to: Questions
  Approval:
    means: UAT_or_plan_acceptance_waiting_for_user
    description_first_section: user_decision_or_uat_request
```

## 3. lease reconciliation

```yaml
lease_rules:
  max_active_leases_per_issue: 1
  Deferred:
    active_lease_allowed: false
    required_lease_state:
      - released
      - stale
      - superseded
      - canceled
  stale_detection_inputs:
    - lease.state
    - heartbeat_due_at
    - holder_thread_id
    - worker_last_seen_at
    - handoff.next_action
```

## 4. gate reconciliation

```yaml
gate_rules:
  gate_types:
    - review
    - qa
    - verification
    - uat
  one_canonical_surface_per_gate: true
  allowed_surfaces:
    - child_issue
    - structured_comment
  if_child_issue_is_canonical:
    comments_are: supplemental_only
    comment_must_reference: gate_issue_id
  forbidden:
    - two_independent_pass_verdicts_for_same_gate
```

## 4.1. structured block safety

```yaml
structured_block_safety:
  raw_linear_issue_keys_inside_html_comments: forbidden
  reason: Linear autolinks issue keys and can corrupt machine-readable blocks
  allowed_issue_references:
    - current_issue
    - issue_uuid
    - underscore_ids
  examples:
    avoid: EX-36
    use: issue_ai36_or_current_issue
```

## 5. project reporting degradation

```yaml
reporting_rules:
  project_update_backend_missing:
    adapter_health: degraded
    canonical_digest_surface: EX-33_control_issue
    project_update_claim_allowed: false
  reporting_without_uat:
    allowed: true
    must_mark: pending_user_acceptance
    must_not_mark: accepted
```

## 6. current pilot corrections

```yaml
current_live_linear_run:
  run_instance_id: digital-org-synthetic-tutorial/live-linear-2026-06-02
  corrections:
    EX-36:
      target_status: Questions
      primary_blocker: blocked:user
      remove_as_primary: blocked:peer
    EX-39:
      target_status: Approval
      uat_state: pending_user
      reporting_claim: digest_ready_not_user_accepted
```
