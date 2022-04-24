'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hinhsps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hinhsps.belongsTo(models.sanphams, { foreignKey: "ma_sp"})
    }
  };
  hinhsps.init({
    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    ma_sp: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'hinhsps',
  });
  return hinhsps;
};