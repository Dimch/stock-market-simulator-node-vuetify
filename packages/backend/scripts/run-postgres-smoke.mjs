import {execFileSync, spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendDir = path.resolve(__dirname, '..');
const repoRoot = path.resolve(__dirname, '../../..');
const dbContainerName = 'stock-simulator-db';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    stdio: 'inherit',
    ...options,
  });

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status ?? 'unknown'}`);
  }
};

const inspect = format => execFileSync(
  'docker',
  ['inspect', '--format', format, dbContainerName],
  {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  },
).trim();

const isDbRunning = () => {
  try {
    return inspect('{{.State.Running}}') === 'true';
  } catch {
    return false;
  }
};

const waitForHealthyDb = async (timeoutMs = 60_000) => {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      if (inspect('{{.State.Health.Status}}') === 'healthy') {
        return;
      }
    } catch {
      // The container may not exist yet or health checks may not be available yet.
    }

    await sleep(1_000);
  }

  throw new Error('Timed out waiting for Docker Compose Postgres to become healthy.');
};

const main = async () => {
  const dbWasRunning = isDbRunning();

  try {
    run('docker', ['compose', 'up', '-d', 'db']);
    await waitForHealthyDb();

    run('npm', ['run', 'test:smoke:pg'], {
      cwd: backendDir,
      env: process.env,
    });
  } finally {
    if (!dbWasRunning) {
      run('docker', ['compose', 'stop', 'db']);
    }
  }
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});


