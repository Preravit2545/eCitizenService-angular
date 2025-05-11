const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ message: 'ผู้ใช้ไม่พบ' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'รหัสผ่านไม่ถูกต้อง' });

    const token = jwt.sign(
      { id: user.id, role: user.role, firstname: user.firstname, lastname: user.lastname },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    const decodedToken = jwt.decode(token);
    res.json({ 
      message: 'เข้าสู่ระบบสำเร็จ', 
      token, 
      expiresAt: decodedToken.exp 
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'ข้อผิดพลาดของเซิร์ฟเวอร์' });
  }
});

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
