const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Get database credentials from environment variables with fallbacks
const dbName = process.env.DB_NAME || 'customer';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 3306;

// Create a new Sequelize instance for database connection
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    port: dbPort,
    logging: console.log, // Enable logging to see SQL queries (remove in production)
});

// Test database connection
sequelize.authenticate()
    .then(() => console.log('Database connected successfully.'))
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit if database connection fails
    });

// Sync models with the database
sequelize.sync({ force: false }) // Use 'force: true' only for development, 'force: false' for production
    .then(() => console.log('Database synchronized successfully.'))
    .catch(err => {
        console.error('Database synchronization failed:', err);
        process.exit(1); // Exit if synchronization fails
    });

// Initialize the db object and import models
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Customer = require('../model/Customer')(sequelize, Sequelize.DataTypes);

// Export the db object for use in other parts of your application
module.exports = db;
