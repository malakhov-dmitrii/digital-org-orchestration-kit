---
name: digital-org-domain-development
description: "Use as the development domain pack for digital organization tasks involving code, repositories, tests, builds, runtime checks, deploys, DB migrations, code review, QA, and developer evidence."
---

# Digital Org Domain Development

## Source Of Truth

- Repo files and local instructions.
- Project docs and specs.
- Test/build/lint/typecheck output.
- Runtime logs, browser proof, deploy receipts, DB receipts when relevant.
- Linear or fallback task record for current state.

## Evidence

```yaml
evidence:
  - changed_files
  - tests
  - typecheck
  - lint
  - build
  - static_analysis
  - browser_or_runtime_proof_for_user_visible_flows
  - deploy_receipt_when_deployed
  - db_receipt_when_db_touched
  - skipped_checks_with_reason
  - known_gaps
```

## Authority

- Prod deploy: autonomy profile gated.
- DB mutation: autonomy profile gated.
- Runtime owner: required for shared runtime.
- Public/user-visible acceptance: user gated by default.
- Missing grant: denied.

## Review Checks

```yaml
review_checks:
  - regression_risk
  - scope_drift
  - unrelated_file_changes
  - forbidden_runtime_db_deploy_actions
  - incomplete_tests_or_skipped_checks
  - evidence_supports_exact_claim
  - runtime_final_state_documented
```
