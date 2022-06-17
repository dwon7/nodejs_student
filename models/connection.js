const { Sequelize } = require('sequelize');
const config = require('../config/database'); 

sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: config.host,
    dialect: 'mysql',
    operatorsAliases: 'false',
    logging: false
});  

module.exports = sequelize;