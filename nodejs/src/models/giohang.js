'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class giohangs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      giohangs.belongsTo(models.sanphams, { foreignKey: "id_sp"})

    }
  };
  giohangs.init({
    avt: DataTypes.STRING,
    ten_sp:DataTypes.STRING,
    gia_sp:DataTypes.INTEGER,
    soluong_sp: DataTypes.INTEGER,
    thanhtien: DataTypes.INTEGER,
    id_sp: DataTypes.INTEGER,
    id_nguoidung: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'giohangs',
  });
  return giohangs;
};