# Org Operating Model v0.1

## 1. Короткая формулировка

Мы строим цифровую организацию: систему, которая принимает цели, раскладывает их на управляемые задачи, назначает роли, выдает leases, отслеживает blockers, требует evidence, проводит review/QA/verification/UAT и улучшает собственный процесс после завершения работы.

Центр системы - не чат и не конкретный инструмент. Центр системы - durable task pool и общий организационный протокол.

Базовая формула:

```text
agent = role + domain + task + authority + tools + evidence contract
```

## 2. Слои системы

### 2.1. Memory / Context Layer

Отвечает на вопрос: что мы уже знаем?

Источники:

- GBrain / Second Brain: долговременные решения, lessons learned, historical context.
- Codex memory: предпочтения, повторяющиеся project facts, прошлые execution summaries.
- Project docs / repo docs: спецификации, ADR, README, runbooks.
- Runtime evidence: logs, browser screenshots, test output, deploy receipts.

Правило: память не является текущей правдой для статуса задачи. Она помогает загрузить контекст, но текущая работа живет в task pool.

### 2.2. Work Control Layer

Отвечает на вопрос: что делаем сейчас и кто за это отвечает?

Основной вариант:

- Linear projects/issues/labels/cycles/milestones.

Fallback:

- project-local task-board file с такой же схемой task record.

Task pool хранит:

- goals;
- tasks;
- stage;
- owner;
- lease;
- blockers;
- authority constraints;
- evidence;
- review/verification/UAT state;
- handoff/archive state.

### 2.3. Execution Layer

Отвечает на вопрос: кто и чем исполняет работу?

Инструменты:

- Codex worker threads;
- GStack skills;
- Superpowers workflows;
- Forge-style execution loops;
- browser/runtime tools;
- repo/test/build/deploy tools.

Правило: execution tools не должны сами становиться source of truth. Они пишут результаты обратно в task pool.

### 2.4. Governance Layer

Отвечает на вопрос: кто имеет право принимать решения?

Governance фиксирует:

- кто может принять план;
- кто может менять scope;
- кто может трогать prod/runtime/DB;
- кто может выполнять public actions;
- кто может закрыть задачу;
- кто может принять UAT;
- когда нужен пользователь.

## 3. Роли

### 3.1. Chief Orchestrator

Владеет общей целью, организационной моделью, authority boundaries и финальной консолидацией.

Не обязан выполнять задачи. Его задача - держать систему управляемой.

### 3.2. Project Orchestrator

Ведет проектный task pool:

- выбирает source of truth;
- поддерживает project status;
- управляет project-level blockers;
- распределяет workstreams;
- готовит компактный отчет chief orchestrator'у.

### 3.3. Feature / Unit Orchestrator

Дробит один feature/workstream на leased tasks:

- формулирует acceptance criteria;
- создает task records;
- назначает workers/reviewers/verifiers;
- следит за blockers и handoffs.

### 3.4. Worker

Выполняет одну bounded задачу в рамках lease.

Worker не закрывает финально собственную задачу, кроме явно разрешенных low-risk случаев.

### 3.5. Reviewer

Ищет дефекты:

- логические ошибки;
- слабые assumptions;
- несоответствие scope;
- качество реализации или материала;
- gaps в tests/evidence.

Reviewer проверяет качество, но не обязательно доказывает финальную готовность.

### 3.6. Verifier

Проверяет claim по evidence и acceptance criteria.

Verifier отвечает на вопрос: доказано ли, что задача выполнена?

### 3.7. Auditor / OrgOps Agent

Проверяет здоровье самой организации:

- stale leases;
- повторяющиеся blockers;
- слабые task templates;
- лишнее планирование;
- poor evidence;
- неэффективные skills;
- плохой reporting;
- места, где нужен новый reusable skill.

### 3.8. Runtime Owner

Владеет shared runtime surface:

- production deploy;
- DB migration;
- browser profile;
- external account;
- public channel;
- paid action;
- customer-facing environment.

Правило: один runtime owner на один shared surface в один момент времени.

