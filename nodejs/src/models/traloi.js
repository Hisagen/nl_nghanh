'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TraLois extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // TraLois.belongsTo(models.User, { foreignKey: "MaNguoiBL", targetKey: "id", as: 'TraLoisData' });

    }
  };
  TraLois.init({
      NoiDungTL: DataTypes.TEXT('long'),
      MaBL: DataTypes.INTEGER,
      MaSP: DataTypes.INTEGER,
      MaNguoiTL: DataTypes.INTEGER,
      TrangThai: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'TraLois',
  });
  return TraLois;
};