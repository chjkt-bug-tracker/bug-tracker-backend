'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {

    firstName: {
      type: DataTypes.STRING,
      required: true,
    },

    lastName: {
      type: DataTypes.STRING,
      required: true,
    },

    username: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    
    role: {
      type: DataTypes.ENUM('admin', 'manager', 'teamMember'),
      required: true,
      defaultValue: 'teamMember',
    },
    
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
    },
    
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          teamMember: ['read', 'create', 'update'],
          manager: ['read', 'create', 'update', 'delete'],
          admin: ['read', 'create', 'update', 'delete'],
        };
        return acl[this.role];
      },
    },
    
    assignedTeam: { type: DataTypes.ARRAY(DataTypes.STRING), required: false },
  });

  model.beforeCreate(async (user) => {
    let hashPass = await bcrypt.hash(user.password, 10);
    user.password = hashPass;
    console.log('in before create', user);
  });

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = bcrypt.compare(password, user.password);
    if (valid) { return user; }
    throw new Error('Invalid User');
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({ where: { username: parsedToken.username } });
      if (user) { return user; }
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userModel;