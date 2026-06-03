# Templates and checklists v0.1

## 0. scope

```yaml
artifact_type: reusable_templates
applies_to:
  - Linear_project
  - Linear_issue
  - fallback_task_board
  - Codex_thread_prompt
  - review_verification_uat_reports
```

## 1. new project prompt

```text
Use digital-org-project-activation.
Project: <project name>
Goal: <goal>
Known constraints: <constraints>
Primary task pool: Linear | fallback board
Activation mode: quick_start_30_min | standard_90_min | full_program
Authority profile: observe-only | local-execution | managed-runtime | public-action-gated
Start with intake, setup, discovery, research, source-of-truth map, and kickoff before assigning work.
```

## 2. control issue template

```markdown
## Project goal

## Current checkpoint

## Source of truth map

## Authority profile

## Thread registry

| role | thread id | task | lease | heartbeat | notes |
| --- | --- | --- | --- | --- | --- |

## Capacity governor

## Watchdog state

## Active questions

## Current digest

## Next checkpoint
```

## 3. worker thread kickoff

```text
Use digital-org-worker.
Task pool: <Linear project/control issue/fallback board path>
Task: <task id/title>
Lease holder: this Codex thread
Scope: <scope>
Out of scope: <out of scope>
Authority grants: <grants>
Forbidden actions: <forbidden actions>
Required evidence: <evidence>
Heartbeat due: <timestamp>
Do one task only. Write evidence and handoff to the task pool before stopping.
```

## 4. reviewer thread kickoff

```text
Use digital-org-reviewer.
Review target: <task id/artifact>
Review scope: correctness, scope control, evidence adequacy, regressions, missing tests.
Do not implement fixes unless explicitly assigned a separate worker lease.
Return findings ordered by severity with file or artifact references.
```

## 5. verifier thread kickoff

```text
Use digital-org-verifier.
Claim to verify: <claim>
Canonical task record: <task id/path>
Evidence provided: <evidence pointers>
Required checks: <checks>
Verify the claim against evidence. Do not accept effort as proof.
```

## 6. question block

```markdown
## Question for user

- question:
- why this blocks work:
- accepted answer format:
- what happens after answer:
```

Rules:

```yaml
question_block_rules:
  use_only_when_status_is_Questions: true
  first_description_section_required: true
  only_for_user_or_authority_input: true
  peer_or_runtime_blocker_does_not_use_Questions: true
```

## 7. evidence block

```markdown
## Agent Evidence

- claim:
- commands:
- outputs:
- changed artifacts:
- external proof:
- skipped checks:
- known gaps:
- next required gate:
```

## 8. handoff block

```markdown
## Agent Handoff

- current status:
- lease state:
- completed:
- evidence:
- blocked by:
- next action:
- runtime/db/public-action state:
- shutdown expectation:
```

## 9. watchdog checklist

```yaml
watchdog_checklist:
  active_leases:
    - holder_thread_id_present
    - ttl_not_expired
    - heartbeat_not_overdue
    - scope_matches_task
  active_tasks:
    - active_status_has_worker_or_orphan_marker
    - deferred_has_no_active_lease
    - questions_has_user_question_first
  gates:
    - review_gate_has_one_canonical_surface
    - verification_claim_has_evidence
    - uat_requires_user_decision
  reporting:
    - digest_surface_current
    - stale_orphans_escalated
```

## 10. final report

```text
Project:
Goal:
Result:
Accepted by user:
Completed tasks:
Deferred tasks:
Evidence:
Known gaps:
Worker shutdown:
Archive location:
Next recommended gate:
```
