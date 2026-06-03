# TUT-005 Retrospective Audit

Auditor thread: `thread-tut-auditor-005`
Scope: local tutorial pilot files only.
Authority: no Linear writes, public actions, runtime actions, or edits outside `examples/tutorial-pilot`.

## System health

- Evidence reviewed: `evidence/TUT-001-worker-evidence.md`, `evidence/TUT-002-review.md`, `evidence/TUT-003-verification.md`, and `watchdog/watchdog-digest.md`.
- Thread naming uses task ids and roles. Evidence source: `.org/tasks.yaml` records `project_prefix: TUT` and task ids such as `TUT-001`.
- Registry reconciliation gap observed during the run: `TUT-003` task lease was released in `.org/tasks.yaml` while the thread registry and `.org/control.md` still showed the verifier lease as active. The orchestrator reconciled those surfaces after the auditor handoff.

## Top bottlenecks

- The prompt contract did not explicitly distinguish `source_thread_id` from the child holder/current thread id. This caused the auditor to rename the parent/orchestrator thread before the correction arrived.
- Child role prompts need their own `current_thread_id` or `holder_thread_id` field. Role threads must not manage parent/orchestrator thread metadata.
- `context-mode` degraded during the watchdog scan with a local `better-sqlite3` Node ABI mismatch. The watchdog recovered with bounded local reads, but the fallback path should be documented as expected behavior.

## Weak evidence patterns

- `evidence/TUT-001-worker-evidence.md` records `anti-slop gate --allow-research` for the release note and worker evidence.
- `evidence/TUT-003-verification.md` records `Verification was file-based only` and `Browser, build, and runtime UAT were not required by this pilot acceptance scope`.
- `evidence/TUT-001-worker-evidence.md` identifies `source/customer-notes.md` as the only factual source used for `deliverables/tutorial-release-note.md`.

## Lease and registry gaps

- Lease state appears in task entries, thread registry rows, and `.org/control.md`.
- Evidence source for the `TUT-003` reconciliation gap: `.org/control.md` later records `TUT-003 and TUT-005 leases reconciled as released by orchestrator after verifier/auditor handoff`.
- `watchdog/watchdog-digest.md` detected `TUT-001` evidence plus `ready_for_review` while the lease was still active.
- `watchdog/watchdog-digest.md` and `evidence/TUT-003-verification.md` both record no Linear writes, public actions, or runtime actions.

## Recommended improvements

- From the orchestrator correction: add explicit child identity fields to delegated prompts: `source_thread_id`, `current_thread_id`, and `holder_thread_id`.
- From the `TUT-003` registry/task mismatch: reconcile task lease, thread registry, and control digest in the same handoff step.
- From `watchdog/watchdog-digest.md`: add a watchdog check for registry/task lease divergence.
- From the recorded `context-mode` ABI failure: document the bounded direct-read fallback path in the tutorial.
- From `evidence/TUT-001-worker-evidence.md` and `evidence/TUT-003-verification.md`: keep anti-slop and verification gates as explicit role acceptance items.

## Handoff

Retrospective audit complete. Handoff: revise the tutorial prompt/template schema so role threads receive their own thread id and treat parent/orchestrator thread ids as read-only provenance.
