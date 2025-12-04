const request = require('supertest');
const app = require('../src/server');

describe('POST /api/tasks', () => {
  it('creates a task when valid data is provided', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task',
        description: 'Sample',
        status: 'todo',
        dueDate: '2025-12-31T12:00:00.000Z'
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it('returns 400 for invalid input', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({
        title: '',
        status: 'todo',
        dueDate: 'invalid'
      });

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});
