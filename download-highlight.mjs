/*
Author: Jonathan Starck (jonathan@starck.info)
download-hilight.js (c) 2024
Desc: description
Created:  2024-06-05T08:30:41.914Z
Modified: 2024-06-07T15:13:13.843Z
*/
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const files = [
  {
    url: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/highlight.min.js',
    dest: 'src/vendor/highlight.js/highlight.min.js'
  },
  {
    url: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/languages/javascript.min.js',
    dest: 'src/vendor/highlight.js/javascript.min.js'
  },
  {
    url: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/styles/default.min.css',
    dest: 'src/vendor/highlight.js/default.min.css'
  },
  {
    url: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/styles/atom-one-dark-reasonable.min.css',
    dest: 'src/vendor/highlight.js/default.min.css'
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/all.min.js',
    dest: 'src/vendor/fontawesome/fontawesome.min.js'
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/css/fontawesome.min.css',
    dest: 'src/vendor/fontawesome/fontawesome.min.css'
  }
];

async function downloadFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  const fileStream = fs.createWriteStream(dest);
  return new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on('error', reject);
    fileStream.on('finish', resolve);
  });
}

async function main() {
  for (const file of files) {
    const destDir = path.dirname(file.dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    console.log(`Downloading ${file.url} to ${file.dest}`);
    await downloadFile(file.url, file.dest);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});