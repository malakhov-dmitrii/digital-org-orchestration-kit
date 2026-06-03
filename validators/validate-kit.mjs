import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const required = ['README.md','manifest.json',...(manifest.docs||[]),...(manifest.skills||[]),...(manifest.templates||[]),...(manifest.scripts||[]),...(manifest.examples||[])];
const missing = required.filter((p)=>!fs.existsSync(path.join(root,p)));
const mustContain = [['README.md','organizational_agent_surface: Codex_thread'],['docs/thread-naming-convention-v0.1.md','current_thread_id'],['skills/digital-org-orchestrator/SKILL.md','subagent_can_hold_lease: false'],['templates/watchdog-digest.md','Bounded stop triggers:']];
for (const [file,text] of mustContain) { const full = path.join(root,file); if (!fs.existsSync(full) || !fs.readFileSync(full,'utf8').includes(text)) missing.push(file+' missing invariant '+text); }
if (missing.length) { console.error(JSON.stringify({ok:false, missing}, null, 2)); process.exit(1); }
console.log(JSON.stringify({ok:true, checked: required.length}, null, 2));
