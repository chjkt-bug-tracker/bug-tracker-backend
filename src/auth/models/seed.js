'use strict';

const { users } = require('../../../src/models');


const mockUsers = [
  {
    firstName: 'Hunter',
    lastName: 'Fehr',
    username: 'Hunter',
    password: 'pullFocus',
    role: 'manager',
  },
];

const seed = async () => {
  try {
    await users.bulkCreate(mockUsers);
    console.log('Data seeded successfully.');
  } catch (error) {
    console.error(error);
  }
};

seed();