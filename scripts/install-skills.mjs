import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const sourceDir = path.join(root, 'skills');
const targetDir = path.join(os.homedir(), '.codex', 'skills');
const write = process.argv.includes('--write');

const skillNames = fs.readdirSync(sourceDir)
  .filter((entry) => fs.statSync(path.join(sourceDir, entry)).isDirectory())
  .sort();

const operations = skillNames.map((skillName) => ({
  skill: skillName,
  from: path.join(sourceDir, skillName),
  to: path.join(targetDir, skillName),
}));

if (write) {
  fs.mkdirSync(targetDir, { recursive: true });
  for (const operation of operations) {
    fs.rmSync(operation.to, { recursive: true, force: true });
    fs.cpSync(operation.from, operation.to, { recursive: true });
  }
}

console.log(JSON.stringify({
  mode: write ? 'write' : 'dry-run',
  targetDir,
  skills: operations.map((operation) => operation.skill),
}, null, 2));
