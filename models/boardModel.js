const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./UserModel');

const Board = sequelize.define('Board', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  background: { type: DataTypes.STRING, defaultValue: '#f4f5f7' }
}, { timestamps: true });

// Associations
Board.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
Board.belongsToMany(User, { as: 'members', through: 'BoardMembers', foreignKey: 'boardId' });
User.belongsToMany(Board, { as: 'boards', through: 'BoardMembers', foreignKey: 'userId' });

module.exports = Board;