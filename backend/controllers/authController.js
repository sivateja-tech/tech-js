import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

export async function signup(req, res) {
  try {
    const { username, email, password, role } = req.body;

    // Check if email already exists
    const check = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (check.rows.length > 0) {
      return res.status(409).json({ error: "email already exists" });
    }

    // Hash password
    const hased_password = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert user into DB using the typo column
    const result = await pool.query(
      'INSERT INTO users(username,email,hased_password,role) VALUES($1,$2,$3,$4) RETURNING id,username,email,role',
      [username, email, hased_password, role || 'player']
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    console.log("LOGIN BODY:", req.body);

    // Find user by email
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    // Do NOT reveal whether email exists
    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ error: "invalid email or password" });
    }

    const user = result.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.hased_password
    );

    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      accessToken: token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "login failed" });
  }
}