'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class diachis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  diachis.init({
    ten_dc: DataTypes.STRING,
    ma_kh: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'diachis',
  });
  return diachis;
};