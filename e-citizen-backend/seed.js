const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

async function seedUser() {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await pool.query(
      `INSERT INTO users (username, password, firstname, lastname, email, phone, role)
      VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (email) DO NOTHING`,
      ['testuser', hashedPassword, 'Test', 'User', 'testuser@example.com', '0123456789', 'user']
    );

    console.log('User seeded successfully');
    process.exit();
  } catch (err) {
    console.error('Error seeding user:', err);
    process.exit(1);
  }
}

seedUser();
