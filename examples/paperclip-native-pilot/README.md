# Paperclip-native pilot

This example summarizes the local synthetic pilot that moved the kit from
Codex-thread-owned orchestration to Paperclip-owned orchestration.

The pilot used a local Paperclip instance, a dedicated company, a project with
`PCP` issue prefix, Paperclip role agents, Paperclip issues, heartbeat runs,
watchdog scheduling, worker output, review, verification, a user-question
blocker, project status consolidation, and an auditor pass.

No Linear writes, public actions, deploys, or production DB actions were part of
this pilot.

Start with `pilot-report.md`.
