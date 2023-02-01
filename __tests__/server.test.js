'use strict';

const { db, users } = require('../src/models');
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);

let admin;
let manager;
let teamMember;

beforeAll(async () => {
  await db.sync();
  // admin = await users.create({
  //   username: 'ADMIN',
  //   password: 'pass',
  //   role: 'admin',
  // });
  // manager = await users.create({
  //   username: 'MANAGER',
  //   password: 'pass',
  //   role: 'manager',
  // });
  // teamMember = await users.create({
  //   username: 'TEAMMEMBER',
  //   password: 'pass',
  //   role: 'teamMember',
  // });
});

afterAll(async () => {
  await db.drop();
});

describe('API / Auth Server Integration', () => {

  it('handles invalid requests', async () => {
    const response = await request.get('/foo');

    expect(response.status).toEqual(404);
  });
});

it('allows ticket create for all employees in their respective dashboard', async () => {
  let response = await request.post('/api/tickets/1').send({
    issueType: '500',
    createdBy: 'Camilla',
    isShared: false,
  }).set('Authorization', `Bearer ${teamMember.token}`);
  expect(response.status).toBe(201);
  expect(response.body.issueType).toEqual('500');
});

it('restricts team member ticket create for others', async () => {
  let response = await request.put('/api/users/1/tickets/4').send({
    issueType: '500',
    createdBy: 'Camilla',
    isShared: false,
  }).set('Authorization', `Bearer ${teamMember.token}`);

  let errorObject = JSON.parse(response.text);
  expect(response.status).toBe(500);
  expect(errorObject.message).toEqual('Access Denied');
});

it('allows managers to create tickets on team member dashboards for assigned teams only', async () => {
  let response = await request.post('/api/teams/1/tickets/2').send({
    issueType: '404',
    createdBy: 'Hunter',
    isShared: true,
  }).set('Authorization', `Bearer ${manager.token}`);
  expect(response.status).toBe(201);
  expect(response.body.issueType).toEqual('404');
});

it('allows admin to create tickets on all dashboards', async () => {
  let response = await request.post('/api/tickets/3').send({
    issueType: '302',
    createdBy: 'Kenny',
    isShared: true,
  }).set('Authorization', `Bearer ${admin.token}`);
  expect(response.status).toBe(201);
  expect(response.body.issueType).toEqual('404');
});

it('allows team member to read all tickets on their dashboard', async () => {
  let response = await request.get('/api/teams/1/users/1/tickets').set('Authorization', `Bearer ${manager.token}`);
  expect(response.status).toBe(200);
  expect(response.body[0].issueType).toEqual('500');
});

it('allows manager to read all tickets on their team', async () => {
  let response = await request.get('/api/teams/1/tickets').set('Authorization', `Bearer ${manager.token}`);
  expect(response.status).toBe(200);
  expect(response.body[0].issueType).toEqual('500');
});

it('allows admin to read all tickets', async () => {
  let response = await request.get('/api/tickets').set('Authorization', `Bearer ${admin.token}`);
  expect(response.status).toBe(200);
  expect(response.body[0].issueType).toEqual('500');
});

it('allows team members read one access for their tickets', async () => {
  let response = await request.get('/api/users/1/tickets/1');
  expect(response.status).toBe(200);
  expect(response.body.issueType).toEqual('500');
});

it('allows manager read one access for any ticket on their team', async () => {
  let response = await request.get('/api/teams/1/users/1/tickets/1').set('Authorization', `Bearer ${manager.token}`);
  expect(response.status).toBe(200);
  expect(response.body.issueType).toEqual('500');
});

it('allows team members to update their own tickets', async () => {
  let response = await request.put('/api/teams/1/users/1/tickets/1').send({
    issueType: '500',
    createdBy: 'Camilla',
    isShared: true,
  }).set('Authorization', `Bearer ${teamMember.token}`);

  expect(response.status).toBe(200);
  expect(response.body.isShared).toBe(true);
});

it('allows managers to update any ticket on their team', async () => {
  let response = await request.put('/api/teams/1/users/1/tickets/1').send({
    issueType: '404',
    createdBy: 'Camilla',
    isShared: true,
  }).set('Authorization', `Bearer ${manager.token}`);

  expect(response.status).toBe(200);
  expect(response.body.issueType).toEqual('404');
});

it('allows admins to update any ticket', async () => {
  let response = await request.put('/api/teams/1/users/1/tickets/1').send({
    issueType: '404',
    createdBy: 'Camilla',
    isShared: false,
  }).set('Authorization', `Bearer ${admin.token}`);

  expect(response.status).toBe(200);
  expect(response.body.isShared).toEqual(false);
});

it('allows team member to delete their own tickets, if not shared', async () => {
  let response = await request.delete('/api/teams/1/users/1/tickets/1')
    .set('Authorization', `Bearer ${teamMember.token}`);
  expect(response.status).toBe(200);
  expect(response.body).toEqual(1);
});

it('allows manager to delete tickets for their respective team', async () => {
  let response = await request.delete('/api/teams/1/users/1/tickets/1')
    .set('Authorization', `Bearer ${manager.token}`);

  expect(response.status).toBe(200);
  expect(response.body).toEqual(1);
});

it('allows admins to delete any ticket', async () => {
  let response = await request.delete('/api/teams/1/users/1/tickets/1')
    .set('Authorization', `Bearer ${admin.token}`);

  expect(response.status).toBe(200);
  expect(response.body).toEqual(1);
});

it('restricts team members from deleting shared tickets', async () => {
  let response = await request.delete('/api/teams/1/users/1/tickets/1').set('Authorization', `Bearer ${teamMember.token}`);
  let errorObject = JSON.parse(response.text);

  expect(response.status).toBe(500);
  expect(errorObject.message).toEqual('Access Denied');
});