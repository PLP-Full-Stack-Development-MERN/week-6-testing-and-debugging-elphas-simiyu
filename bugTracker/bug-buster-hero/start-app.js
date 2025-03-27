
const { spawn } = require('child_process');
const path = require('path');

// Start the frontend
const frontend = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Start the backend
const backend = spawn('cd', ['src/server', '&&', 'npm', 'install', '&&', 'npm', 'run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  frontend.kill('SIGINT');
  backend.kill('SIGINT');
  process.exit();
});

// Log process info
console.log('Starting development servers...');
console.log('Frontend: http://localhost:8080');
console.log('Backend: http://localhost:5000');
console.log('Press Ctrl+C to stop all servers');

// Handle process errors
frontend.on('error', (error) => {
  console.error('Frontend process error:', error);
});

backend.on('error', (error) => {
  console.error('Backend process error:', error);
});
