'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class thoidiems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  thoidiems.init({
    thoidiem: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'thoidiems',
  });
  return thoidiems;
};