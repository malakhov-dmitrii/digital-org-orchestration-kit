# Paperclip-native pilot report

Status: completed local synthetic pilot
Date: 2026-06-03

## Summary

The pilot proved the better target architecture: Paperclip owns orchestration,
and Codex is a provider.

Paperclip held the durable state for:

- company and project;
- role agents;
- issues and statuses;
- checkouts and heartbeat runs;
- scheduler readback;
- comments and evidence;
- user-question blocker;
- watchdog and auditor passes.

Codex performed work through `codex_local`, but Codex chats were not the durable
lease owners.

Grounding: the issue statuses, run ids, agent attribution, and final no-live-run
state came from the local Paperclip API readback saved at
`outputs/paperclip-native-evidence/final-readback.json`.

## Final state

```yaml
paperclip:
  version: 0.3.1
  live_runs: 0
  project_prefix: PCP
issues:
  done:
    - PCP-1 kickoff
    - PCP-2 worker deliverable
    - PCP-3 reviewer pass
    - PCP-4 verifier pass
    - PCP-6 project status consolidation
    - PCP-7 watchdog digest
    - PCP-8 auditor pass
  blocked:
    - PCP-5 synthetic UAT/user-question blocker
worker_artifact:
  path: outputs/paperclip-native-workspace/tutorial-project/tutorial-output/worker-deliverable.md
```

## What worked

Paperclip state was enough to reconstruct compact status without reading every
Codex session. The issue and run records showed who worked, what completed, what
was blocked, and where evidence lived.

The worker, reviewer, verifier, watchdog, project orchestrator, and auditor all
ran as Paperclip agents.

The user-question blocker kept the question at the top of the description:

```text
Question: Should this pilot treat Paperclip heartbeat_runs/checkouts/issues as
the primary source of truth and downgrade Codex chats to provider/runtime
sessions only?
```

## Gaps found

1. Provider auth is load-bearing.

   In the local pilot, the first server start lacked
   `PAPERCLIP_AGENT_JWT_SECRET`; agent API writes were not attributed as agent
   writes and automation wake loops appeared. After restart with the secret set,
   worker and reviewer comments were agent-authored in the readback.

2. Scheduler endpoint discovery must be version-aware.

   The working scheduler readback endpoint was
   `/api/instance/scheduler-heartbeats`. Hardcoded generic and company-scoped
   scheduler paths failed.

3. Dependency links are not review links.

   `blockedByIssueIds` blocked the reviewer until the worker issue was `done`.
   For review-before-done flows, use a review task with artifact references, not
   a hard dependency.

4. Assignee is not the lease.

   The final readback had done issues with assignees but no checkout run and
   `liveRuns: 0`. Active lease detection must use checkout and live heartbeat
   run state.

5. Verifier authority needs sharper instructions.

   The verifier proved worker/reviewer evidence but did not close the worker
   issue. The project orchestrator recovered by closing the issue. Future
   verifier instructions should say exactly which issues the verifier may close.

## Decision

Use Paperclip-native as the default. Keep the Codex-thread pilot as a fallback
pattern for projects without Paperclip.
