'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class baiviets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  baiviets.init({
    ten_bv: DataTypes.STRING,
    nd_bv: DataTypes.STRING,
    trangthai: DataTypes.BOOLEAN,
    ma_sp: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'baiviets',
  });
  return baiviets;
};