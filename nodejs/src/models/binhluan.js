'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BinhLuans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BinhLuans.belongsTo(models.User, { foreignKey: "MaNguoiBL", targetKey: "id", as: 'binhLuansData' });

    }
  };
  BinhLuans.init({
      NoiDungBL: DataTypes.TEXT('long'),
      Time: DataTypes.DATE,
      MaNguoiBL: DataTypes.INTEGER,
      MaSP: DataTypes.INTEGER,
      TrangThai: DataTypes.STRING,
      TrangThaiBL: DataTypes.STRING,
      anhBL: DataTypes.BLOB('long'),
  },
  {
    sequelize,
    modelName: 'BinhLuans',
  });
  return BinhLuans;
}; 