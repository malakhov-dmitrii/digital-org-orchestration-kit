# Deliverables Index v0.1

## Specs

```yaml
specs:
  paperclip_native_control_plane_workflow: outputs/paperclip-native-control-plane-workflow-v0.1.md
  paperclip_native_pilot_readback: outputs/paperclip-native-pilot-readback-v0.1.md
  paperclip_control_plane_integration: outputs/paperclip-control-plane-integration-brief-v0.1.md
  operating_model: outputs/org-operating-model-v0.1.md
  task_schema_stage_machine: outputs/canonical-task-schema-and-stage-machine-v0.1.md
  control_policies_synthetic_pilot: outputs/control-plane-policies-and-synthetic-pilot-v0.1.md
  thread_first_project_workflow: outputs/thread-first-project-workflow-v0.1.md
  project_activation_kit: outputs/portable-project-activation-kit-v0.1.md
  project_onboarding_discovery_kickoff: outputs/project-onboarding-discovery-kickoff-v0.1.md
  project_setup_linear_template: outputs/project-setup-and-linear-template-v0.1.md
  templates_and_checklists: outputs/templates-and-checklists-v0.1.md
  control_loops_heartbeats_watchdogs: outputs/control-loops-heartbeats-watchdogs-v0.1.md
  thread_naming_convention: outputs/thread-naming-convention-v0.1.md
  portable_skill_specs: outputs/portable-skill-specs-v0.1.md
  linear_adapter: outputs/linear-adapter-spec-v0.1.md
  fallback_board: outputs/fallback-board-spec-v0.1.md
  authority_evidence_contracts: outputs/authority-and-evidence-contracts-v0.1.md
  linear_reconciliation_rules: outputs/linear-reconciliation-rules-v0.1.md
  gastown_inspiration_notes: outputs/gastown-inspiration-notes-v0.1.md
  gastown_pattern_implementation_roadmap: outputs/gastown-pattern-implementation-roadmap-v0.1.md
  no_magic_review_portable_kit: outputs/no-magic-review-portable-kit-v0.1.md
  domain_orgops: outputs/domain-pack-orgops-v0.1.md
  domain_development: outputs/domain-pack-development-v0.1.md
```

## Pilot

```yaml
pilot:
  paperclip_native_pilot_report: digital-org-orchestration-kit/examples/paperclip-native-pilot/pilot-report.md
  paperclip_native_final_readback: omitted_from_public_export_raw_local_snapshot
  task_board: outputs/synthetic-pilot-task-board-v0.1.yaml
  dry_run_plan: outputs/synthetic-dry-run-pilot-v0.1.md
  dry_run_result: outputs/synthetic-dry-run-result-v0.1.md
  real_codex_thread_pilot: digital-org-orchestration-kit/examples/tutorial-pilot/pilot-report.md
  linear_live_fixtures: omitted_from_public_export
```

## Installed Skills

```yaml
installed_skills:
  - ~/.codex/skills/digital-org-project-activation/SKILL.md
  - ~/.codex/skills/digital-org-orchestrator/SKILL.md
  - ~/.codex/skills/digital-org-worker/SKILL.md
  - ~/.codex/skills/digital-org-reviewer/SKILL.md
  - ~/.codex/skills/digital-org-verifier/SKILL.md
  - ~/.codex/skills/digital-org-auditor/SKILL.md
  - ~/.codex/skills/digital-org-domain-orgops/SKILL.md
  - ~/.codex/skills/digital-org-domain-development/SKILL.md
```

## Verification

```yaml
verification_completed:
  paperclip_native_local_server_health: pass
  paperclip_native_issue_run_readback: pass
  paperclip_native_worker_review_verification_audit: pass
  paperclip_native_watchdog_timer_evidence: pass_with_cancelled_timer_run
  paperclip_native_user_question_blocker: pass
  paperclip_native_no_live_runs_final: pass
  paperclip_docs_anti_slop_audit: pass
  paperclip_docs_anti_slop_check: pass
  paperclip_docs_grounding_gate: manual_review_after_cli_flagged_normative_policy_text
  anti_slop_grounding_outputs: pass
  skill_quick_validate: pass
  synthetic_task_board_yaml_parse: pass
  unfinished_marker_scan: pass
  linear_workflow_statuses_customized: pass
  linear_status_readback_api: pass
  linear_project_update_draft_anti_slop_gate: pass
  linear_project_update_posted: blocked_connector_backend_missing
  linear_reconciliation_rules_added: pass
  subagent_assisted_validation_used: pass
  real_codex_thread_pilot_completed: true
  real_codex_thread_pilot_local_only: pass
  real_codex_thread_pilot_thread_titles: pass
  safe_local_runtime_validator: pass
  live_linear_reconciliation_private_fixture: omitted_from_public_export
  project_reporting_surface: degraded_AI_33_control_issue_fallback
  centralized_portable_kit: pass
  gitom_sync: local_git_and_gbrain_sync_fallback_pass
```

## Next Gates

```yaml
next_gates:
  paperclip_native_control_plane:
    requires:
      - company_package_import_export
      - version_aware_scheduler_endpoint_discovery
      - provider_auth_preflight
      - dependency_vs_review_relation_policy
      - verifier_closure_authority_policy
      - final_assignee_vs_lease_readback_policy
  thread_first_controls:
    requires:
      - structured_block_validator_before_workers_above_1
      - heartbeat_orphan_recovery_before_workers_above_1
      - lease_registry_control_reconciliation_validator
      - role_thread_identity_fields_in_all_kickoffs
  linear_live_adapter:
    requires:
      - linear_connector_or_cli_capability_check
      - write_policy_confirmation
      - project_update_backend_or_ui_confirmation
      - autolink_safe_structured_block_encoding
  memory_hygiene:
    requires:
      - cleanup_dedup_spec
      - milestone_update_policy
```
