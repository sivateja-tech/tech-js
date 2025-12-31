import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

if (!SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

/* =========================
   SIGNUP
========================= */
export async function signup(req, res) {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'username, email and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'password must be at least 6 characters'
      });
    }

    const userRole = role === 'admin' ? 'admin' : 'player';

    // Check if email already exists
    const check = await pool.query(
      'SELECT 1 FROM users WHERE email = $1',
      [email]
    );

    if (check.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'Email already exists'
      });
    }

    // Hash password (column name kept intentionally)
    const hased_password = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await pool.query(
      `INSERT INTO users (username, email, hased_password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, role, created_at`,
      [username, email, hased_password, userRole]
    );

    return res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({
      success: false,
      error: 'Signup failed'
    });
  }
}

/* =========================
   LOGIN
========================= */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'email and password are required'
      });
    }

    const result = await pool.query(
      'SELECT id, email, hased_password, role FROM users WHERE email = $1',
      [email]
    );

    // Do not reveal whether email exists
    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.hased_password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role

      },
      SECRET,
      { expiresIn: '1h' }
    );


   res.json({
  accessToken: token,
  user: {
    id: user.id,
    email: user.email,
    role: user.role,
    username: user.username
  }
});

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
}
