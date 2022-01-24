'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Customer, Flight, Company }) {
      // define association here
      this.belongsTo(Company, { foreignKey: 'company_id', as: 'owner' });
      this.hasOne(Flight, { foreignKey: 'plane_id', as: 'flightStatus' });
    }

    toJSON() {
      return { ...this.get(), id: undefined, company_id: undefined };
    }
  }
  Plane.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Name can not be null' },
          notEmpty: { msg: 'Name can not be empty' },
        },
      },
      flight_hour: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
      },
      aircraft_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'aircraft number can not be null' },
          notEmpty: { msg: 'aircraft number can not be empty' },
        },
      },
      tail_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'tail number can not be null' },
          notEmpty: { msg: 'tail number can not be empty' },
        },
      },
      isDelivered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: 'Dekivery status can not be null' },
          notEmpty: { msg: 'Dekivery status can not be empty' },
        },
      },
    },
    {
      sequelize,
      tableName: 'planes',
      modelName: 'Plane',
    }
  );
  return Plane;
};
