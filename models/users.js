'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize')
class Users extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Users.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.ENUM(['admin', 'user']),
  apikey: DataTypes.STRING,
  token: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Users',
});

module.exports = Users;