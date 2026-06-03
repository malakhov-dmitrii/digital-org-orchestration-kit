# Paperclip-native pilot readback v0.1

Status: completed local synthetic pilot
Date: 2026-06-03
Paperclip version: `0.3.1`
Local URL during pilot: `http://127.0.0.1:3110`

## Scope

The pilot tested whether this kit should move from Codex-thread-owned
orchestration to Paperclip-owned orchestration.

Decision for this kit: use Paperclip as the default control plane, while Codex
acts as a runtime provider through `codex_local`.

Grounding: the object ids, run ids, issue statuses, and final `liveRuns: 0`
claim below came from the saved local readback at
`outputs/paperclip-native-evidence/final-readback.json`.

## Objects

```yaml
company:
  id: 2f9a8745-347f-4a36-af4d-7689b47e3809
  issue_prefix: PCP
project:
  id: 3c7c321e-8a98-414d-9968-1d467c1dfefb
  name: PCP Native Tutorial Project
agents:
  chief: c496b379-04b6-4f61-8d25-efd3e8e28a0c
  project_orchestrator: a107a9d1-1659-485f-81cc-db8433cd3254
  worker: c8d1f54c-1ba9-402f-9548-0cfb780bcd46
  reviewer: 52751c95-a779-48f8-b42f-7c08f0790a03
  verifier: 3aa4ffed-73b3-4113-bff6-15ff95cf6fa1
  watchdog: 38f85b4b-752c-4f75-b55f-24c8c4d8023e
  auditor: 87334a5f-5a53-42bf-b824-1a3984fc03ca
```

## Final issue state

```yaml
issues:
  PCP-1:
    status: done
    purpose: kickoff, source-of-truth, stage plan
  PCP-2:
    status: done
    purpose: worker deliverable
    worker_run: ec00d8db-56f4-40c3-adbd-8a01ee3ae29a
  PCP-3:
    status: done
    purpose: reviewer pass
    reviewer_run: d9c15e6f-3bdc-4b1e-bb63-84b06bc2012e
  PCP-4:
    status: done
    purpose: verifier pass
    verifier_run: d1837315-be72-4f49-a094-3dd25cb15082
  PCP-5:
    status: blocked
    purpose: synthetic user-question blocker
  PCP-6:
    status: done
    purpose: project status consolidation
    project_run: 9c183c49-6f40-4438-9afa-b75e1ea79268
  PCP-7:
    status: done
    purpose: watchdog liveness digest
    watchdog_run: 4d305dc8-1d68-46bb-bcdb-a66c14db49de
  PCP-8:
    status: done
    purpose: auditor pass
    auditor_run: 620faa40-fe3c-4486-b64a-df66c280aca0
```

Final Paperclip readback showed `liveRuns: 0`.

## Evidence

The worker created a tutorial artifact:

```text
outputs/paperclip-native-workspace/tutorial-project/tutorial-output/worker-deliverable.md
```

The reviewer posted an agent-authored `PASS` comment. The verifier checked the
worker artifact, reviewer comment, run ids, and issue evidence. The watchdog ran
an assignment-triggered digest and the scheduler created a timer-triggered
watchdog run, which was then cancelled intentionally after timer evidence was
captured. The auditor completed the control-plane audit.

The final readback was saved locally as:

```text
outputs/paperclip-native-evidence/final-readback.json
```

## Findings

```yaml
findings:
  control_plane_fit:
    result: pass
    note: issues, comments, checkouts, heartbeat_runs, scheduler readback, and artifacts were enough to reconstruct compact project status without opening every Codex session.
  codex_as_provider:
    result: pass_with_caveat
    note: after PAPERCLIP_AGENT_JWT_SECRET was set, agent comments were correctly attributed as agent-authored.
  heartbeat_scheduler:
    result: pass_with_endpoint_gap
    note: /api/instance/scheduler-heartbeats worked, while hardcoded /api/scheduler-heartbeats and company-scoped scheduler paths failed.
  blocker_model:
    result: pass_with_dependency_gap
    note: blockedByIssueIds is a hard dependency and should not be used as the review-target relation when review must run before the worker issue is done.
  lease_readback:
    result: pass_with_rule
    note: active lease must be read from checkout/live run state, not assignee alone.
  user_question_blocker:
    result: pass
    note: PCP-5 kept the operator question as the first description line.
```

## Decision

Use Paperclip-native orchestration as the default portable workflow.

This kit should package:

- Paperclip company/project/agent setup guidance;
- role instruction bundles;
- task/status/blocker conventions;
- watchdog and auditor policies;
- evidence/review/verification/UAT contracts;
- validators and examples.

Keep the Codex-thread workflow as fallback for projects that do not run
Paperclip.
