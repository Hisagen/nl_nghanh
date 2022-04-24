'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class binhluans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  binhluans.init({
    nd_bl: DataTypes.STRING,
    tg_bl: DataTypes.STRING,
    ma_sp: DataTypes.INTEGER,
    ma_kh: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'binhluans',
  });
  return binhluans;
};