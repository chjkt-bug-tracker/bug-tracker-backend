'use strict';

const userModel = (Sequelize, DataTypes) => sequelize.define('Users', {
  username: { type: DataTypes.STRING, required: true, unique: true },
  password: { type: DataTypes.STRING, required: true },
  name: { type: DataTypes.STRING, required: true },
  role: { type: DataTypes.STRING, required: true },
  capabilities: { type: DataTypes.ARRAY, required: true },
  token: { type: DataTypes.STRING, required: true },
  assignedTeam: { type: DataTypes.ARRAY, required: true },
});

module.exports = userModel;