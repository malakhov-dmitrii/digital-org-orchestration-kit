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
- Paperclip ownership: a real worker/reviewer/verifier/auditor must be a Paperclip agent run, not only a Codex provider session or subagent.
- Role naming: Paperclip issue titles and role agent names must carry the project prefix and readable scope, where the task id starts with a 1-3 character project prefix.
- Run identity: active lease must match the Paperclip checkout or live heartbeat run; provider session ids are evidence pointers, not lease holders.
- Subagent output can be considered secondary evidence, not durable task ownership.
- Paperclip/Linear reconciliation: Paperclip is canonical in Paperclip-native mode; Linear is mirror or external status only unless Paperclip is unavailable.
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
Agent/run identity issues:
Next action:
```
