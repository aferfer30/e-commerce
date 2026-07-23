const http = require('http');

const endpoints = [
  '/',
  '/admin'
];

async function checkEndpoints() {
  for (const path of endpoints) {
    const res = await fetch(`http://localhost:3000${path}`, { redirect: 'manual' });
    console.log(`[${res.status}] ${path} -> Location: ${res.headers.get('location')}`);
  }
}

checkEndpoints().catch(console.error);
