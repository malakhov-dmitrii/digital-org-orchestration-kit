import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

const requiredRootFiles = [
  'README.md',
  'manifest.json',
];

const requiredDocs = [
  'docs/paperclip-native-control-plane-workflow-v0.1.md',
  'docs/paperclip-native-pilot-readback-v0.1.md',
  'docs/paperclip-control-plane-integration-brief-v0.1.md',
  'docs/portable-project-activation-kit-v0.1.md',
  'docs/thread-first-project-workflow-v0.1.md',
  'docs/project-onboarding-discovery-kickoff-v0.1.md',
  'docs/project-setup-and-linear-template-v0.1.md',
  'docs/templates-and-checklists-v0.1.md',
  'docs/control-loops-heartbeats-watchdogs-v0.1.md',
  'docs/thread-naming-convention-v0.1.md',
  'docs/linear-reconciliation-rules-v0.1.md',
  'docs/authority-and-evidence-contracts-v0.1.md',
  'docs/gastown-pattern-implementation-roadmap-v0.1.md',
];

const requiredSkills = [
  'skills/digital-org-project-activation/SKILL.md',
  'skills/digital-org-orchestrator/SKILL.md',
  'skills/digital-org-worker/SKILL.md',
  'skills/digital-org-reviewer/SKILL.md',
  'skills/digital-org-verifier/SKILL.md',
  'skills/digital-org-auditor/SKILL.md',
  'skills/digital-org-domain-orgops/SKILL.md',
  'skills/digital-org-domain-development/SKILL.md',
];

const requiredValidators = [];

const requiredTemplates = [
  'templates/control-issue.md',
  'templates/task-issue.md',
  'templates/fallback-task-board.yaml',
  'templates/worker-kickoff.md',
  'templates/reviewer-kickoff.md',
  'templates/verifier-kickoff.md',
  'templates/auditor-kickoff.md',
  'templates/final-report.md',
  'templates/watchdog-digest.md',
  'templates/audit-improvement-proposal.md',
];

const requiredScripts = [
  'scripts/install-skills.mjs',
];

const requiredExamples = [
  'examples/paperclip-native-pilot/README.md',
  'examples/paperclip-native-pilot/pilot-report.md',
  'examples/tutorial-pilot/README.md',
  'examples/tutorial-pilot/pilot-report.md',
  'examples/tutorial-pilot/.org/tasks.yaml',
  'examples/tutorial-pilot/.org/control.md',
  'examples/tutorial-pilot/deliverables/tutorial-release-note.md',
  'examples/tutorial-pilot/evidence/TUT-001-worker-evidence.md',
  'examples/tutorial-pilot/evidence/TUT-002-review.md',
  'examples/tutorial-pilot/evidence/TUT-003-verification.md',
  'examples/tutorial-pilot/watchdog/watchdog-digest.md',
  'examples/tutorial-pilot/audit/retrospective-audit.md',
];

const errors = [];

function requireFile(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    errors.push(`missing file: ${relativePath}`);
  }
}

for (const filePath of [
  ...requiredRootFiles,
  ...requiredDocs,
  ...requiredSkills,
  ...requiredValidators,
  ...requiredTemplates,
  ...requiredScripts,
  ...requiredExamples,
]) {
  requireFile(filePath);
}

const manifestPath = path.join(root, 'manifest.json');
let manifest = null;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
} catch (error) {
  errors.push(`manifest parse failed: ${error.message}`);
}

