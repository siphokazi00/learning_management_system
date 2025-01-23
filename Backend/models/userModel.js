const pool = require('../config/db'); // Database connection
const bcrypt = require('bcryptjs'); // Password hashing

const UserModel = {
  // Create a new user
  async createUser({ name, email, password, role }) {
    if (!name || !email || !password || !role) {
      throw new Error('All fields are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [name, email, hashedPassword, role];
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error('Failed to create user');
    }
  },

  // Find a user by email
  async findByEmail(email) {
    if (!email) {
      throw new Error('Email is required');
    }

    const query = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await pool.query(query, [email]);
      return rows[0];
    } catch (error) {
      throw new Error('Failed to find user');
    }
  },

  // Update a user
  async updateUser(id, { name, email, password, role }) {
    if (!id) {
      throw new Error('ID is required');
    }

    const query = `
      UPDATE users
      SET name = COALESCE($1, name),
          email = COALESCE($2, email),
          password = COALESCE($3, password),
          role = COALESCE($4, role)
      WHERE id = $5
      RETURNING *;
    `;
    const values = [name, email, password, role, id];
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error('Failed to update user');
    }
  },

  // Delete a user
  async deleteUser(id) {
    if (!id) {
      throw new Error('ID is required');
    }

    const query = 'DELETE FROM users WHERE id = $1';
    try {
      await pool.query(query, [id]);
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  },
};

module.exports = UserModel;