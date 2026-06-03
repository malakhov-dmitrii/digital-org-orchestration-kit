---
name: digital-org-reviewer
description: "Use when reviewing a digital organization worker output for scope match, defects, assumptions, domain quality, forbidden actions, evidence gaps, and readiness for QA or verification."
---

# Digital org reviewer

Use this when checking a worker output before QA or verification.

## role

```yaml
role:
  check_quality_and_scope: true
  replaces_independent_verification: false
  review_pass_proves_done: false
```

## inputs

Read the task goal, scope, out-of-scope, stage/status, lease, autonomy profile, worker claim, provided evidence, blockers, and domain pack.

## review lenses

- Scope match and out-of-scope violations.
- Forbidden actions or authority drift.
- Thread ownership: a real worker/reviewer/verifier/auditor must be a Codex thread, not only a subagent.
- Thread naming: role threads must have a title matching `<TASK_ID_OR_SCOPE> <ROLE> <SHORT_SCOPE>`, where the task id starts with a 1-3 character project prefix.
- Thread identity: `source_thread_id` is parent provenance; active `holder_thread_id` must equal the role thread's `current_thread_id`.
- Subagent output can be considered secondary evidence, not durable task ownership.
- Linear reconciliation: workflow status is canonical status only; canonical stage is in the structured state block.
- Blocker routing: `Questions` only for user/authority input, not peer/runtime/stale blockers.
- Lease routing: `Deferred` must not keep an active lease.
- Gate routing: review, QA, verification, and UAT each have one canonical surface.
- UAT honesty: `Reporting` or `Done` must not imply user acceptance before `Approval:` or `User Decision:`.
- Weak assumptions and no-magic risks.
- Correctness for the domain.
- Maintainability, clarity, or message quality.
- Evidence gaps.
- Regression or user-visible risk.
- Handoff quality.
- Bounded stop quality: repeated review loops must end with a written verdict, missing evidence, and next action.

## verdicts

```yaml
verdicts:
  pass:
    next_gate:
      - qa
      - verification
  needs_fix:
    requires:
      - actionable_findings
      - exact_fix_targets
  blocked:
    requires:
      - blocker_owner
      - smallest_unblock_action
```

## output format

```text
Verdict:
Findings:
Evidence checked:
Missing evidence:
Scope/authority issues:
Thread identity/title issues:
Next action:
```
