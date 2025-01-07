console.log('Starting test: should create a user successfully');
const chai = require('chai');
const expect = chai.expect;
const UserModel = require('../models/userModel');
const pool = require('../config/db'); // Import the database pool

describe('UserModel Tests', () => {
  // Clean up the database before each test
  beforeEach(async () => {
    await pool.query('DELETE FROM users WHERE email = $1', ['sentyehu2002@gmail.com']);
  });

  it('should create a user successfully', async () => {
    const user = await UserModel.createUser({
      name: 'sentayehu demissie',
      email: 'sentyehu2002@gmail.com',
      password: '123',
      role: 'Instructor',
    });
    expect(user).to.have.property('id');
    expect(user.email).to.equal('sentyehu2002@gmail.com');
  });

  it('should find a user by email', async () => {
    // First, create the user
    await UserModel.createUser({
      name: 'sentayehu demissie',
      email: 'sentyehu2002@gmail.com',
      password: '123',
      role: 'Instructor',
    });

    // Then, find the user
    const user = await UserModel.findByEmail('sentyehu2002@gmail.com');
    expect(user).to.not.be.null;
    expect(user.email).to.equal('sentyehu2002@gmail.com');
  });

  it('should handle duplicate user creation gracefully', async () => {
    // First, create the user
    await UserModel.createUser({
      name: 'sentayehu demissie',
      email: 'sentyehu2002@gmail.com',
      password: '123',
      role: 'Instructor',
    });

    // Attempt to create a duplicate user
    try {
      await UserModel.createUser({
        name: 'sentayehu demissie',
        email: 'sentyehu2002@gmail.com',
        password: '123',
        role: 'Instructor',
      });
    } catch (err) {
      expect(err.message).to.include('duplicate key value violates unique constraint');
    }
  });
});