if (manifest) {
  for (const docPath of requiredDocs) {
    if (!manifest.docs?.includes(docPath)) {
      errors.push(`manifest missing doc: ${docPath}`);
    }
  }

  for (const skillPath of requiredSkills) {
    if (!manifest.skills?.includes(skillPath)) {
      errors.push(`manifest missing skill: ${skillPath}`);
    }
  }

  for (const templatePath of requiredTemplates) {
    if (!manifest.templates?.includes(templatePath)) {
      errors.push(`manifest missing template: ${templatePath}`);
    }
  }

  for (const scriptPath of requiredScripts) {
    if (!manifest.scripts?.includes(scriptPath)) {
      errors.push(`manifest missing script: ${scriptPath}`);
    }
  }

  for (const examplePath of [
    'examples/tutorial-pilot/README.md',
    'examples/tutorial-pilot/pilot-report.md',
    'examples/tutorial-pilot/.org/tasks.yaml',
    'examples/tutorial-pilot/.org/control.md',
  ]) {
    if (!manifest.examples?.includes(examplePath)) {
      errors.push(`manifest missing example: ${examplePath}`);
    }
  }

  if (manifest.primary_task_pool !== 'Paperclip') {
    errors.push('manifest primary_task_pool must be Paperclip');
  }

  if (manifest.organizational_agent_surface !== 'Paperclip_agent_run') {
    errors.push('manifest organizational_agent_surface must be Paperclip_agent_run');
  }

  if (manifest.runtime_provider_surface !== 'Codex_local') {
    errors.push('manifest runtime_provider_surface must be Codex_local');
  }

  if (manifest.subagent_surface !== 'secondary_internal_tool') {
    errors.push('manifest subagent_surface must be secondary_internal_tool');
  }

  if (manifest.open_gates?.paperclip_native_pilot !== 'completed_local_synthetic') {
    errors.push('manifest paperclip_native_pilot gate must be completed_local_synthetic');
  }
}

const forbiddenPaths = [
  'docs/real-worker-full-cycle-audit-v0.1.md',
];

for (const forbiddenPath of forbiddenPaths) {
  if (fs.existsSync(path.join(root, forbiddenPath))) {
    errors.push(`forbidden misleading artifact exists: ${forbiddenPath}`);
  }
}

const activationSkill = fs.readFileSync(
  path.join(root, 'skills/digital-org-project-activation/SKILL.md'),
  'utf8',
);

for (const requiredText of [
  'primary_control_plane: Paperclip',
  'organizational_agent_surface: Paperclip_agent_run',
  'runtime_provider_surface: Codex_local',
  'codex_chat_is_durable_state: false',
  'real_worker_requires_paperclip_agent_run: true',
  'subagent_can_hold_lease: false',
  'no_magic_gate',
]) {
  if (!activationSkill.includes(requiredText)) {
    errors.push(`activation skill missing invariant: ${requiredText}`);
  }
}

const orchestratorSkill = fs.readFileSync(
  path.join(root, 'skills/digital-org-orchestrator/SKILL.md'),
  'utf8',
);

for (const requiredText of [
  'primary_task_pool: Paperclip',
  'codex_is_runtime_provider: true',
  'title_pattern: "<TASK_ID_OR_SCOPE> <ROLE> <SHORT_SCOPE>"',
  'project_prefix_rule: max_3_chars_and_embedded_in_task_id',
  'paperclip_agent_id:',
  'paperclip_run_id:',
  'active_lease_rule: must_equal_active_paperclip_checkout_or_live_run',
  'paperclip_checkout_live_run_reconciliation_required: true',
]) {
  if (!orchestratorSkill.includes(requiredText)) {
    errors.push(`orchestrator skill missing invariant: ${requiredText}`);
  }
}

const namingDoc = fs.readFileSync(
  path.join(root, 'docs/thread-naming-convention-v0.1.md'),
  'utf8',
);

for (const requiredText of [
  'Paperclip-native mode',
  'Paperclip issue ids',
  'source_thread_id',
  'current_thread_id',
  'holder_thread_id',
  'Role threads may rename or update metadata only for `current_thread_id`',
]) {
  if (!namingDoc.includes(requiredText)) {
    errors.push(`thread naming doc missing invariant: ${requiredText}`);
  }
}

const tutorialBoard = fs.readFileSync(
  path.join(root, 'examples/tutorial-pilot/.org/tasks.yaml'),
  'utf8',
);

for (const requiredText of [
  'thread_title: TUT-001 Worker release note',
  'thread_title: TUT-002 Reviewer release note',
  'thread_title: TUT-003 Verifier pilot claims',
  'thread_title: TUT-004 Watchdog scan',
  'thread_title: TUT-005 Auditor retrospective',
  'handoff: retrospective_audit_complete',
]) {
  if (!tutorialBoard.includes(requiredText)) {
    errors.push(`tutorial task board missing invariant: ${requiredText}`);
  }
}

if (errors.length > 0) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  checked: {
    docs: requiredDocs.length,
    skills: requiredSkills.length,
    validators: requiredValidators.length + 1,
    templates: requiredTemplates.length,
    scripts: requiredScripts.length,
    examples: requiredExamples.length,
  },
}, null, 2));
