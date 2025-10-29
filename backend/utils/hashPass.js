/**
 * Password hashing utility for Maffy Online
 * Generates bcrypt hashes for admin passwords
 * Usage: node utils/hashPass.js <password> or set PASSWORD env var
 */

import bcrypt from 'bcryptjs';

// Get password from command line argument or environment variable
const input = process.argv[2] || process.env.PASSWORD;
if (!input) {
  console.error('Usage: node utils/hashPass.js <password>');
  console.error('Or set PASSWORD environment variable');
  process.exit(1);
}

const saltRounds = 10; // Standard bcrypt salt rounds for security

// Generate hash and output result
bcrypt.hash(input, saltRounds).then(hash => {
  console.log('HASH:', hash);
}).catch(err => {
  console.error('Error generating hash:', err);
  process.exit(1);
});
