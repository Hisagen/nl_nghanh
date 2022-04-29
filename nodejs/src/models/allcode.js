'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class allCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      allCode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData'})
      allCode.hasMany(models.User, { foreignKey: 'typeRole', as: 'roleData'})
      // allCode.hasMany(models.donhangs, { foreignKey: 'trangthai', as: 'trangthaiData'})

      allCode.belongsTo(models.donhangs, { foreignKey: "keyMap"})


      
    }
  };
  allCode.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'allCode',
  });
  return allCode;
};