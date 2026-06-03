# Synthetic dry-run pilot v0.1

## 0. grounding

```yaml
grounded_in:
  - outputs/control-plane-policies-and-synthetic-pilot-v0.1.md
  - outputs/synthetic-pilot-task-board-v0.1.yaml
scope:
  real_worker_threads: false
  real_linear_issues: false
  runtime_actions: false
  public_actions: false
```

## 1. pilot

```yaml
pilot:
  id: digital-org-synthetic-tutorial
  project: Digital Org Synthetic Tutorial
  autonomy_profile: local_execution
  canonical_surface: fallback_yaml_for_dry_run
  primary_future_surface: Linear
  domains:
    - orgops
    - development
  goal: Exercise the digital organization lifecycle without touching external systems.
```

## 2. role simulation

```yaml
roles:
  chief_orchestrator:
    actor: current_chat
  project_orchestrator:
    actor: simulated
  feature_orchestrator:
    actor: simulated
  worker:
    actor: simulated
  reviewer:
    actor: simulated
  qa:
    actor: simulated
  verifier:
    actor: simulated
  auditor:
    actor: simulated
```

## 3. stage walkthrough

```yaml
walkthrough:
  intake:
    task: SYN-001
    output: goal_and_acceptance_criteria
  context_loading:
    task: SYN-002
    output: source_of_truth_map
  source_of_truth_map:
    output: current_truth_separated_from_memory
  planning:
    output: tiny_plan_for_tutorial_artifact
  second_opinion_no_magic_review:
    output: authority_double_count_degraded_state_check
  decomposition:
    output: worker_reviewer_verifier_tasks
  lease_assignment:
    output: lease_records
  execution:
    task: SYN-003
    output: simulated_artifact_and_blocker
  worker_to_worker_blocker:
    output: peer_dependency_record
  user_question_blocker:
    output: user_owned_uat_blocker
  review:
    output: reviewer_verdict
  qa:
    output: qa_record
  verification:
    task: SYN-004
    output: verifier_verdict
  uat:
    output: user_acceptance_prompt_or_record
  reporting_consolidation:
    output: compact_digest
  handoff_archival:
    output: retrospective
  worker_shutdown:
    output: no_active_lease_without_handoff
```

## 4. expected dry-run digest

```text
Что сейчас делаем:
Проверяем цифровую организацию на синтетическом tutorial-проекте без реальных воркеров и без Linear writes.

Что уже продвинулось:
Есть operating model, task schema, control policies, skill specs, installable skills, Linear/fallback specs, authority/evidence contracts, domain packs и synthetic task board.

Что идет не по плану:
Ничего критичного. Real Linear API и реальные worker threads пока не включены.

Где нужно твое внимание:
После dry-run нужно принять решение: запускать pilot с реальными worker threads или сначала доработать Linear adapter.

Какие задачи без воркера:
В dry-run это ожидаемо: simulated tasks не имеют реальных worker thread ids.

Какие риски:
Linear API limits еще не проверены live. Memory cleanup/dedup еще не описан отдельным spec.

Следующий шаг системы:
Прокатить dry-run walkthrough по task board и собрать retrospective.

Kill switch state:
active; external actions disabled.
```

## 5. dry-run acceptance criteria

```yaml
acceptance_criteria:
  - every_core_stage_has_a_simulated_output
  - every_core_role_is_exercised
  - one_user_blocker_is_represented
  - one_orphan_or_stale_lease_path_is_represented
  - review_and_verification_are_separate
  - digest_is_human_readable
  - no_real_linear_or_worker_actions_occur
```

## 6. dry-run verification record

```yaml
verification:
  state: ready
  checks:
    task_board_exists: outputs/synthetic-pilot-task-board-v0.1.yaml
    specs_exist:
      - outputs/org-operating-model-v0.1.md
      - outputs/canonical-task-schema-and-stage-machine-v0.1.md
      - outputs/control-plane-policies-and-synthetic-pilot-v0.1.md
      - outputs/portable-skill-specs-v0.1.md
      - outputs/linear-adapter-spec-v0.1.md
      - outputs/fallback-board-spec-v0.1.md
      - outputs/authority-and-evidence-contracts-v0.1.md
      - outputs/domain-pack-orgops-v0.1.md
      - outputs/domain-pack-development-v0.1.md
    installable_skills_exist:
      - ~/.codex/skills/digital-org-orchestrator/SKILL.md
      - ~/.codex/skills/digital-org-worker/SKILL.md
      - ~/.codex/skills/digital-org-reviewer/SKILL.md
      - ~/.codex/skills/digital-org-verifier/SKILL.md
      - ~/.codex/skills/digital-org-auditor/SKILL.md
      - ~/.codex/skills/digital-org-domain-orgops/SKILL.md
      - ~/.codex/skills/digital-org-domain-development/SKILL.md
```

## 7. real Codex thread pilot gate

```yaml
real_codex_thread_pilot_gate:
  requires:
    - dry_run_reviewed
    - user_allows_real_codex_worker_threads
    - kill_switch_confirmed
    - max_workers_set
    - linear_write_policy_confirmed
  default_max_workers: 3
  default_runtime_actions: none
  default_public_actions: none
```
