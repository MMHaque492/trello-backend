const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // set to console.log to see SQL queries
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected');
    // Sync all models (create tables if not exist)
    await sequelize.sync({ alter: true });
    console.log('All models synced');
  } catch (err) {
    console.error('Unable to connect to MySQL:', err);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };