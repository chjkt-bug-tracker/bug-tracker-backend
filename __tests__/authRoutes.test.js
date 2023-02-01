'use strict';

const { db } = require('../src/models');
const supertest = require('supertest');
const { server } = require('../src/server');
const mockRequest = supertest(server);

let userRecord = {
  testUser: { username: 'username', password: 'password' },
};

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Auth router', () => {

  it('allows user to signup with a POST to the /signup route', async () => {
    const response = await mockRequest.post('/signup').send(userRecord.testUser);
    const userObject = response.body;

    expect(response.status).toBe(201);
    expect(userObject.token).toBeTruthy();
    expect(userObject.user.id).toBeTruthy();
    expect(userObject.user.username).toEqual(userRecord.testUser.username);
    expect(userObject.user.password).toEqual(userRecord.testUser.password);
  });

  it('allows user to signup with a POST to the /signin route', async () => {
    let { username, password } = userRecord.testUser;
    const response = await mockRequest.post('/signin').auth(username, password);

    const userObject = response.body;
    expect(response.status).toBe(200);
    expect(userObject.token).toBeTruthy();
    expect(userObject.user.id).toBeTruthy();
    expect(userObject.user.username).toEqual(username);
    expect(userObject.user.password).toEqual(password);
  });
});