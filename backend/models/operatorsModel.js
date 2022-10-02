const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const {db,DataTypes} = require('../config/connection');

const tableName = "challenges_crud";

const operator = db.sequelize.define(tableName, {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    creationDate: { type: DataTypes.DATE,  allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),field: 'creationDate'},
    lastLoginDate: { type: DataTypes.DATE, allowNull: false },
  }, {
    tableName: tableName,
    timestamps: false
 });


//Create database + add row user default
 operator.sync().then(async() => { 
    return operator.bulkCreate([
      {  
        name:'Usuario', 
        surname:'Prueba', 
        userName:'admin', 
        password: await bcrypt.hash(`Admin123+${process.env.KEY_PRIVATE}`,10), 
        status:1, 
        creationDate:'2022-06-12 02:38:24', 
        lastLoginDate:'2022-10-02 00:46:44'
      }
    ])
}).catch((err)=>{
  console.log(err);
})
 

module.exports = operator;
  