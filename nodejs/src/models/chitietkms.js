'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chitietkms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  chitietkms.init({
    giam: DataTypes.INTEGER,
    ma_sp: DataTypes.INTEGER,
    ma_km: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'chitietkms',
  });
  return chitietkms;
};