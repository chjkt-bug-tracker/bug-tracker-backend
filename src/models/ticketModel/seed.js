'use strict';

const {tickets} = require('../../models');


const mockTickets = [
  {
    issueType: 'bugorama',
    reporter: 'kenny5.0',
    status: 'complete',
  },
];

const seed = async () => {
  try {
    await tickets.bulkCreate(mockTickets);
    console.log('Data seeded successfully.');
  } catch (error) {
    console.error(error);
  }
};

seed();