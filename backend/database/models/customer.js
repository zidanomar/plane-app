'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Plane }) {
      // define association here
      this.hasMany(Plane, { foreignKey: 'customer_id', as: 'planes' });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Customer.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User can not be null' },
          notEmpty: { msg: 'User can not be empty' },
        },
      },
    },
    {
      sequelize,
      tableName: 'customers',
      modelName: 'Customer',
    }
  );
  return Customer;
};
