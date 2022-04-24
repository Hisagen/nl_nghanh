'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  gias.init({
    gia: DataTypes.INTEGER,
    trangthai: DataTypes.BOOLEAN,
    ma_td: DataTypes.INTEGER,
    ma_sp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'gias',
  });
  return gias;
};