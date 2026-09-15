import { access } from 'node:fs/promises';

const requiredFiles = [
  'index.html',
  'about.html',
  'services.html',
  'contact.html',
  '_config.yml',
  'CNAME',
  'assets/css/style.css',
  'assets/js/main.js'
];

for (const file of requiredFiles) {
  await access(file);
}

console.log('Site validation passed.');
