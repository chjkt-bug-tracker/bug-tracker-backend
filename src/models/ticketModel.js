'use strict';

const ticketModel = (sequelize, DataTypes) => sequelize.define('Ticket', {
  // shared: { type: DataTypes.BOOLEAN, required: true },
  // sharedWith: { type: DataTypes.ARRAY(DataTypes.STRING), required: true},
  issueType: { type: DataTypes.STRING, required: true},
  reporter: { type: DataTypes.STRING, required: true },
  whenCreated: { type: DataTypes.STRING, required: true },
  // whenResolved: { type: DataTypes.STRING, required: true },
  status: { type: DataTypes.STRING, required: true },
  // requestStatus: { type: DataTypes.STRING, required: true },
});

module.exports = ticketModel;