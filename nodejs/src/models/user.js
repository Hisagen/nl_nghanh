'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.allCode, {foreignKey: 'typeRole', targetKey: "keyMap", as: 'typeRoleData'})
      User.belongsTo(models.allCode, {foreignKey: 'gender', targetKey: "keyMap", as: 'genderData'})
      User.hasOne(models.Markdown, { foreignKey: 'SPId' })
      //binh luan
      User.hasMany(models.BinhLuans, {foreignKey: 'MaNguoiBL', as: 'binhLuansData'})
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    sdt: DataTypes.STRING,
    gender: DataTypes.STRING,
    typeRole: DataTypes.STRING,
    keyRole: DataTypes.STRING,
    avt: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};