import {spawn} from 'node:child_process';

export const spawnVite = () => {
  const SERVICE_PATH = 'vite';
  console.info(`Spawning Vite from: ${SERVICE_PATH} in ${process.cwd()}...`);
  const child = spawn(SERVICE_PATH, {
    stdio: 'inherit',
    env: process.env,
    cwd: process.cwd(),
  });

  child.on('error', err => console.error('Error in Vite child process', {error: err.message}));

  child.on('exit', (code, signal) => {
    if (code !== 0) {
      console.warn(`Vite exited with code ${code} and signal ${signal}`);
      // restart the consumer if it exits unexpectedly
      console.info('Restarting Vite...');
      process.nextTick(spawnVite);
    } else {
      console.info('Vite exited gracefully');
    }
  });
};