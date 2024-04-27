'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
class Volume extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Volume.init({
  userid: DataTypes.INTEGER,
  value: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Volume',
});

module.exports = Volume;