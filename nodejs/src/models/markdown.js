'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //   // define association here
    //   Markdown.hasMany(models.User, { foreignKey: 'gender', as: 'genderData'})
    Markdown.belongsTo(models.User, { foreignKey: "SPId"})
    //Markdown.hasMany(models.User, { foreignKey: "LSPId"})
    }
  };
  Markdown.init({
    contentHTML: DataTypes.TEXT('long'),
    contentMarkdown: DataTypes.TEXT('long'),
    description: DataTypes.TEXT('long'),
    SPId: DataTypes.INTEGER,
    LSPId: DataTypes.INTEGER,
    TTId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Markdown',
  });
  return Markdown;
};