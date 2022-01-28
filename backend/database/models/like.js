'use strict';
const { Model } = require('sequelize');
const { Plane, User } = require('./');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  Like.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      PlaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Plane,
          key: 'id',
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'likes',
      modelName: 'Like',
    }
  );
  return Like;
};
