const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const List = require('./ListModel');
const User = require('./UserModel');

const Card = sequelize.define('Card', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, defaultValue: '' },
  position: { type: DataTypes.INTEGER, defaultValue: 0 },
  dueDate: { type: DataTypes.DATE, allowNull: true },
  labels: { type: DataTypes.JSON, defaultValue: [] } // store array as JSON
}, { timestamps: true });

Card.belongsTo(List, { foreignKey: 'listId' });
List.hasMany(Card, { foreignKey: 'listId' });

// Many-to-many between Card and User (members)
Card.belongsToMany(User, { as: 'members', through: 'CardMembers', foreignKey: 'cardId' });
User.belongsToMany(Card, { as: 'cards', through: 'CardMembers', foreignKey: 'userId' });

module.exports = Card;