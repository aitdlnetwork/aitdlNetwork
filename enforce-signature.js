const fs = require('fs');
const path = require('path');

const SIGNATURE = `/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/
`;

const TARGET_EXTENSIONS = ['.js', '.ts', '.jsx', '.tsx', '.css', '.html'];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('AITDL Network')) {
    content = SIGNATURE + '\n' + content;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✔ Signature added: ${filePath}`);
  }
}

function scanDir(dir) {
  // If the directory itself doesn't exist, we can't scan it. But process.cwd() should exist.
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      // Ignore common build/dependencies directories to speed this up
      if (['node_modules', '.git', 'dist', 'build'].includes(file)) return;
      scanDir(fullPath);
    } else {
      if (TARGET_EXTENSIONS.includes(path.extname(fullPath))) {
        processFile(fullPath);
      }
    }
  });
}

scanDir(process.cwd());
