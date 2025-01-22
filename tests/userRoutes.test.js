const request = require('supertest');
const app = require('../server'); // Adjust the path as necessary
const pool = require('../config/db'); // Database connection

describe('User API Endpoints', () => {
  beforeAll(async () => {
    // Optionally, you can set up your database here
  });

  afterAll(async () => {
    // Close the database connection
    await pool.end();
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'fasil',
        email: 'fasil@gmail.com',
        password: '123',
        role: 'student'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('email', 'testuser@example.com');
  });

  it('should get all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should get a user by email', async () => {
    const res = await request(app).get('/api/users/testuser@example.com');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'testuser@example.com');
  });

  it('should update a user by email', async () => {
    const res = await request(app)
      .put('/api/users/testuser@example.com')
      .send({
        name: 'Updated User',
        password: 'newpassword123',
        role: 'admin'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated User');
  });

  it('should delete a user by email', async () => {
    const res = await request(app).delete('/api/users/testuser@example.com');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });
};