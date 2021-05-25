const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.Contact = require("./contact.model.js")(sequelize, Sequelize);
db.contactStatus = require("./contactStatus.model.js")(sequelize, Sequelize);


//Relations
// db.contactStatus.hasMany(db.Contact, {
//   as: 'contactStatus_contact',
//   foreignKey: 'statusId',
//   targetKey: 'id',
// });

module.exports = db;