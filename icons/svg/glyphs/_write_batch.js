// Helper: run in Node to write batch results.
// Usage: node _write_batch.js [path-to-batch.json]
//   If path given: read { results: [...] } from file.
//   Else: read { results: [...] } from stdin.
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname);
const replace = (s) => (s || '').replace(/fill="#282828"/g, 'fill="currentColor"');

function writeResults(results) {
  for (const r of results) {
    if (r.outline !== undefined) fs.writeFileSync(path.join(dir, r.baseName + '_outline.svg'), replace(r.outline));
    if (r.filled !== undefined) fs.writeFileSync(path.join(dir, r.baseName + '_filled.svg'), replace(r.filled));
    if (r.single !== undefined) fs.writeFileSync(path.join(dir, r.baseName + '.svg'), replace(r.single));
  }
  console.log('Wrote', results.length, 'icons');
}

const file = process.argv[2];
if (file) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const results = data.results || (data.result && data.result.results) || data;
  writeResults(Array.isArray(results) ? results : results.results || []);
} else {
  let data = '';
  process.stdin.on('data', (c) => { data += c; });
  process.stdin.on('end', () => {
    const parsed = JSON.parse(data);
    const results = parsed.results || (parsed.result && parsed.result.results) || [];
    writeResults(Array.isArray(results) ? results : results.results || []);
  });
}
