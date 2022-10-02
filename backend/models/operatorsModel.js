const {db,DataTypes} = require('../config/connection');

const tableName = "challenges_crud";
const operator = db.sequelize.define(tableName, {
    id: {type: DataTypes.SMALLINT, primaryKey: true},
    name: DataTypes.STRING,
    surName: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    lastLoginDate: { type: DataTypes.DATE, allowNull: false },
  }, {
    tableName: tableName,
    timestamps: false
 });

module.exports = operator;
  