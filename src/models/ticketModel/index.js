'use strict';

const ticketModel = (sequelize, DataTypes) => sequelize.define('Ticket', {
  // shared: { type: DataTypes.BOOLEAN, required: true },
  // sharedWith: { type: DataTypes.ARRAY(DataTypes.STRING), required: true},
  teamMember: { type: DataTypes.STRING, required: true },
  issueType: { type: DataTypes.STRING, required: true},
  // whenCreated: { type: DataTypes.STRING, required: true },
  // whenResolved: { type: DataTypes.STRING, required: true },
  notes: { type: DataTypes.STRING, required: true },
  priority: { type: DataTypes.BOOLEAN, required: true },
  // requestStatus: { type: DataTypes.STRING, required: true },
});

module.exports = ticketModel;