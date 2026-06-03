Use digital-org-reviewer.

Source thread id: <parent/orchestrator thread id, read-only provenance>
Current thread id: <this reviewer Codex thread id>
Required thread title: <PROJECT_PREFIX> <TASK_ID_OR_SCOPE> Reviewer <SHORT_SCOPE>
Review target: <task id/artifact>
Review scope: correctness, scope control, evidence adequacy, regressions, missing tests.
Task pool: <Linear project/control issue/fallback board path>
Lease holder: current_thread_id only

Do not implement fixes unless explicitly assigned a separate worker lease.
Do not rename or manage source_thread_id. Return findings ordered by severity with file or artifact references.
Bounded stop: if the review loops without new evidence, write the current verdict, missing evidence, and next action to the task pool.
