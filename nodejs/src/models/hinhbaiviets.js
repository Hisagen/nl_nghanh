'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hinhbaiviets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  hinhbaiviets.init({
    ten_hbv: DataTypes.STRING,
    ma_bv: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'hinhbaiviets',
  });
  return hinhbaiviets;
};