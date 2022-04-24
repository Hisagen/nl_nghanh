'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class donhangs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  donhangs.init({
    ngaydathang: DataTypes.INTEGER,
    ngaygiaohang: DataTypes.INTEGER,
    dc_gh: DataTypes.STRING,
    ma_htgh: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'donhangs',
  });
  return donhangs;
};