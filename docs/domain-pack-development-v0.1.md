# Domain Pack Development v0.1

## 0. Grounding

```yaml
grounded_in:
  - outputs/authority-and-evidence-contracts-v0.1.md
  - outputs/portable-skill-specs-v0.1.md
skill: digital-org-domain-development
```

## 1. Domain Scope

```yaml
domain: development
surfaces:
  - repo_files
  - tests
  - lint
  - typecheck
  - build
  - static_analysis
  - browser_runtime
  - deploy
  - db_migration
  - developer_docs
```

## 2. Evidence

```yaml
evidence:
  - changed_files
  - test_output
  - typecheck_output
  - lint_output
  - build_output
  - static_analysis_output
  - browser_or_runtime_proof_for_user_visible_flows
  - deploy_receipt_when_deployed
  - db_receipt_when_db_touched
  - skipped_checks_with_reason
  - known_gaps
```

## 3. Authority

```yaml
authority:
  prod_deploy: autonomy_profile_gated
  db_mutation: autonomy_profile_gated
  runtime_owner_required_for_shared_runtime: true
  user_visible_uat: user_gated_by_default
  missing_grant: denied
```

## 4. Review Checklist

```yaml
review_checklist:
  - acceptance_criteria_covered
  - regression_risk_checked
  - scope_drift_absent
  - unrelated_file_changes_absent
  - forbidden_runtime_db_deploy_actions_absent
  - tests_or_skipped_reason_present
  - evidence_supports_exact_claim
  - runtime_final_state_documented
```

## 5. Done Criteria

```yaml
done_requires:
  - verifier_accepts_claim
  - required_checks_pass_or_gaps_accepted
  - no_active_lease_without_handoff
  - runtime_state_documented_if_touched
  - uat_passed_or_not_required
```

