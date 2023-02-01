'use strict';


const ticketModel = (sequelize, DataTypes) => sequelize.define('tickets', {
  // shared: { type: DataTypes.BOOLEAN, required: false},
  // sharedWith: { type: DataTypes.ARRAY(DataTypes.STRING), required: false},
  // issueType: { type: DataTypes.STRING, required: false},
  // reporter: { type: DataTypes.STRING, required: false},
  // whenCreated: { type: DataTypes.STRING, required: false},
  // whenResolved: { type: DataTypes.STRING, required: false},
  // status: { type: DataTypes.STRING, required: false},
  // requestStatus: { type: DataTypes.STRING, required: false},
  title: {type: DataTypes.STRING},
  assignee: {type: DataTypes.STRING},
});

module.exports = ticketModel;