## 4. Доменные вертикали

Общий протокол одинаковый для всех доменов. Домены подключаются как packs.

Примеры:

- development;
- marketing;
- product;
- design;
- research;
- ops;
- support;
- sales;
- finance/legal/admin.

Domain pack уточняет:

- source-of-truth map;
- tools;
- acceptance criteria;
- evidence contract;
- common blockers;
- review checklist;
- verifier checklist;
- authority rules.

Domain pack не меняет stage machine. Он только конкретизирует поведение ролей.

Пример:

```text
development.worker = worker role + repo/test/build/deploy rules
marketing.worker = worker role + audience/channel/brand/publish rules
development.verifier = verifier role + tests/runtime/regression evidence
marketing.verifier = verifier role + factual grounding/preview/approval/publish evidence
```

## 5. Stage Machine

### 5.1. Полный lifecycle

```text
intake
-> context_loading
-> source_of_truth_map
-> planning
-> second_opinion_no_magic_review
-> decomposition
-> lease_assignment
-> execution
-> review
-> QA
-> verification
-> UAT
-> reporting_consolidation
-> handoff_archival
-> worker_shutdown
```

### 5.2. Blocker stages

Blockers могут возникать между стадиями и внутри execution:

- worker_to_worker_blocker;
- user_question_blocker;
- runtime_owner_blocker;
- missing_credentials_blocker;
- unclear_spec_blocker;
- authority_blocker;
- stale_or_looping_blocker.

Blocker - это не просто комментарий. Это состояние задачи с owner, reason, next action и expiry.

## 6. Task Record Schema

Минимальная схема:

```yaml
id: TASK-123
title: Short concrete task
goal: One outcome the task must produce
project: project-name
domain: development | marketing | product | design | ops | research
role_lane: worker | reviewer | verifier | auditor
stage: intake | planning | execution | review | QA | verification | UAT | done | archived
status: ready | claimed | in_progress | blocked | verify | accepted | done | canceled
owner:
  agent_id: AI-XX
  thread_id: optional-thread-id
  role: worker
lease:
  scope: exact owned scope
  started_at: ISO-8601
  expires_at: ISO-8601
  heartbeat_due_at: ISO-8601
  stale_policy: recover | extend | escalate
authority:
  can_edit_files: true
  can_deploy: false
  can_mutate_db: false
  can_public_action: false
  can_close_task: false
blockers:
  - type: blocked_user
    reason: exact question or missing decision
    owner: user | peer | runtime_owner | orchestrator
    next_action: exact unblock step
evidence:
  required:
    - test output
    - runtime proof
  provided:
    - kind: command
      summary: exact command and result
      artifact: path or link
review:
  state: not_started | requested | passed | failed
verification:
  state: not_started | requested | passed | failed
UAT:
  state: not_required | requested | accepted | rejected
handoff:
  next_action: exact next action if work stops here
  known_gaps: explicit gaps
archive:
  final_summary: compact result
  closed_at: ISO-8601
```

## 7. Lease Model

Lease означает: один агент временно владеет конкретным scope.

Lease содержит:

- owner;
- task id;
- scope;
- allowed actions;
- forbidden actions;
- start time;
- TTL;
- heartbeat interval;
- evidence required before release;
- stale recovery rule.

### 7.1. Stale lease detection

Lease stale, если:

- heartbeat просрочен;
- нет нового evidence после N checkpoints;
- worker повторяет тот же blocker без изменения;
- worker расширяет scope без approval;
- thread остановился без handoff;
- runtime owner не отвечает после expiry.

### 7.2. Recovery after stopped chat

Recovery sequence:

1. Orchestrator читает task record, не полный чат.
2. Проверяет last evidence и handoff.
3. Если evidence достаточно - отправляет на review/verification.
4. Если evidence недостаточно - возвращает task в ready/recovery.
5. Если scope мог быть частично изменен - запускает reviewer/verifier before reassignment.
6. Старый lease закрывается как stale или superseded.

## 8. Blocker Routing

Blocker должен иметь тип и owner.

