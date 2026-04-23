function runCompute() {
  for (let i = 0; i < 10e9; i++) { /* do nothing */ }
}

process.on('message', () => {
  runCompute();
  process.send('done');
  process.exit(0);
});