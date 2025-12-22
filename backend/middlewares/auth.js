import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const SECRET = process.env.JWT_SECRET;

export function authenticate(req, res, next) {
  const auth = req.headers["authorization"];
  if (!auth) return res.status(401).json({ error: "Missing authorization" });

  const [scheme, token] = auth.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function authorizeRole(...roles) {
  return async (req, res, next) => {
    try {
      const result = await pool.query(
        "SELECT role FROM users WHERE id=$1",
        [req.user.sub]
      );

      const dbRole = result.rows[0]?.role;
      if (!roles.includes(dbRole)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (err) {
      res.status(500).json({ error: "Authorization failed" });
    }
  };
}