Типы:

- `blocked_user`: нужен выбор, acceptance, authority или private context от пользователя.
- `blocked_peer`: нужен результат другого worker.
- `blocked_runtime_owner`: shared runtime занят или owner не дал окно.
- `blocked_credentials`: нет ключа, сессии, token, account access.
- `blocked_authority`: действие возможно технически, но нет права.
- `blocked_unclear_spec`: acceptance criteria невозможно вывести безопасно.
- `blocked_external`: внешний сервис, API, CI, deploy, vendor.
- `stale_or_looping`: агент топчется без нового evidence.

Правило: если blocker можно снять чтением docs, GBrain, Linear, repo или logs, агент не должен блокировать пользователя.

Пользователя спрашиваем только когда:

- нужен authority;
- нужен приватный факт;
- есть materially branching decision;
- действие необратимое или public;
- acceptance нельзя вывести из текущих источников.

## 9. Authority Matrix

Authority должна быть явной.

Пример уровней:

| Authority | Кто может | Требует approval |
| --- | --- | --- |
| read_context | Читать docs, память, issues | Нет |
| edit_local | Менять локальные файлы | Обычно нет, если scope выдан |
| run_tests | Запускать tests/build/lint | Нет |
| use_browser_readonly | Открывать страницы read-only | Нет |
| mutate_runtime | Менять runtime state | Да, если shared/live |
| deploy_staging | Деплой в staging | Зависит от проекта |
| deploy_prod | Деплой в prod | Да |
| mutate_db | DB write/migration | Да |
| public_action | Пост, письмо, customer-facing действие | Да |
| spend_money | Любое платное действие | Да |
| close_task | Закрыть task as done | Verifier/orchestrator only |
| accept_plan | Принять план | User/chief/project orchestrator по правилам |

## 10. Evidence Contract

Evidence - это не “я сделал”. Evidence - это проверяемый receipt.

### 10.1. Execution evidence

Worker должен оставить:

- что изменено;
- почему это в scope;
- какие команды/проверки запускались;
- какие gaps остались;
- что нужно reviewer/verifier.

### 10.2. Review evidence

Reviewer должен оставить:

- найденные issues;
- severity;
- file/artifact references;
- что проверено;
- что не проверено;
- verdict: pass / needs fix / blocked.

### 10.3. QA evidence

QA должен оставить:

- сценарии;
- результаты;
- screenshots/logs/artifacts где применимо;
- known gaps;
- reproduction details для failures.

### 10.4. Verification evidence

Verifier должен связать:

- acceptance criteria;
- provided evidence;
- independent checks;
- final verdict.

### 10.5. UAT evidence

UAT фиксирует:

- что увидел или принял пользователь;
- какие условия acceptance были подтверждены;
- какие gaps accepted/deferred;
- кто принял.

## 11. Reporting

Chief/project orchestrator не должен перечитывать полные чаты.

Каждый report должен быть компактным:

```text
Project:
Current goal:
Green:
At risk:
Blocked:
Needs user:
Ready for UAT:
Recent evidence:
Next checkpoint:
Stale leases:
Decisions needed:
```

Worker status format:

```text
Task:
Lease:
Stage:
Progress since last checkpoint:
Evidence added:
Blocker:
Next action:
ETA / next heartbeat:
```

## 12. Anti-stall Rules

Система должна замечать слабый прогресс.

Триггеры:

- два heartbeat подряд без нового evidence;
- worker только читает и не формулирует next observable step;
- task scope расширяется;
- план становится длиннее, но deliverable не приближается;
- один blocker повторяется без escalation;
- verifier не может связать evidence с acceptance criteria;
- stale lease после остановленного чата.

Действия:

- cut scope;
- replan;
- ask targeted user question;
- reassign;
- spawn verifier/reviewer;
- escalate to project/chief orchestrator;
- archive dead path with reason.

## 13. OrgOps / Auditor Loop

OrgOps agent запускается регулярно или после крупных milestones.

Проверяет:

