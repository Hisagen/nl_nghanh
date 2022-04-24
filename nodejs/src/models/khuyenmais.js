'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class khuyenmais extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  khuyenmais.init({
    ten_km: DataTypes.STRING,
    nd_km: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'khuyenmais',
  });
  return khuyenmais;
};