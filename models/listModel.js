const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Board = require('./BoardModel');

const List = sequelize.define('List', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  position: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: true });

List.belongsTo(Board, { foreignKey: 'boardId' });
Board.hasMany(List, { foreignKey: 'boardId' });

module.exports = List;