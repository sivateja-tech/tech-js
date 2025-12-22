import {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers
} from '../models/userModel.js';

export async function handlecreateUser(req, res) {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handlegetUserById(req, res) {
  try {
    const user = await getUserById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ error: "page not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handlegetUserByEmail(req, res) {
  try {
    const { email } = req.query;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "page not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handlegetAllUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
