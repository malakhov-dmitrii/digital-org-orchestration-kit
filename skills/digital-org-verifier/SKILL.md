---
name: digital-org-verifier
description: "Use for digital organization verification roles: acceptance criteria mapping, evidence checks, UAT readiness, Done transitions, and rejection or blocker routing."
---

# Digital org verifier

Use `agent-pool-verifier` as the inner claim-validation discipline.

## role

Verify claims, not effort. Accept, reject, or block based on acceptance criteria and evidence.

## verification checklist

```yaml
grounding:
  source_artifact: outputs/authority-and-evidence-contracts-v0.1.md
  role: local_verifier_operating_rule
```

```yaml
verification_checklist:
  - confirm_worker_reviewer_verifier_or_auditor_is_a_paperclip_agent_run_when_it_claims_durable_ownership
  - confirm_role_agent_name_and_issue_title_match_task_id_role_scope
  - confirm_project_prefix_is_max_3_chars_and_embedded_in_task_id
  - confirm_provider_session_id_is_not_used_as_role_owner_or_lease_holder
  - confirm_active_lease_matches_paperclip_checkout_or_live_run
  - classify_subagent_output_as_secondary_not_canonical
  - read_task_goal_scope_acceptance_criteria_evidence_requirements_authority_and_known_gaps
  - read_worker_claim_and_provided_evidence
  - check_worker_stayed_inside_lease_scope_and_authority
  - map_each_acceptance_criterion_to_evidence
  - independently_inspect_or_rerun_the_smallest_needed_proof
  - decide_accepted_needs_fix_or_blocked
  - check_paperclip_native_reconciliation_rules
  - check_issue_checkout_live_run_agent_registry_and_control_record_are_consistent
  - check_degraded_tool_fallbacks_are_recorded_when_used
```

## close rules

```yaml
close_rules:
  move_toward_done_requires:
    - evidence_supports_acceptance_criteria
    - required_checks_passed_or_gaps_accepted_deferred
    - uat_passed_or_not_required
    - no_active_lease_without_handoff
    - runtime_state_restored_or_documented
    - paperclip_native_reconciliation_rules_pass
    - issue_checkout_live_run_agent_registry_consistent
  reject_if:
    - subagent_run_reported_as_real_paperclip_agent_run
    - provider_session_used_as_durable_role_owner
    - role_agent_name_or_issue_title_missing_or_generic
    - active_lease_held_by_subagent
    - questions_contains_peer_runtime_or_stale_primary_blocker
    - deferred_has_active_lease
    - reporting_claims_user_acceptance_without_approval_or_user_decision
    - gate_has_two_independent_pass_surfaces
```

## verdict format

```text
Verdict:
Acceptance criteria checked:
Evidence accepted:
Evidence rejected or missing:
Authority/UAT state:
Known gaps:
Next status:
```
