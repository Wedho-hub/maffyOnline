import bcrypt from 'bcryptjs';

const input = process.argv[2] || process.env.PASSWORD;
if (!input) {
  console.error('Usage: node utils/hashPass.js <password>');
  process.exit(1);
}

const saltRounds = 10;
bcrypt.hash(input, saltRounds).then(hash => {
  console.log('HASH:', hash);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
