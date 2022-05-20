'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cuahangs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   cuahangs.belongsTo(models.allCode, {foreignKey: 'typeRole', targetKey: "keyMap", as: 'typeRoleData'})
    //   cuahangs.belongsTo(models.allCode, {foreignKey: 'gender', targetKey: "keyMap", as: 'genderData'})
    //   cuahangs.hasOne(models.Markdown, {foreignKey: 'SPId' })
    cuahangs.belongsTo(models.User, { foreignKey: "idCuahang"})

    }
  };
  cuahangs.init({
    storeName: DataTypes.STRING,
    idCuahang: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'cuahangs',
  });
  return cuahangs;
};