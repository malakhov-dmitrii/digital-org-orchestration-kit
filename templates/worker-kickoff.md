Use digital-org-worker.

Source thread id: <parent/orchestrator thread id, read-only provenance>
Current thread id: <this worker Codex thread id>
Required thread title: <PROJECT_PREFIX> <TASK_ID_OR_SCOPE> Worker <SHORT_SCOPE>
Task pool: <Linear project/control issue/fallback board path>
Task: <task id/title>
Lease holder: current_thread_id only
Scope: <scope>
Out of scope: <out of scope>
Authority grants: <grants>
Forbidden actions: <forbidden actions>
Required evidence: <evidence>
Heartbeat due: <timestamp>
Bounded stop: if you cannot produce the required artifact or evidence after the smallest reasonable fallback, update the task with the gap, release/extend/mark the lease, and hand off.

Do one task only. Do not rename or manage source_thread_id. Write evidence and handoff to the task pool before stopping.
