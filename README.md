# Digital org orchestration kit

Run a small team of AI agents without losing track of who owns what.

The package inventory is defined in `manifest.json`. The main workflow is described in `docs/thread-first-project-workflow-v0.1.md`.

The repo contains docs, local skills, templates, validators, and a tutorial pilot.

## Why this exists

Once you have more than one AI agent working on a project, chat history stops being enough.

You need answers to basic operational questions:

- What is the goal?
- Which tasks exist?
- Which agent thread owns each task?
- Is the lease still alive?
- What is blocked by the user, another agent, credentials, or runtime ownership?
- What evidence proves the work is done?
- Who reviewed and verified it?
- What happens if a worker chat stops?

The workflow in `docs/thread-first-project-workflow-v0.1.md` turns those questions into project stages and handoff rules.

## Core idea

Use real Codex threads as durable role owners:

- orchestrator
- worker
- reviewer
- verifier
- watchdog
- auditor

The repo's operating contract sets `organizational_agent_surface: Codex_thread` and `subagent_surface: secondary_internal_tool` in `manifest.json`. The lease rules live in `docs/canonical-task-schema-and-stage-machine-v0.1.md`.

Every role thread gets a readable title:

```text
<TASK_ID_OR_SCOPE> <ROLE> <SHORT_SCOPE>
```

Example:

```text
TUT-001 Worker release note
```

The task id includes the project prefix. Keep that prefix to 1-3 characters, for example `TUT-001`. The rule is documented in `docs/thread-naming-convention-v0.1.md`; the tutorial pilot also records named role threads in `examples/tutorial-pilot/pilot-report.md`.

## What is included

- `skills/` - installable local Codex skills for orchestrator, worker, reviewer, verifier, auditor, and domain packs.
- `templates/` - kickoff prompts, task records, control records, watchdog digests, final reports.
- `docs/` - the operating model, stage machine, Linear/fallback board rules, authority model, evidence contract, watchdog policy, and onboarding flow.
- `examples/tutorial-pilot/` - a safe synthetic pilot showing the full loop with worker, review, verification, watchdog, and audit artifacts.
- `validators/` - a small local validator that checks package completeness and key invariants.

## Quick start

Clone the repo:

```bash
git clone https://github.com/malakhov-dmitrii/digital-org-orchestration-kit.git
cd digital-org-orchestration-kit
```

Check the package:

```bash
node validators/validate-kit.mjs
```

If you use local Codex skills, preview the install:

```bash
node scripts/install-skills.mjs
```

Install the skills:

```bash
node scripts/install-skills.mjs --write
```

Then start a new Codex chat and invoke:

```text
digital-org-project-activation
```

Use that first chat as the project orchestrator. It should set up the goal, source-of-truth map, authority profile, task pool, thread registry, lease policy, and watchdog baseline before assigning workers.

## Minimal workflow

Start with the activation flow in `docs/portable-project-activation-kit-v0.1.md` and `docs/thread-first-project-workflow-v0.1.md`:

1. Define the project goal and non-goals.
2. Pick a source of truth: Linear project/issues, or the fallback task board file.
3. Write the source-of-truth map: repo, runtime, DB, task state, user decisions, evidence.
4. Create small tasks with clear acceptance criteria.
5. Spawn or assign one worker thread per task.
6. Record a lease: thread id, title, task id, scope, TTL, allowed and forbidden actions.
7. Require evidence before review.
8. Review the worker output.
9. Verify the claim independently.
10. Run watchdog checks for stale leases, orphaned work, blockers, and loops.
11. Write a compact report and archive or shut down role threads cleanly.

## Linear or fallback board

The preferred durable task pool is Linear:

- projects for project boundaries;
- issues for tasks;
- labels for domains, blockers, leases, and risk;
- comments or structured blocks for evidence and handoff.

If Linear is not available, the repo includes a fallback board format in:

```text
templates/fallback-task-board.yaml
```

The orchestrator skill sets `chat_is_durable_state: false` in `skills/digital-org-orchestrator/SKILL.md`.

## Paperclip control plane option

The Paperclip adapter decision brief is in
`docs/paperclip-control-plane-integration-brief-v0.1.md`. It keeps this kit as
the operating pack and treats Paperclip as a candidate control plane until a
local compatibility spike passes.

## Watchdogs and heartbeats

The kit defines worker, orchestrator, and watchdog heartbeat lanes. A watchdog should regularly check:

- active tasks without workers;
- active workers without valid tasks;
- stale leases;
- task/registry/control divergence;
- repeated activity without material progress;
- user questions mixed with peer/runtime blockers;
- verification-ready work without a verifier.

The tutorial pilot records one watchdog pass. See `examples/tutorial-pilot/audit/post-pilot-system-audit.md` for the post-pilot heartbeat audit.

## Tutorial pilot

Start here if you want to see what the system looks like after a run:

```text
examples/tutorial-pilot/pilot-report.md
```

The pilot scope is declared in `examples/tutorial-pilot/README.md`.

## Public export note

See `PUBLICATION.md` for the public export note.

## Current limits

- Package inventory: see `manifest.json`.
- Linear project update status: see `examples/tutorial-pilot/pilot-report.md`.
- Heartbeat automation status: see `examples/tutorial-pilot/audit/post-pilot-system-audit.md`.
- Authority gates: see `docs/authority-and-evidence-contracts-v0.1.md`.
- Memory hygiene status: see `docs/deliverables-index-v0.1.md`.

## Good first customization

For a real project, start by changing:

- project prefix;
- Linear project or fallback board path;
- authority profile;
- domain pack;
- worker TTL;
- watchdog cadence;
- evidence requirements;
- final report format.

Keep the thread-first rule intact: real work ownership belongs to a named Codex thread with a lease and evidence.
