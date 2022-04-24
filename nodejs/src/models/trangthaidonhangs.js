'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trangthaidonhangs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  trangthaidonhangs.init({
    ten_ttdh: DataTypes.STRING,
    ma_dh: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'trangthaidonhangs',
  });
  return trangthaidonhangs;
};