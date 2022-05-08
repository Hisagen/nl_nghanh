'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class yeuthichs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      yeuthichs.belongsTo(models.sanphams, { foreignKey: "id_sp"})
      // yeuthichs.hasOne(models.hinhsps, {foreignKey: 'ma_sp'})
      yeuthichs.belongsTo(models.hinhsps, {foreignKey: 'id_sp', targetKey: "ma_sp", as: 'hinhsp'})
    }
  };
  yeuthichs.init({
    avt: DataTypes.STRING,
    ten_sp:DataTypes.STRING,
    gia_sp:DataTypes.INTEGER,
    id_sp: DataTypes.INTEGER,
    id_nguoidung: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'yeuthichs',
  });
  return yeuthichs;
};