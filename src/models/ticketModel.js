'use strict';


const ticketModel = (Sequelize, DataTypes) => sequelize.define( 'Tickets', {
  shared: { type: DataTypes.BOOLEAN, required: true },
  sharedWith: { type: DataTypes.ARRAY, required: true},
  issueType: { type: DataTypes.STRING, required: true},
  reporter: { type: DataTypes.STRING, required: true },
  whenCreated: { type: DataTypes.STRING, required: true },
  whenResolved: { type: DataTypes.STRING, required: true },
  status: { type: DataTypes.STRING, required: true },
  requestStatus: { type: DataTypes.STRING, required: true },
});

module.exports = ticketModel;