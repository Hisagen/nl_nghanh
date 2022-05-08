'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ungdungs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    // ungdungs.belongsTo(models.User, { foreignKey: "SPId"})
    ungdungs.belongsTo(models.sanphams, { foreignKey: "SPId"})

    }
  };
  ungdungs.init({
    contentHTML: DataTypes.TEXT('long'),
    contentMarkdown: DataTypes.TEXT('long'),
    description: DataTypes.TEXT('long'),
    SPId: DataTypes.INTEGER,
    avt: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ungdungs',
  });
  return ungdungs;
};