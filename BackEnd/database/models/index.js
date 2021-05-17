'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('config');
const dbConfig = config.get('database');
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
        host: dbConfig.host,
        dialect: 'mysql',
        logging: false,
        freezeTableName: false,
        operatorsAliases: Sequelize.Op,
        define: {
          underscored: false,
          charset: 'utf8mb4',
          timestamps: true,
        },
        dialectOptions: {
          supportBigNumbers: true,
          bigNumberStrings: true,
          dateStrings: true,
          typeCast: function (field, next) { // for reading from database
            if (field.type === 'DATETIME') {
              return field.string()
            }
            return next()
          },
        },
        // quoteIdentifiers: false,
        timezone: '+07:00',
        pool: {
          max: 5,
          idle: 30000,
          acquire: 60000,
        }
      }
  );
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
