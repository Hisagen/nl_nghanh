'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hinhbinhluans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  hinhbinhluans.init({
    ten_hbl: DataTypes.STRING,
    ma_bl: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'hinhbinhluans',
  });
  return hinhbinhluans;
};