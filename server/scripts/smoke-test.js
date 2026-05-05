import { randomUUID } from 'crypto';

async function main() {
  const email = `test-ci-${randomUUID().slice(0, 8)}@example.com`;
  const password = 'Test1234';

  const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name: 'CI Test User' }),
  });
  const register = await registerResponse.json();

  const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const login = await loginResponse.json();

  const profileResponse = await fetch('http://localhost:5000/api/auth/profile', {
    headers: { Authorization: `Bearer ${login.token}` },
  });
  const profile = await profileResponse.json();

  console.log(JSON.stringify({ email, register, login, profile }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});