- активные leases;
- blocked tasks;
- stale tasks;
- weak evidence patterns;
- recurring user questions;
- unnecessary planning;
- overloaded roles;
- missing domain packs;
- outdated skills;
- reporting noise;
- tasks closed without verification.

Выход OrgOps:

```text
System health:
Top bottlenecks:
Repeated blockers:
Skills to create/update:
Templates to improve:
Authority risks:
Suggested simplifications:
```

## 14. Packaging Into Skills

Первый набор portable skills:

### 14.1. digital-org-orchestrator

Для chief/project/feature orchestrators.

Содержит:

- stage machine;
- task record rules;
- lease assignment;
- blocker routing;
- authority checks;
- reporting;
- handoff/archive.

### 14.2. digital-org-worker

Для execution agents.

Содержит:

- take one leased task;
- respect scope;
- execute within authority;
- update evidence;
- mark ready for review/verification;
- do not self-close.

### 14.3. digital-org-reviewer

Для quality review.

Содержит:

- check scope;
- check defects;
- check assumptions;
- check forbidden actions;
- write actionable findings.

### 14.4. digital-org-verifier

Для independent verification.

Содержит:

- map acceptance criteria to evidence;
- rerun or inspect proof;
- reject unsupported claims;
- close only when evidence supports done.

### 14.5. digital-org-auditor

Для OrgOps.

Содержит:

- stale lease scan;
- blocker pattern scan;
- reporting quality review;
- skill/template improvement proposals.

### 14.6. Domain packs

Например:

- domain-development;
- domain-marketing;
- domain-product;
- domain-design;
- domain-research;
- domain-ops.

## 15. Linear Adapter

Linear - preferred durable task pool.

Mapping:

- Linear Project = organization/project mission.
- Milestone/Cycle = delivery window.
- Parent issue = goal/workstream.
- Child issue = leased task.
- Labels = domain, role lane, blocker type, authority, proof required.
- Comments = compact evidence receipts, not full chat logs.
- Issue status = stage/status.

Recommended labels:

- `role:orchestrator`
- `role:worker`
- `role:reviewer`
- `role:verifier`
- `role:auditor`
- `domain:development`
- `domain:marketing`
- `blocked:user`
- `blocked:peer`
- `blocked:runtime-owner`
- `blocked:credentials`
- `blocked:authority`
- `proof-required`
- `runtime-owner`
- `uat-required`

## 16. Fallback Task Board Adapter

Если Linear недоступен, используем файл:

```text
.org/task-board.md
```

или JSON/YAML:

```text
.org/tasks.json
```

Требование: fallback board обязан сохранять те же поля, что Linear task record.

## 17. No-Magic Review

Verdict: needs edits before implementation, but good enough as v0.1 operating model.

Main gaps:

- Нужно выбрать canonical task schema format for fallback: Markdown, YAML или JSON.
- Нужно определить concrete TTL defaults by task type.
- Нужно определить, кто именно имеет authority в каждом проекте.
- Нужно решить, как GBrain updates попадают в память: автоматически, вручную, через auditor.
- Нужно описать минимальный viable Linear setup.
- Нужно определить, какие skills уже существуют и какие надо создать.

Double-count risks:

- Одна задача может жить одновременно в Linear и fallback board.
- Один runtime может иметь двух owners.
- Один worker может self-report done без verifier.
- GBrain memory может быть принята за current state.

Degraded states:

- Linear unavailable -> fallback board.
- GBrain stale -> use as historical context only.
- Worker stopped -> stale lease recovery.
- Verifier unavailable -> task cannot move to done unless low-risk exception allowed.
- User unavailable -> only non-authority work may continue.

## 18. Recommended Build Sequence

1. Finalize this operating model.
2. Write canonical task schema.
3. Write stage transition table.
4. Write authority matrix template.
5. Write evidence contract templates by domain.
6. Write portable skill specs.
7. Write Linear adapter spec.
8. Write fallback board spec.
9. Pilot on one non-production project.
10. Add OrgOps audit loop.
11. Add dashboard/digest automation.
12. Expand domain packs.
