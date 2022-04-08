'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhoneNumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PhoneNumber.init({
    number: DataTypes.STRING,
    account_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PhoneNumber',
    tableName: 'phone_number',
    timestamps: false,
    underscored: true
  
  });
  return PhoneNumber;
};