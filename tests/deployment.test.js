import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const workflow = readFileSync(new URL('../.github/workflows/site.yml', import.meta.url), 'utf8');

test('manual deployment needs no input and still waits for the checked build', () => {
  assert.match(workflow, /^  workflow_dispatch:\s*\n\n/m);
  assert.doesNotMatch(workflow, /inputs\.publish|PUBLISH/);
  assert.match(workflow, /  publish:\n[^\n]+\n    needs: build\n/);
  for (const command of ['pnpm check', 'pnpm build', 'pnpm test']) {
    assert.ok(workflow.includes(`- run: ${command}`));
  }
  assert.match(workflow, /git push origin HEAD:master/);
});

test('only a manual run on main can publish to master', () => {
  const condition = workflow.match(/  publish:\n    if: (.+)/)?.[1];
  assert.ok(condition, 'publish job has a condition');
  for (const [event_name, ref, expected] of [
    ['workflow_dispatch', 'refs/heads/main', true],
    ['workflow_dispatch', 'refs/heads/master', false],
    ['workflow_dispatch', 'refs/heads/feature', false],
    ['push', 'refs/heads/main', false],
    ['pull_request', 'refs/heads/main', false]
  ]) {
    assert.equal(runInNewContext(condition, { github: { event_name, ref } }), expected, `${event_name} on ${ref}`);
  }
});
