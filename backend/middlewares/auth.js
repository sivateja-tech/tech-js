import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

/* =========================
   AUTHENTICATION MIDDLEWARE
========================= */
export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid authorization format' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    if (!decoded || !decoded.sub) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    // Attach user info to request
    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role // if present in token
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/* =========================
   ROLE AUTHORIZATION
========================= */
export function authorizeRole(...roles) {
  return async (req, res, next) => {
    try {
      // Prefer role from JWT (FAST)
      let userRole = req.user.role;

      // Fallback to DB only if role not present in token
      if (!userRole) {
        const result = await pool.query(
          'SELECT role FROM users WHERE id = $1',
          [req.user.id]
        );

        userRole = result.rows[0]?.role;
      }

      if (!roles.includes(userRole)) {
        return res.status(403).json({  success: false,
        error: "Forbidden" });
      }

      next();
    } catch (err) {
      console.error('Authorization error:', err);
      return res.status(500).json({ error: 'Authorization failed' });
    }
  };
}
