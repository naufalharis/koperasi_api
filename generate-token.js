const jwt = require('jsonwebtoken');

const secret = "your-super-secret-jwt-key-here-make-it-very-long-and-random"; // dari .env
const payload = { sub: "c5d3d3a2-3333-4a4d-aaaa-001122334455", role: "anggota" }; // ganti sub kalau perlu
const token = jwt.sign(payload, secret, { expiresIn: '24h' });
console.log(token);