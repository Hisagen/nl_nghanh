'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cuahangs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   cuahangs.belongsTo(models.allCode, {foreignKey: 'typeRole', targetKey: "keyMap", as: 'typeRoleData'})
    //   cuahangs.belongsTo(models.allCode, {foreignKey: 'gender', targetKey: "keyMap", as: 'genderData'})
    //   cuahangs.hasOne(models.Markdown, {foreignKey: 'SPId' })
    }
  };
  cuahangs.init({
    storeName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    sdt: DataTypes.STRING,
    gender: DataTypes.STRING,
    typeRole: DataTypes.STRING,
    avt: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'cuahangs',
  });
  return cuahangs;
};