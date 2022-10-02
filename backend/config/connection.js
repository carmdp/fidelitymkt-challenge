'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize, DataTypes} = require('sequelize');
const basename = path.basename(__filename);
const db = {};

let sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_USER_PASS,
        {host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        dialect:'mysql'}
);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

db.sequelize.authenticate().then(()=>{
  console.log('Conectado a la base de datos');
}).catch(err => {
  console.error('error al conectar: ' + err.stack);
});

module.exports = {
  db,
  DataTypes
}
