# Domain Pack OrgOps v0.1

## 0. Grounding

```yaml
grounded_in:
  - outputs/org-operating-model-v0.1.md
  - outputs/control-plane-policies-and-synthetic-pilot-v0.1.md
  - outputs/portable-skill-specs-v0.1.md
skill: digital-org-domain-orgops
```

## 1. Domain Scope

```yaml
domain: orgops
surfaces:
  - operating_model
  - task_schema
  - stage_machine
  - linear_adapter
  - fallback_board
  - authority_contract
  - evidence_contract
  - skills
  - digest
  - kill_switch
  - memory_hygiene
  - synthetic_pilot
```

## 2. Evidence

```yaml
evidence:
  - spec_artifact
  - schema_or_transition_table
  - grounding_check
  - quick_validate_output
  - dry_run_task_record
  - digest_example
  - retrospective
  - installable_skill_file
```

## 3. Review Checklist

```yaml
review_checklist:
  - source_of_truth_clear
  - authority_explicit
  - stage_transition_valid
  - no_double_canonical_state
  - lease_ttl_defined
  - blocker_owner_defined
  - evidence_required_before_execution
  - verifier_path_exists
  - kill_switch_policy_exists
  - orphan_detection_exists
  - digest_human_readable
  - memory_update_reusable_not_noisy
```

## 4. Common Blockers

```yaml
blockers:
  - unclear_canonical_surface
  - stale_memory
  - missing_linear_authority
  - overlapping_skills
  - weak_evidence_contract
  - no_verifier_path
  - no_kill_switch_path
  - task_in_progress_without_worker
```

## 5. Done Criteria

```yaml
done_requires:
  - artifact_saved
  - grounding_pass_or_manual_grounding_note
  - unfinished_marker_scan_clean
  - no_magic_gaps_recorded
  - next_action_recorded
```
