'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAuth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Role }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id', as: 'userDetail' });
      this.belongsTo(Role, { foreignKey: 'role_id', as: 'roleDetail' });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        passwordHash: undefined,
        role_id: undefined,
        user_id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  UserAuth.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserAuth',
      tableName: 'user_auths',
    }
  );
  return UserAuth;
};
