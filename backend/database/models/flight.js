'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Plane }) {
      // define association here
      this.belongsTo(Plane, { foreignKey: 'plane_id', as: 'planeDetail' });
    }

    toJSON() {
      return { ...this.get(), id: undefined, plane_id: undefined };
    }
  }
  Flight.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      depature_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      arrival_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      plane_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'flights',
      modelName: 'Flight',
    }
  );
  return Flight;
};
