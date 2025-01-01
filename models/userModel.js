const pool = require('../config/db'); // Database connection
const bcrypt = require('bcryptjs'); // Password hashing

const UserModel = {
  // Create a new user
  async createUser({ name, email, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [name, email, hashedPassword, role];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Find a user by email
  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  },
};

module.exports = UserModel; // Export the UserModel